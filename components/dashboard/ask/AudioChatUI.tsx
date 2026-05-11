"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, Loader2 } from "lucide-react";

interface AudioChatUIProps {
  subject: string;
  className: string;
}

type VoicePhase =
  | "listening"
  | "user_speaking"
  | "processing"
  | "panda_speaking";

type CallState = "idle" | "connecting" | "live" | "error";

const BACKEND_WS_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000")
  .replace(/^https/, "wss")
  .replace(/^http/, "ws");

const SPEECH_RMS_THRESHOLD = 0.018;
const SILENCE_BEFORE_PROCESSING_MS = 1400;
const WAVE_BARS = 18;

function f32ToI16(f32: Float32Array): ArrayBuffer {
  const i16 = new Int16Array(f32.length);
  for (let i = 0; i < f32.length; i++) {
    i16[i] = Math.max(-32768, Math.min(32767, f32[i] * 32768));
  }
  return i16.buffer;
}

function i16ToF32(buf: ArrayBuffer): Float32Array {
  const i16 = new Int16Array(buf);
  const f32 = new Float32Array(i16.length);
  for (let i = 0; i < i16.length; i++) f32[i] = i16[i] / 32768;
  return f32;
}

function computeRMS(f32: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < f32.length; i++) sum += f32[i] * f32[i];
  return Math.sqrt(sum / f32.length);
}

