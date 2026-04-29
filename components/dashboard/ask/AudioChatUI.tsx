"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, Volume2, VolumeX, Loader2 } from "lucide-react";

interface AudioChatUIProps {
  subject: string;
  className: string;
}

// Phases of a single conversation turn
type VoicePhase =
  | "listening"      // waiting for user to speak
  | "user_speaking"  // user is actively speaking (RMS above threshold)
  | "processing"     // user stopped — Gemini is thinking
  | "panda_speaking"; // receiving + playing Gemini audio

type CallState = "idle" | "connecting" | "live" | "error";

const BACKEND_WS_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000")
  .replace(/^https/, "wss")
  .replace(/^http/, "ws");

const SPEECH_RMS_THRESHOLD = 0.018; // below this = silence
const SILENCE_BEFORE_PROCESSING_MS = 1400; // silence gap that ends user turn

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
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Refs so onaudioprocess callbacks always see current values
  const voicePhaseRef = useRef<VoicePhase>("listening");
  const mutedRef = useRef(false);

  const wsRef = useRef<WebSocket | null>(null);
  const inputCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const outputCtxRef = useRef<AudioContext | null>(null);
  const nextPlayTimeRef = useRef(0);

  // VAD tracking
  const hasSpeechRef = useRef(false);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Inactivity: if Gemini sends no audio for a while, switch back to listening
  const pandaActivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep voicePhaseRef in sync and update React state together
  const setVoicePhase = useCallback((phase: VoicePhase) => {
    voicePhaseRef.current = phase;
    setVoicePhaseState(phase);
  }, []);

  // ── Cleanup ────────────────────────────────────────────────────────────────
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
  }, []);

  useEffect(() => () => teardown(), [teardown]);

  // ── Play one PCM16 chunk from Gemini ──────────────────────────────────────
  const scheduleChunk = useCallback(
    (raw: ArrayBuffer) => {
      const ctx = outputCtxRef.current;
      if (!ctx || !speakerOn) return;

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

      // Switch to panda_speaking on first chunk of a turn
      if (voicePhaseRef.current !== "panda_speaking") {
        setVoicePhase("panda_speaking");
      }

      // Reset the inactivity timer — if chunks stop arriving, turn is done
      if (pandaActivityTimerRef.current) clearTimeout(pandaActivityTimerRef.current);
      pandaActivityTimerRef.current = setTimeout(() => {
        if (voicePhaseRef.current === "panda_speaking") {
          setVoicePhase("listening");
          hasSpeechRef.current = false;
        }
      }, 800);
    },
    [speakerOn, setVoicePhase]
  );

  // ── Start call ─────────────────────────────────────────────────────────────
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
            // Gemini finished speaking — hand mic back to user
            if (pandaActivityTimerRef.current) clearTimeout(pandaActivityTimerRef.current);
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
      if (callState === "live") setCallState("idle");
    };
  }

  // ── Audio capture + VAD ───────────────────────────────────────────────────
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

      // Don't send mic audio while Panda is talking or we're waiting for response
      if (phase === "panda_speaking" || phase === "processing") return;
      if (mutedRef.current) return;

      const f32 = e.inputBuffer.getChannelData(0);
      const rms = computeRMS(f32);

      ws.send(f32ToI16(f32));

      if (rms > SPEECH_RMS_THRESHOLD) {
        // Active speech — mark speaking, cancel any pending silence timer
        hasSpeechRef.current = true;
        if (voicePhaseRef.current !== "user_speaking") {
          setVoicePhase("user_speaking");
        }
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      } else if (hasSpeechRef.current && !silenceTimerRef.current) {
        // Silence AFTER speech — start countdown to "processing"
        silenceTimerRef.current = setTimeout(() => {
          silenceTimerRef.current = null;
          hasSpeechRef.current = false;
          if (voicePhaseRef.current === "user_speaking") {
            setVoicePhase("processing");
            // Stopping audio sends is enough — Gemini's VAD detects the gap
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

  // ── End call ───────────────────────────────────────────────────────────────
  function endCall() {
    teardown();
    setCallState("idle");
    setVoicePhase("listening");
    setErrorMsg("");
  }

  function toggleMute() {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
  }

  // ── Pre-call / error screen ────────────────────────────────────────────────
  if (callState === "idle" || callState === "error") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8 gap-6">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-28 w-28 bg-[#C8E6C9] rounded-3xl flex items-center justify-center text-5xl border-2 border-[#43A047]/20"
          >
            🐼
          </motion.div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-[#43A047] rounded-xl flex items-center justify-center shadow-md">
            <Mic className="h-4 w-4 text-white" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-[#1B1C17] text-2xl mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            Live Voice Chat with Panda
          </h3>
          <p className="text-sm text-[#44483D] max-w-xs">
            Speak your question, pause — Panda will respond. Then speak again. Just like a real conversation about{" "}
            <span className="font-bold text-[#43A047]">{subject}</span>!
          </p>
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
          <Mic className="h-4 w-4" />
          Start Voice Call
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
        <p className="text-sm font-medium text-[#44483D]">Connecting to Panda…</p>
      </div>
    );
  }

  // ── Live call ──────────────────────────────────────────────────────────────
  const phaseConfig = {
    listening:      { label: "Your turn — speak now",   sublabel: "Panda is waiting for you",         color: "bg-[#C8E6C9]", border: "border-[#43A047]/30" },
    user_speaking:  { label: "Listening…",              sublabel: "Keep going, Panda is listening",    color: "bg-[#A5D6A7]", border: "border-[#43A047]" },
    processing:     { label: "Processing…",             sublabel: "Panda is thinking",                 color: "bg-[#C8E6C9]", border: "border-[#43A047]/30" },
    panda_speaking: { label: "Panda is speaking…",      sublabel: "Wait for Panda to finish",          color: "bg-[#A5D6A7]", border: "border-[#43A047]" },
  }[voicePhase];

  const showPulse = voicePhase === "panda_speaking";
  const showWave  = voicePhase === "user_speaking" || voicePhase === "panda_speaking";
  const waveColor = voicePhase === "panda_speaking" ? "bg-[#43A047]" : "bg-[#1B5E20]";

  return (
    <div className="h-full flex flex-col items-center justify-between px-6 py-10">

      {/* ── Panda avatar + status ── */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5">

        {/* Avatar */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {showPulse && (
              <>
                <motion.div key="r1" initial={{ scale: 1, opacity: 0.3 }} animate={{ scale: 1.7, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute h-28 w-28 rounded-full bg-[#43A047]" />
                <motion.div key="r2" initial={{ scale: 1, opacity: 0.25 }} animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.35 }}
                  className="absolute h-24 w-24 rounded-full bg-[#43A047]" />
              </>
            )}
          </AnimatePresence>
          <div className={`h-28 w-28 rounded-full border-4 flex items-center justify-center text-5xl z-10 shadow-md transition-all duration-300 ${phaseConfig.color} ${phaseConfig.border}`}>
            🐼
          </div>
        </div>

        {/* Status */}
        <div className="text-center space-y-1">
          <p className="text-xl font-bold text-[#1B1C17]" style={{ fontFamily: "var(--font-fredoka)" }}>
            {phaseConfig.label}
          </p>
          <p className="text-sm text-[#44483D]">{phaseConfig.sublabel}</p>
        </div>

        {/* Processing spinner */}
        <AnimatePresence>
          {voicePhase === "processing" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader2 className="h-6 w-6 text-[#43A047] animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waveform bars */}
        <AnimatePresence>
          {showWave && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-1 h-8">
              {[0, 0.08, 0.16, 0.06, 0.22, 0.04, 0.14, 0.1, 0.18, 0.07].map((delay, i) => (
                <motion.div key={i}
                  animate={{ scaleY: [0.2, 1, 0.2] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay }}
                  className={`w-1.5 rounded-full ${waveColor}`}
                  style={{ height: "100%" }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Turn indicator dots */}
        <div className="flex gap-2 mt-2">
          {(["listening", "user_speaking", "processing", "panda_speaking"] as VoicePhase[]).map((p) => (
            <div key={p} className={`h-2 w-2 rounded-full transition-all duration-300 ${voicePhase === p ? "bg-[#43A047] scale-125" : "bg-[#C8E6C9]"}`} />
          ))}
        </div>

        {/* Subject chip */}
        <span className="bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold px-4 py-1.5 rounded-full">
          {subject} · Class {className}
        </span>
      </div>

      {/* ── Controls ── */}
      <div className="flex items-center gap-5 shrink-0 mt-4">
        <button onClick={toggleMute} title={muted ? "Unmute mic" : "Mute mic"}
          className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            muted ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-[#C8E6C9] text-[#43A047] hover:bg-[#A5D6A7]"
          }`}>
          {muted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </button>

        <button onClick={endCall} title="End call"
          className="h-16 w-16 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-md active:scale-95">
          <PhoneOff className="h-7 w-7" />
        </button>

        <button onClick={() => setSpeakerOn((s) => !s)} title={speakerOn ? "Mute speaker" : "Unmute speaker"}
          className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            speakerOn ? "bg-[#C8E6C9] text-[#43A047] hover:bg-[#A5D6A7]" : "bg-[#F0EDE4] text-[#44483D] hover:bg-[#E8E4D9]"
          }`}>
          {speakerOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
