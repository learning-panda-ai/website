"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mic, Video, Plus, Search, CloudIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import TextChatUI from "../ask/TextChatUI";
import VideoChatUI from "../ask/VideoChatUI";
import AudioChatUI from "../ask/AudioChatUI";

type ChatMode = "text" | "video" | "audio";

interface SessionOut {
  id: string;
  subject: string;
  class_name: string;
  title: string;
  created_at: string;
  updated_at: string;
}

function formatSessionDate(isoDate: string): string {
  const d = new Date(isoDate);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

const SUBJECT_COLOR: Record<string, string> = {
  Mathematics: "text-blue-600",
  Physics:     "text-indigo-600",
  Chemistry:   "text-rose-600",
  Biology:     "text-emerald-600",
  English:     "text-orange-600",
  Hindi:       "text-amber-600",
};

const MODES: { id: ChatMode; label: string; Icon: React.ElementType }[] = [
  { id: "text",  label: "Text",  Icon: MessageSquare },
  { id: "audio", label: "Voice", Icon: Mic           },
  { id: "video", label: "Video", Icon: Video         },
];

interface AskTabProps {
  mode: ChatMode;
  grade: string | null;
  enrolledCourses: string[];
  currentStreak: number;
  userName: string;
  userImage: string | null;
}

export default function AskTab({ mode, grade, enrolledCourses, currentStreak, userName, userImage }: AskTabProps) {
  const [activeMode, setActiveMode] = useState<ChatMode>(mode);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [sessions, setSessions] = useState<SessionOut[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [chatInstanceKey, setChatInstanceKey] = useState(0);
  const subjectInitialized = useRef(false);

  // Sync mode from parent (e.g. sidebar click)
  useEffect(() => { setActiveMode(mode); }, [mode]);

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
      .catch(() => { setAvailableSubjects([]); setSubject(""); })
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
    if (!subjectInitialized.current) { subjectInitialized.current = true; return; }
    setActiveSessionId(null);
    setChatInstanceKey((k) => k + 1);
  }, [subject]);

  function openSession(id: string) {
    setActiveSessionId(id);
    setChatInstanceKey((k) => k + 1);
  }

  function newChat() {
    setActiveSessionId(null);
    setChatInstanceKey((k) => k + 1);
  }

  // Group sessions by date label
  const grouped = sessions.slice(0, 20).reduce<Record<string, SessionOut[]>>((acc, s) => {
    const label = formatSessionDate(s.updated_at);
    (acc[label] ??= []).push(s);
    return acc;
  }, {});

  return (
    <motion.div
      key="ask"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full flex flex-col"
      style={{ fontFamily: "var(--font-nunito)" }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="shrink-0 px-5 py-3 border-b border-[#43A047]/8 bg-[#FDFBF7]/80 backdrop-blur flex items-center justify-between gap-4 flex-wrap">
        {/* Left: subject label + mode tabs */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#43A047] opacity-70">
              Currently Learning
            </p>
            <p className="text-sm font-bold text-[#1B5E20] leading-none mt-0.5">
              {subjectsLoading ? "Loading…" : subject || "No subject"}
              {className ? ` · Class ${className}` : ""}
            </p>
          </div>

          {/* Mode switcher tabs */}
          <div className="flex items-center gap-0.5 bg-[#F0EDE4] rounded-full p-1">
            {MODES.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveMode(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeMode === id
                    ? "bg-white text-[#43A047] shadow-sm"
                    : "text-[#44483D] hover:text-[#1B5E20]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: subject selector + new chat */}
        <div className="flex items-center gap-2">
          {activeMode === "text" && (
            <>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={subjectsLoading || availableSubjects.length === 0}
                  className="appearance-none bg-[#F0EDE4] border-none rounded-full pl-3 pr-8 py-1.5 text-xs font-bold text-[#1B1C17] outline-none focus:ring-2 focus:ring-[#43A047]/20 cursor-pointer disabled:opacity-50 transition-all"
                >
                  {subjectsLoading ? (
                    <option>Loading…</option>
                  ) : availableSubjects.length === 0 ? (
                    <option>No subjects</option>
                  ) : (
                    availableSubjects.map((s) => <option key={s} value={s}>{s}</option>)
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
                  <svg className="h-3 w-3 text-[#44483D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={newChat}
                title="New chat"
                className="flex items-center gap-1.5 text-xs font-bold text-[#43A047] bg-[#C8E6C9] hover:bg-[#A5D6A7] px-3 py-1.5 rounded-full transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                New
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── Body: chat + history sidebar ────────────────────────── */}
      <div className="flex-1 min-h-0 flex">
        {/* Main chat panel */}
        <div className="flex-1 min-w-0 relative">
          {/* Bamboo dot pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#43A047 0.5px, transparent 0.5px)",
              backgroundSize: "24px 24px",
              opacity: 0.04,
            }}
          />

          {activeMode === "text" && !subjectsLoading && availableSubjects.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 p-8">
              <span className="text-5xl">📚</span>
              <p className="text-base font-bold text-[#1B1C17]" style={{ fontFamily: "var(--font-fredoka)" }}>
                No content available yet
              </p>
              <p className="text-sm text-[#44483D] max-w-xs">
                Study material for your class and board hasn&apos;t been added yet. Check back soon!
              </p>
            </div>
          )}

          {activeMode === "text" && subject && (
            <TextChatUI
              subject={subject}
              className={className}
              initialSessionId={activeSessionId ?? undefined}
              onSessionCreated={(id) => { setActiveSessionId(id); refreshSessions(); }}
              key={chatInstanceKey}
              enrolledCourses={enrolledCourses}
            />
          )}
          {activeMode === "video" && <VideoChatUI key="video" />}
          {activeMode === "audio" && (
            <AudioChatUI key="audio" subject={subject} className={className} />
          )}
        </div>

        {/* ── History sidebar (text mode, lg+) ── */}
        {activeMode === "text" && (
          <aside className="hidden lg:flex flex-col w-72 shrink-0 border-l border-[#43A047]/8 bg-[#F5F2EA] overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between shrink-0 border-b border-[#43A047]/8">
              <h3 className="font-bold text-[#1B1C17]" style={{ fontFamily: "var(--font-fredoka)" }}>
                History
              </h3>
              <button className="p-1.5 hover:bg-[#E8E4D9] rounded-full transition-colors">
                <Search className="h-4 w-4 text-[#44483D]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 custom-scrollbar">
              {sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-2 py-8">
                  <span className="text-3xl">💬</span>
                  <p className="text-sm font-bold text-[#44483D]">No sessions yet</p>
                  <p className="text-xs text-[#75796C]">Start a conversation to see your history.</p>
                </div>
              ) : (
                Object.entries(grouped).map(([label, group]) => (
                  <div key={label} className="space-y-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#75796C]">
                      {label}
                    </p>
                    {group.map((session) => {
                      const isActive = session.id === activeSessionId;
                      return (
                        <button
                          key={session.id}
                          onClick={() => openSession(session.id)}
                          className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer group ${
                            isActive
                              ? "bg-white shadow-sm border border-[#43A047]/15"
                              : "hover:bg-[#EBE8DD] border border-transparent"
                          }`}
                        >
                          <p className="font-bold text-sm text-[#1B1C17] truncate mb-1">{session.title}</p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[#75796C]">
                              {new Date(session.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </span>
                            <span className="w-1 h-1 bg-[#75796C] rounded-full" />
                            <span className={`font-bold ${SUBJECT_COLOR[session.subject] ?? "text-[#43A047]"}`}>
                              {session.subject}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="px-4 py-4 space-y-3 shrink-0 border-t border-[#43A047]/8">
              <Link
                href="/dashboard/history"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-[#43A047] hover:bg-[#C8E6C9] transition-colors"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                View All Sessions
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#F0EDE4] text-center justify-center">
                <CloudIcon className="h-4 w-4 text-[#43A047]" />
                <p className="text-xs text-[#44483D] font-medium">Chats synced to your account</p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </motion.div>
  );
}