export default function AudioChatUI({ subject, className }: AudioChatUIProps) {
  const [callState, setCallState] = useState<CallState>("idle");
  const [voicePhase, setVoicePhaseState] = useState<VoicePhase>("listening");
  const [errorMsg, setErrorMsg] = useState("");

  const voicePhaseRef = useRef<VoicePhase>("listening");
  // Tracks live mic RMS — updated in audio processor, read in RAF loop (no re-renders)
  const currentRMSRef = useRef(0);
  const waveBarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef(0);

  const hasSpeechRef = useRef(false);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pandaActivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setVoicePhase = useCallback((phase: VoicePhase) => {
    voicePhaseRef.current = phase;
    setVoicePhaseState(phase);
  }, []);

  const teardown = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;
    processorRef.current?.disconnect();
    processorRef.current = null;
    inputCtxRef.current?.close().catch(() => {});
    inputCtxRef.current = null;
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    outputCtxRef.current?.close().catch(() => {});
    outputCtxRef.current = null;
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (pandaActivityTimerRef.current) clearTimeout(pandaActivityTimerRef.current);
    hasSpeechRef.current = false;
    currentRMSRef.current = 0;
  }, []);

  useEffect(() => () => teardown(), [teardown]);

  // RAF loop: animates waveform bars directly via DOM — zero React re-renders
  useEffect(() => {
    if (callState !== "live") return;
    let rafId: number;

    function tick() {
      const phase = voicePhaseRef.current;
      const rms = currentRMSRef.current;
      const t = Date.now();

      waveBarRefs.current.forEach((bar, i) => {
        if (!bar) return;
        let scale: number;
        let opacity: string;

        if (phase === "user_speaking") {
          const variation = Math.abs(Math.sin(t * 0.004 + i * 1.1));
          scale = 0.15 + Math.min(rms * 9, 0.85) * (0.55 + variation * 0.45);
          opacity = "1";
        } else if (phase === "listening") {
          scale = 0.08 + Math.abs(Math.sin(t * 0.0012 + i * 0.65)) * 0.1;
          opacity = "0.45";
        } else {
          scale = 0.06;
          opacity = "0.2";
        }

        bar.style.transform = `scaleY(${Math.max(0.05, Math.min(1, scale))})`;
        bar.style.opacity = opacity;
      });

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [callState]);

  const scheduleChunk = useCallback(
    (raw: ArrayBuffer) => {
      const ctx = outputCtxRef.current;
      if (!ctx) return;

      const f32 = i16ToF32(raw);
      const buf = ctx.createBuffer(1, f32.length, 24000);
      buf.getChannelData(0).set(f32);

      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);

      const now = ctx.currentTime;
      const startAt = Math.max(now, nextPlayTimeRef.current);
      src.start(startAt);
      nextPlayTimeRef.current = startAt + buf.duration;

      if (voicePhaseRef.current !== "panda_speaking") {
        // Cancel any pending silence timer — Panda already responded, so
        // we must clear the gate or it will block turn 2's silence detection.
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
          hasSpeechRef.current = false;
        }
        setVoicePhase("panda_speaking");
      }

      if (pandaActivityTimerRef.current) clearTimeout(pandaActivityTimerRef.current);
      pandaActivityTimerRef.current = setTimeout(() => {
        if (voicePhaseRef.current === "panda_speaking") {
          setVoicePhase("listening");
          hasSpeechRef.current = false;
        }
      }, 800);
    },
    [setVoicePhase]
  );

  async function startCall() {
    setCallState("connecting");
    setErrorMsg("");

    let token: string;
    try {
      const res = await fetch("/api/agent/voice-token");
      if (!res.ok) throw new Error("unauthenticated");
      token = (await res.json()).token;
    } catch {
      setErrorMsg("Please sign in and try again.");
      setCallState("error");
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch {
      setErrorMsg("Microphone access denied. Allow mic access and try again.");
      setCallState("error");
      return;
    }
    micStreamRef.current = stream;

    const wsUrl =
      `${BACKEND_WS_URL}/api/v1/ws/voice` +
      `?token=${encodeURIComponent(token)}` +
      `&subject=${encodeURIComponent(subject)}` +
      `&class_name=${encodeURIComponent(className)}`;

    const ws = new WebSocket(wsUrl);
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onmessage = (ev) => {
      if (ev.data instanceof ArrayBuffer) {
        scheduleChunk(ev.data);
      } else if (typeof ev.data === "string") {
        try {
          const msg = JSON.parse(ev.data) as { type: string; content?: string };
          if (msg.type === "connected") {
            startAudioPipeline(stream);
            setCallState("live");
            setVoicePhase("listening");
          } else if (msg.type === "turn_complete") {
            if (pandaActivityTimerRef.current) clearTimeout(pandaActivityTimerRef.current);
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            setVoicePhase("listening");
            hasSpeechRef.current = false;
          } else if (msg.type === "error") {
            setErrorMsg(msg.content ?? "Voice error.");
            setCallState("error");
            teardown();
          }
        } catch { /* ignore */ }
      }
    };

    ws.onerror = () => {
      setErrorMsg("Connection failed. Check your internet and try again.");
      setCallState("error");
      teardown();
    };

    ws.onclose = () => {
      // Use functional form — callState in this closure is stale ("connecting")
      setCallState((prev) => (prev === "live" ? "idle" : prev));
    };
  }

  function startAudioPipeline(stream: MediaStream) {
    const inputCtx = new AudioContext({ sampleRate: 16000 });
    inputCtxRef.current = inputCtx;

    const source = inputCtx.createMediaStreamSource(stream);
    const processor = inputCtx.createScriptProcessor(512, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (e) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      const phase = voicePhaseRef.current;
      if (phase === "panda_speaking" || phase === "processing") return;

      const f32 = e.inputBuffer.getChannelData(0);
      const rms = computeRMS(f32);
      currentRMSRef.current = rms;

      ws.send(f32ToI16(f32));

      if (rms > SPEECH_RMS_THRESHOLD) {
        hasSpeechRef.current = true;
        if (voicePhaseRef.current !== "user_speaking") {
          setVoicePhase("user_speaking");
        }
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      } else if (hasSpeechRef.current && !silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          silenceTimerRef.current = null;
          hasSpeechRef.current = false;
          currentRMSRef.current = 0;
          if (voicePhaseRef.current === "user_speaking") {
            setVoicePhase("processing");
          }
        }, SILENCE_BEFORE_PROCESSING_MS);
      }
    };

    source.connect(processor);
    processor.connect(inputCtx.destination);

    const outputCtx = new AudioContext({ sampleRate: 24000 });
    outputCtxRef.current = outputCtx;
    nextPlayTimeRef.current = outputCtx.currentTime + 0.05;
  }

  function endCall() {
    teardown();
    setCallState("idle");
    setVoicePhase("listening");
    setErrorMsg("");
  }

  // ── Pre-call / error screen ───────────────────────────────────────────────
  if (callState === "idle" || callState === "error") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-6">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-28 w-28 bg-[#C8E6C9] rounded-3xl flex items-center justify-center text-5xl border-2 border-[#43A047]/20 shadow-lg shadow-[#43A047]/10"
          >
            🐼
          </motion.div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-[#43A047] rounded-xl flex items-center justify-center shadow-md">
            <Mic className="h-4 w-4 text-white" />
          </div>
        </div>

        <div>
          <h3
            className="font-bold text-[#1B1C17] text-2xl mb-2"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Voice Chat with Panda
          </h3>
          <p className="text-sm text-[#44483D] max-w-xs leading-relaxed">
            Just talk — Panda listens, thinks, and replies, like chatting with a friend about{" "}
            <span className="font-bold text-[#43A047]">{subject}</span>!
          </p>
        </div>

        {/* How it works */}
        <div className="flex items-center gap-3 text-xs text-[#44483D]">
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-9 w-9 bg-[#E3F2FD] rounded-full flex items-center justify-center text-base shadow-sm">
              🎤
            </div>
            <span className="font-semibold">You speak</span>
          </div>
          <div className="text-[#C8E6C9] text-xl pb-4">→</div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-9 w-9 bg-[#FFF8E1] rounded-full flex items-center justify-center text-base shadow-sm">
              💭
            </div>
            <span className="font-semibold">Panda thinks</span>
          </div>
          <div className="text-[#C8E6C9] text-xl pb-4">→</div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-9 w-9 bg-[#C8E6C9] rounded-full flex items-center justify-center text-base shadow-sm">
              🐼
            </div>
            <span className="font-semibold">Panda replies</span>
          </div>
        </div>

        {errorMsg && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl max-w-xs">
            {errorMsg}
          </p>
        )}

        <button
          onClick={startCall}
          className="bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-3.5 px-8 rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-[#43A047]/20 active:scale-95"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Mic className="h-5 w-5" />
          Start Voice Chat
        </button>
        <p className="text-xs text-[#75796C]">Microphone access required</p>
      </div>
    );
  }

  // ── Connecting ─────────────────────────────────────────────────────────────
  if (callState === "connecting") {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-4 border-[#C8E6C9] border-t-[#43A047]"
        />
        <p className="text-sm font-semibold text-[#44483D]">Connecting to Panda…</p>
      </div>
    );
  }

  // ── Live chat ──────────────────────────────────────────────────────────────
  const phaseConfig = {
    listening: {
      pandaLabel: "Listening for you…",
      pandaSubLabel: "Speak whenever you're ready",
      turnLabel: "🎤  Your Turn",
      turnBg: "bg-[#E3F2FD]",
      turnText: "text-[#1565C0]",
      turnBorder: "border-[#BBDEFB]",
      avatarBg: "bg-[#C8E6C9]",
      avatarBorder: "border-[#43A047]/30",
    },
    user_speaking: {
      pandaLabel: "Go ahead, I'm all ears!",
      pandaSubLabel: "Keep talking…",
      turnLabel: "🎤  You're Speaking",
      turnBg: "bg-[#1E88E5]",
      turnText: "text-white",
      turnBorder: "border-transparent",
      avatarBg: "bg-[#C8E6C9]",
      avatarBorder: "border-[#43A047]/20",
    },
    processing: {
      pandaLabel: "Thinking of a great answer…",
      pandaSubLabel: "Just a moment!",
      turnLabel: "💭  Panda is Thinking",
      turnBg: "bg-[#FFF8E1]",
      turnText: "text-[#E65100]",
      turnBorder: "border-[#FFE082]",
      avatarBg: "bg-[#FFF9E6]",
      avatarBorder: "border-[#FFB300]/40",
    },
    panda_speaking: {
      pandaLabel: "Panda is talking…",
      pandaSubLabel: "Listen up!",
      turnLabel: "🐼  Panda is Talking",
      turnBg: "bg-[#43A047]",
      turnText: "text-white",
      turnBorder: "border-transparent",
      avatarBg: "bg-[#A5D6A7]",
      avatarBorder: "border-[#43A047]",
    },
  }[voicePhase];

  const showPulse = voicePhase === "panda_speaking";
  const isUserTurn = voicePhase === "listening" || voicePhase === "user_speaking";

  return (
    <div className="h-full flex flex-col bg-white">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#43A047]/10">
        <span
          className="text-sm font-bold text-[#44483D]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Voice Chat
        </span>
        <span className="bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold px-3 py-1 rounded-full">
          {subject} · Class {className}
        </span>
      </div>

      {/* ── Panda section ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">

        {/* Avatar */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {showPulse && (
              <>
                <motion.div
                  key="r1"
                  initial={{ scale: 1, opacity: 0.35 }}
                  animate={{ scale: 1.85, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  className="absolute h-32 w-32 rounded-full bg-[#43A047]"
                />
                <motion.div
                  key="r2"
                  initial={{ scale: 1, opacity: 0.25 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: 0.45, ease: "easeOut" }}
                  className="absolute h-28 w-28 rounded-full bg-[#43A047]"
                />
              </>
            )}
          </AnimatePresence>

          <div
            className={`h-32 w-32 rounded-full border-4 flex items-center justify-center text-6xl z-10 shadow-lg transition-all duration-500 ${phaseConfig.avatarBg} ${phaseConfig.avatarBorder}`}
          >
            🐼
          </div>

          {/* Badge: processing spinner or speaking icon */}
          <AnimatePresence>
            {voicePhase === "processing" && (
              <motion.div
                key="processing-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -bottom-1 -right-1 z-20 h-9 w-9 bg-[#FFF8E1] border-2 border-[#FFB300]/40 rounded-full flex items-center justify-center shadow"
              >
                <Loader2 className="h-4 w-4 text-[#E65100] animate-spin" />
              </motion.div>
            )}
            {voicePhase === "panda_speaking" && (
              <motion.div
                key="speaking-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -bottom-1 -right-1 z-20 h-9 w-9 bg-[#43A047] border-2 border-white rounded-full flex items-center justify-center shadow"
              >
                <Volume2 className="h-4 w-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panda label */}
        <div className="text-center">
          <p
            className="font-bold text-[#1B1C17] text-xl"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Panda
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={voicePhase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-[#44483D] mt-0.5"
            >
              {phaseConfig.pandaLabel}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Turn indicator pill ── */}
      <div className="flex items-center gap-3 px-6 py-3">
        <div className="flex-1 h-px bg-[#E8F5E9]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={voicePhase}
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={`px-5 py-2 rounded-full text-sm font-bold border ${phaseConfig.turnBg} ${phaseConfig.turnText} ${phaseConfig.turnBorder}`}
          >
            {phaseConfig.turnLabel}
          </motion.div>
        </AnimatePresence>
        <div className="flex-1 h-px bg-[#E8F5E9]" />
      </div>

      {/* ── User mic section ── */}
      <div className="flex flex-col items-center gap-2 px-6 pb-3">

        {/* Live waveform — bars animated via RAF, no re-renders */}
        <div className="flex items-end gap-1 w-full h-12">
          {Array.from({ length: WAVE_BARS }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { waveBarRefs.current[i] = el; }}
              className={`flex-1 rounded-full origin-bottom transition-colors duration-300 ${
                voicePhase === "user_speaking" ? "bg-[#1E88E5]" : "bg-[#43A047]/40"
              }`}
              style={{ height: "100%", transform: "scaleY(0.08)", opacity: 0.4 }}
            />
          ))}
        </div>

        <p className="text-[11px] font-bold text-[#75796C] uppercase tracking-widest">
          {isUserTurn ? "You" : "Waiting for Panda…"}
        </p>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center justify-center px-6 py-4 border-t border-[#43A047]/10">
        <button
          onClick={endCall}
          className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold px-10 py-3 rounded-full transition-all shadow-md"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          End Chat
        </button>
      </div>
    </div>
  );
}
