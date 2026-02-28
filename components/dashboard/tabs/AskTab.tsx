"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ElementType } from "react";
import { MessageSquare, Video, Mic } from "lucide-react";
import TextChatUI from "../ask/TextChatUI";
import VideoChatUI from "../ask/VideoChatUI";
import AudioChatUI from "../ask/AudioChatUI";
import { tabAnim } from "../types";

type ChatMode = "text" | "video" | "audio";

const CHAT_MODES: {
  id: ChatMode;
  label: string;
  Icon: ElementType;
  desc: string;
  activeClass: string;
  inactiveClass: string;
  iconActive: string;
  iconInactive: string;
  iconColor: string;
}[] = [
  {
    id: "text",
    label: "Text Chat",
    Icon: MessageSquare,
    desc: "Type your questions",
    activeClass: "bg-blue-600 border-blue-600 shadow-lg scale-[1.02]",
    inactiveClass: "bg-white border-blue-200 hover:bg-blue-50",
    iconActive: "bg-blue-500/30",
    iconInactive: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "video",
    label: "Video Chat",
    Icon: Video,
    desc: "Face-to-face with Panda",
    activeClass: "bg-purple-600 border-purple-600 shadow-lg scale-[1.02]",
    inactiveClass: "bg-white border-purple-200 hover:bg-purple-50",
    iconActive: "bg-purple-500/30",
    iconInactive: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "audio",
    label: "Voice Chat",
    Icon: Mic,
    desc: "Speak with Panda",
    activeClass: "bg-green-600 border-green-600 shadow-lg scale-[1.02]",
    inactiveClass: "bg-white border-green-200 hover:bg-green-50",
    iconActive: "bg-green-500/30",
    iconInactive: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const PANEL_HEADERS: Record<
  ChatMode,
  { bg: string; Icon: ElementType; color: string; label: string }
> = {
  text:  { bg: "bg-blue-100",   Icon: MessageSquare, color: "text-blue-600",   label: "Text Chat"  },
  video: { bg: "bg-purple-100", Icon: Video,         color: "text-purple-600", label: "Video Chat" },
  audio: { bg: "bg-green-100",  Icon: Mic,           color: "text-green-600",  label: "Voice Chat" },
};

export default function AskTab() {
  const [mode, setMode] = useState<ChatMode>("text");
  const { bg, Icon: PanelIcon, color, label } = PANEL_HEADERS[mode];

  return (
    <motion.div key="ask" {...tabAnim} className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
        Ask Panda
      </h2>

      {/* Mode selector */}
      <div className="grid grid-cols-3 gap-3">
        {CHAT_MODES.map(({ id, label: modeLabel, Icon, desc, activeClass, inactiveClass, iconActive, iconInactive, iconColor }) => {
          const isActive = mode === id;
          return (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`flex flex-col items-center gap-2 sm:gap-2.5 py-3 sm:py-5 px-2 sm:px-3 rounded-2xl border-2 transition-all text-center ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              <div
                className={`h-9 w-9 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center ${
                  isActive ? iconActive : iconInactive
                }`}
              >
                <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? "text-white" : iconColor}`} />
              </div>
              <div>
                <p
                  className={`text-xs sm:text-sm font-extrabold ${isActive ? "text-white" : "text-gray-800"}`}
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {modeLabel}
                </p>
                <p className={`hidden sm:block text-xs mt-0.5 ${isActive ? "text-white/80" : "text-gray-400"}`}>
                  {desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Chat panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className={`h-8 w-8 rounded-xl ${bg} flex items-center justify-center`}>
            <PanelIcon className={`h-4 w-4 ${color}`} />
          </div>
          <p className="font-extrabold text-gray-800 text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>
            {label}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {mode === "text"  && <TextChatUI />}
            {mode === "video" && <VideoChatUI />}
            {mode === "audio" && <AudioChatUI />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Recent sessions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-800 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
          Recent Sessions
        </h3>
        <div className="flex flex-col items-center py-8 text-center">
          <span className="text-3xl mb-3">💬</span>
          <p className="text-sm font-bold text-gray-500 mb-1">No sessions yet</p>
          <p className="text-xs text-gray-400">Start a conversation to see your history here.</p>
        </div>
      </div>
    </motion.div>
  );
}
