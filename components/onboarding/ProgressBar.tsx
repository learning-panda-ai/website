"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const stepEmojis = ["🎓", "📚", "🤖"];

export default function ProgressBar({
  currentStep,
  totalSteps,
  labels,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="mb-3 flex items-center justify-between">
        {labels.map((label, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? "#4CAF50"
                    : isActive
                      ? "#4CAF50"
                      : "#C8E6C9",
                }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-extrabold shadow-md"
                style={{
                  boxShadow: isActive
                    ? "0 4px 15px rgba(76, 175, 80, 0.3)"
                    : isCompleted
                      ? "0 2px 8px rgba(76, 175, 80, 0.2)"
                      : "none",
                }}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 text-white" strokeWidth={3} />
                ) : (
                  <span className={isActive ? "text-white" : "text-green-700"}>
                    {stepEmojis[idx] || idx + 1}
                  </span>
                )}
              </motion.div>
              <span
                className={`hidden text-xs font-bold sm:block ${
                  isActive || isCompleted ? "text-green-600" : "text-green-400"
                }`}
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Track */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-green-100 shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="progress-shimmer h-full rounded-full"
        />
      </div>
    </div>
  );
}
