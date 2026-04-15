"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, PhoneOff, Volume2 } from "lucide-react";

export default function AudioChatUI() {
  const [callStarted, setCallStarted] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [pandaSpeaking, setPandaSpeaking] = useState(true);

  if (!callStarted) {
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
          <h3
            className="font-bold text-[#1B1C17] text-2xl mb-2"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Voice Chat with Panda
          </h3>
          <p className="text-sm text-[#44483D] max-w-xs">
            Speak naturally — Panda listens and responds out loud. Perfect for learning on the go!
          </p>
        </div>

        <button
          onClick={() => setCallStarted(true)}
          className="bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-3.5 px-8 rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-[#43A047]/20 active:scale-95"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Mic className="h-4 w-4" />
          Start Voice Session
        </button>
        <p className="text-xs text-[#75796C]">Microphone access will be requested</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-8 px-8">
      {/* Panda avatar with pulse rings */}
      <div className="relative flex items-center justify-center">
        {pandaSpeaking && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute h-40 w-40 rounded-full bg-[#43A047]"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
              className="absolute h-32 w-32 rounded-full bg-[#43A047]"
            />
          </>
        )}
        <div className="h-24 w-24 bg-[#C8E6C9] rounded-full border-2 border-[#43A047]/30 flex items-center justify-center text-4xl z-10 shadow-md">
          🐼
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <p
          className="text-xl font-bold text-[#1B1C17]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {pandaSpeaking ? "Panda is speaking…" : micOn ? "Listening…" : "Muted"}
        </p>
        <p className="text-sm text-[#44483D] mt-1">
          {pandaSpeaking ? "Panda is explaining your topic" : "Tap the mic button to speak"}
        </p>
      </div>

      {/* Waveform */}
      {pandaSpeaking && (
        <div className="flex items-center gap-1 h-10">
          {[0, 0.1, 0.2, 0.1, 0.25, 0.05, 0.18, 0.12, 0.22, 0.08].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 0.7, repeat: Infinity, delay }}
              className="w-1.5 bg-[#43A047] rounded-full"
              style={{ height: "100%" }}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => setMicOn((v) => !v)}
          title={micOn ? "Mute mic" : "Unmute mic"}
          className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            micOn
              ? "bg-[#C8E6C9] text-[#43A047] hover:bg-[#A5D6A7]"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </button>

        <button
          onClick={() => setCallStarted(false)}
          title="End session"
          className="h-16 w-16 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-md"
        >
          <PhoneOff className="h-7 w-7" />
        </button>

        <button
          onClick={() => setPandaSpeaking((v) => !v)}
          title="Toggle speaker (demo)"
          className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            pandaSpeaking
              ? "bg-[#C8E6C9] text-[#43A047] hover:bg-[#A5D6A7]"
              : "bg-[#F0EDE4] text-[#44483D] hover:bg-[#E8E4D9]"
          }`}
        >
          <Volume2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
