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
            <Video className="h-4 w-4 text-white" />
          </div>
        </div>

        <div>
          <h3
            className="font-bold text-[#1B1C17] text-2xl mb-2"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Video Chat with Panda
          </h3>
          <p className="text-sm text-[#44483D] max-w-xs">
            Start a face-to-face video session. Panda explains concepts visually, just like a real tutor!
          </p>
        </div>

        <button
          onClick={() => setCallStarted(true)}
          className="bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-3.5 px-8 rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-[#43A047]/20 active:scale-95"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Video className="h-4 w-4" />
          Start Video Call
        </button>
        <p className="text-xs text-[#75796C]">Camera &amp; microphone will be requested</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 px-6">
      {/* Video area */}
      <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-[#1B1C17] aspect-video">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 bg-gradient-to-br from-[#1B5E20]/80 to-[#1B1C17]">
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
                className="w-1 h-4 bg-[#43A047] rounded-full"
              />
            ))}
            <span className="text-white/70 text-sm ml-2">Panda is speaking…</span>
          </div>
        </div>

        {/* Self-view */}
        <div className="absolute bottom-3 right-3 w-28 aspect-video bg-[#2F312A] rounded-xl flex items-center justify-center border-2 border-white/10 overflow-hidden">
          {camOn ? (
            <span className="text-2xl">👤</span>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <VideoOff className="h-5 w-5 text-[#44483D]" />
              <span className="text-xs text-[#44483D]">Off</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMicOn((v) => !v)}
          title={micOn ? "Mute" : "Unmute"}
          className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
            micOn
              ? "bg-[#F0EDE4] text-[#44483D] hover:bg-[#E8E4D9]"
              : "bg-red-100 text-red-600 hover:bg-red-200"
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
            camOn
              ? "bg-[#F0EDE4] text-[#44483D] hover:bg-[#E8E4D9]"
              : "bg-red-100 text-red-600 hover:bg-red-200"
          }`}
        >
          {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
