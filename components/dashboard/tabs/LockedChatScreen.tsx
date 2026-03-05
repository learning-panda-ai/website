"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function LockedChatScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      {/* Panda with lock */}
      <div className="relative mb-6">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-28 w-28 rounded-3xl flex items-center justify-center text-6xl border-2 border-[var(--panda-green)]/30 bg-[var(--panda-green)]/10"
        >
          🐼
        </motion.div>
        <div className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-md text-lg">
          🔒
        </div>
      </div>

      {/* Heading */}
      <h2
        className="text-2xl font-extrabold text-gray-800 mb-2"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        AI Chat is Not Active Yet
      </h2>

      {/* Sub-text */}
      <p className="text-sm text-gray-500 max-w-xs mb-1 leading-relaxed">
        Your account hasn't been activated for AI tutoring. This happens after we confirm your registration.
      </p>
      <p className="text-sm text-gray-500 max-w-xs mb-8 leading-relaxed">
        Reach out and we'll get you set up right away!
      </p>

      {/* CTA */}
      <a
        href="mailto:contact@learningpanda.ai"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all shadow-sm hover:shadow-md"
        style={{ background: "var(--panda-green)", fontFamily: "var(--font-fredoka)" }}
      >
        <Mail className="h-4 w-4" />
        Contact Us to Activate
      </a>

      {/* Secondary hint */}
      <p className="text-xs text-gray-400 mt-4">
        contact@learningpanda.ai
      </p>
    </motion.div>
  );
}
