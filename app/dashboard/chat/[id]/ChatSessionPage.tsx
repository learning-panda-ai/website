"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import TextChatUI from "@/components/dashboard/ask/TextChatUI";

interface ChatSessionPageProps {
  sessionId: string;
  subject: string;
  className: string;
  title: string;
}

const SUBJECT_EMOJI: Record<string, string> = {
  Mathematics: "📐", Physics: "⚛️", Chemistry: "🧪", Biology: "🧬",
  Science: "🔬", "Computer Science": "💻", English: "📖", Hindi: "🇮🇳",
};

export default function ChatSessionPage({ sessionId, subject, className, title }: ChatSessionPageProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <Link
          href="/dashboard/history"
          className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs text-gray-400 mb-0.5">
            {SUBJECT_EMOJI[subject] ?? "📚"} {subject} · Class {className}
          </p>
          <h1
            className="text-lg font-extrabold text-gray-800 leading-tight truncate"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Chat */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <TextChatUI
          subject={subject}
          className={className}
          initialSessionId={sessionId}
        />
      </div>
    </div>
  );
}
