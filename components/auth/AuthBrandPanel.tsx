"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { AUTH_STATS, AUTH_HIGHLIGHTS } from "@/data/auth";

export default function AuthBrandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative hidden lg:flex lg:w-[52%] flex-col overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #0a2e14 0%, #0f4a22 25%, #166534 55%, #15803d 75%, #16a34a 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 420, height: 420, top: "-80px", right: "-100px",
            background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300, bottom: "60px", left: "-60px",
            background: "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 200, height: 200, top: "45%", left: "55%",
            background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full px-12 py-14 justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
            <span className="text-xl">🐼</span>
          </div>
          <span
            className="text-xl font-bold text-white"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Learning Panda
          </span>
        </motion.div>

        {/* Main hero content */}
        <div className="flex flex-col gap-8">
          {/* Mascot + heading */}
          <div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 14 }}
              className="mb-7 inline-flex"
            >
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/25"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <motion.span
                  className="text-5xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🐼
                </motion.span>
                <motion.span
                  className="absolute -top-2 -right-2 text-lg"
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  ✨
                </motion.span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-4 text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-white"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Your AI-Powered
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #86efac, #fde68a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Study Buddy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base leading-relaxed text-green-100/75 font-medium max-w-sm"
            >
              Ask any question, get instant step-by-step explanations, and
              make learning <span className="text-white font-semibold">actually fun</span>.
            </motion.p>
          </div>

          {/* Highlight cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3"
          >
            {AUTH_HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 + i * 0.08 }}
                className="flex items-center gap-4 rounded-2xl border border-white/12 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
              >
                <span className="text-2xl">{h.emoji}</span>
                <div>
                  <div className="text-sm font-bold text-white">{h.title}</div>
                  <div className="text-xs text-green-200/70">{h.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-6"
        >
          {AUTH_STATS.map((s, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-1">
                <span
                  className="text-2xl font-extrabold text-white"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {s.value}
                </span>
                {s.hasStarIcon && (
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                )}
              </div>
              <span className="text-xs text-green-200/60 font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
