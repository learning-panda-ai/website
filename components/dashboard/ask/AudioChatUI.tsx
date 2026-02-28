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
      <div className="flex flex-col items-center text-center py-8">
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-28 w-28 bg-green-100 rounded-3xl flex items-center justify-center text-5xl border-2 border-green-200"
          >
            🐼
          </motion.div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
            <Mic className="h-4 w-4 text-white" />
          </div>
        </div>
        <h3
          className="font-extrabold text-gray-800 text-xl mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Voice Chat with Panda
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">
          Speak naturally — Panda listens and responds out loud. Perfect for learning on the go!
        </p>
        <button
          onClick={() => setCallStarted(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all hover:shadow-md text-sm"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Mic className="h-4 w-4" />
          Start Voice Session
        </button>
        <p className="text-xs text-gray-400 mt-3">Microphone access will be requested</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 gap-6">
      {/* Panda avatar with pulse rings */}
      <div className="relative flex items-center justify-center">
        {pandaSpeaking && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute h-36 w-36 rounded-full bg-green-400"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: 0.3 }}
              className="absolute h-28 w-28 rounded-full bg-green-400"
            />
          </>
        )}
        <div className="h-24 w-24 bg-green-100 rounded-full border-2 border-green-300 flex items-center justify-center text-4xl z-10 shadow-md">
          🐼
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <p
          className="text-base font-extrabold text-gray-700"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {pandaSpeaking ? "Panda is speaking…" : micOn ? "Listening…" : "Muted"}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {pandaSpeaking ? "Panda is explaining your topic" : "Tap the mic button to speak"}
        </p>
      </div>

      {/* Waveform (decorative) */}
      {pandaSpeaking && (
        <div className="flex items-center gap-1 h-8">
          {[0, 0.1, 0.2, 0.1, 0.25, 0.05, 0.18, 0.12, 0.22, 0.08].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 0.7, repeat: Infinity, delay }}
              className="w-1.5 bg-green-500 rounded-full"
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
            micOn ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-100 text-red-600 hover:bg-red-200"
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
          title="Toggle Panda speaking (demo)"
          className="h-14 w-14 rounded-2xl bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-all"
        >
          <Volume2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
