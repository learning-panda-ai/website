"use client";

import { motion } from "framer-motion";
import { tabAnim } from "@/components/dashboard/types";

interface ComingSoonTabProps {
  label: string;
  emoji: string;
  description: string;
}

export default function ComingSoonTab({ label, emoji, description }: ComingSoonTabProps) {
  return (
    <motion.div {...tabAnim} className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2
        className="text-2xl font-extrabold text-gray-800 mb-2"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        {label}
      </h2>
      <p className="text-gray-500 text-sm mb-6 max-w-xs" style={{ fontFamily: "var(--font-nunito)" }}>
        {description}
      </p>
      <span
        className="inline-block bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        COMING SOON
      </span>
    </motion.div>
  );
}
