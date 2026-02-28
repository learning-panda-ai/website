"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, PhoneOff } from "lucide-react";

export default function VideoChatUI() {
  const [callStarted, setCallStarted] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  if (!callStarted) {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <div className="relative mb-6">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-28 w-28 bg-purple-100 rounded-3xl flex items-center justify-center text-5xl border-2 border-purple-200"
          >
            🐼
          </motion.div>
          <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <Video className="h-4 w-4 text-white" />
          </div>
        </div>
        <h3
          className="font-extrabold text-gray-800 text-xl mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Video Chat with Panda
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">
          Start a face-to-face video session. Panda explains concepts visually, just like a real tutor!
        </p>
        <button
          onClick={() => setCallStarted(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all hover:shadow-md text-sm"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Video className="h-4 w-4" />
          Start Video Call
        </button>
        <p className="text-xs text-gray-400 mt-3">Camera &amp; microphone will be requested</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Video area */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900 aspect-video mb-4">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 bg-gradient-to-br from-purple-900/60 to-gray-900">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl"
          >
            🐼
          </motion.div>
          <div className="flex items-center gap-1.5">
            {[0, 0.15, 0.3].map((delay) => (
              <motion.div
                key={delay}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay }}
                className="w-1 h-4 bg-purple-400 rounded-full"
              />
            ))}
            <span className="text-white/70 text-sm ml-2">Panda is speaking…</span>
          </div>
        </div>

        {/* Self-view */}
        <div className="absolute bottom-3 right-3 w-28 aspect-video bg-gray-700 rounded-xl flex items-center justify-center border-2 border-white/20 overflow-hidden">
          {camOn ? (
            <span className="text-2xl">👤</span>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <VideoOff className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-400">Off</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setMicOn((v) => !v)}
          title={micOn ? "Mute" : "Unmute"}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            micOn ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setCallStarted(false)}
          title="End call"
          className="h-14 w-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-md"
        >
          <PhoneOff className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCamOn((v) => !v)}
          title={camOn ? "Turn off camera" : "Turn on camera"}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            camOn ? "bg-gray-100 text-gray-700 hover:bg-gray-200" : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
