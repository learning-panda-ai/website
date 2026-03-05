"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import TextChatUI from "../ask/TextChatUI";
import VideoChatUI from "../ask/VideoChatUI";
import AudioChatUI from "../ask/AudioChatUI";
import { tabAnim } from "../types";

type ChatMode = "text" | "video" | "audio";

interface SessionOut {
  id: string;
  subject: string;
  class_name: string;
  title: string;
  created_at: string;
  updated_at: string;
}

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const SUBJECT_EMOJI: Record<string, string> = {
  Mathematics: "📐", Physics: "⚛️", Chemistry: "🧪", Biology: "🧬",
  Science: "🔬", "Computer Science": "💻", English: "📖", Hindi: "🇮🇳",
};

const MODE_LABEL: Record<ChatMode, string> = {
  text: "Text Chat", video: "Video Chat", audio: "Voice Chat",
};

interface AskTabProps {
  mode: ChatMode;
  grade: string | null;
  enrolledCourses: string[];
}

export default function AskTab({ mode, grade, enrolledCourses }: AskTabProps) {
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [sessions, setSessions] = useState<SessionOut[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [chatInstanceKey, setChatInstanceKey] = useState(0);
  // Skips the activeSessionId reset on the very first subject assignment.
  const subjectInitialized = useRef(false);

  useEffect(() => {
    setSubjectsLoading(true);
    fetch("/api/user/available-subjects")
      .then((r) => (r.ok ? r.json() : []))
      .then((subjects: string[]) => {
        setAvailableSubjects(subjects);
        if (subjects.length > 0) {
          setSubject((prev) => (subjects.includes(prev) ? prev : subjects[0]));
        } else {
          setSubject("");
        }
      })
      .catch(() => {
        setAvailableSubjects([]);
        setSubject("");
      })
      .finally(() => setSubjectsLoading(false));
  }, []);

  const className = grade ? grade.replace("class-", "") : "";

  const refreshSessions = useCallback(() => {
    fetch("/api/chat/sessions")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: SessionOut[]) => setSessions(data))
      .catch(() => {});
  }, []);

  useEffect(() => { refreshSessions(); }, [refreshSessions]);

  useEffect(() => {
    setActiveSessionId(null);
    setShowHistory(false);
  }, [mode]);

  useEffect(() => {
    // Skip the reset on the very first subject assignment (initial load or session restore).
    if (!subjectInitialized.current) {
      subjectInitialized.current = true;
      return;
    }
    setActiveSessionId(null);
    setChatInstanceKey((k) => k + 1);
    setShowHistory(false);
  }, [subject]);

  function openSession(id: string) {
    setActiveSessionId(id);
    setChatInstanceKey((k) => k + 1);
    setShowHistory(false);
  }

  return (
    <motion.div key={mode} {...tabAnim} className="space-y-6">

      {/* Heading row */}
      <div className="flex items-center justify-between gap-3">
        <h2
          className="text-2xl font-extrabold text-gray-800"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {MODE_LABEL[mode]}
        </h2>

        <div className="flex items-center gap-2">
          {mode === "text" && (
            <>
              {/* Subject dropdown */}
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={subjectsLoading || availableSubjects.length === 0}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm font-bold text-gray-700 outline-none focus:border-blue-400 focus:bg-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-nunito)" }}
                >
                  {subjectsLoading ? (
                    <option value="">Loading...</option>
                  ) : availableSubjects.length === 0 ? (
                    <option value="">No subjects available</option>
                  ) : (
                    availableSubjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                  <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* History toggle */}
              <button
                onClick={() => setShowHistory((v) => !v)}
                title="Chat history"
                className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-all ${
                  showHistory
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <History className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chat / History panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col h-[600px]"
            >
              {/* History header */}
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <p className="font-extrabold text-gray-800 text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Recent Sessions
                </p>
                <button
                  onClick={() => setShowHistory(false)}
                  className="h-7 w-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Session list */}
              <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
                {sessions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-4xl mb-3">💬</span>
                    <p className="text-sm font-bold text-gray-500 mb-1">No sessions yet</p>
                    <p className="text-xs text-gray-400">Start a conversation to see your history here.</p>
                  </div>
                ) : (
                  sessions.slice(0, 7).map((session) => {
                    const isActive = session.id === activeSessionId;
                    return (
                      <div
                        key={session.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          isActive ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-xl flex-shrink-0">{SUBJECT_EMOJI[session.subject] ?? "📚"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">{session.title}</p>
                          <p className="text-xs text-gray-400">
                            {session.subject} · Class {session.class_name} · {timeAgo(session.updated_at)}
                          </p>
                        </div>
                        <button
                          onClick={() => openSession(session.id)}
                          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 flex-shrink-0"
                        >
                          {isActive ? "Active" : "Continue"}
                          {!isActive && <ArrowRight className="h-3 w-3" />}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* View all */}
              <div className="pt-3 border-t border-gray-100 mt-3 flex-shrink-0">
                <Link
                  href="/dashboard/history"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-50 border border-blue-100 transition-all"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  View All Sessions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`chat-${mode}-${chatInstanceKey}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {mode === "text" && activeSessionId && (
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => { setActiveSessionId(null); setChatInstanceKey((k) => k + 1); }}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-bold"
                  >
                    <Plus className="h-3 w-3" />
                    New chat
                  </button>
                </div>
              )}
              {mode === "text" && !subjectsLoading && availableSubjects.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[340px] text-center gap-3 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-5xl">📚</span>
                  <p className="text-base font-extrabold text-gray-700" style={{ fontFamily: "var(--font-fredoka)" }}>
                    No content available yet
                  </p>
                  <p className="text-sm text-gray-400 max-w-xs">
                    Study material for your class and board hasn&apos;t been added yet. Check back soon!
                  </p>
                </div>
              )}
              {mode === "text" && subject && (
                <TextChatUI
                  subject={subject}
                  className={className}
                  initialSessionId={activeSessionId ?? undefined}
                  onSessionCreated={(id) => { setActiveSessionId(id); refreshSessions(); }}
                  key={chatInstanceKey}
                />
              )}
              {mode === "video" && <VideoChatUI />}
              {mode === "audio" && <AudioChatUI />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
