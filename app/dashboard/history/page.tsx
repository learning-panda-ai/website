import { requireAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface SessionOut {
  id: string;
  subject: string;
  class_name: string;
  title: string;
  created_at: string;
  updated_at: string;
}

const SUBJECT_EMOJI: Record<string, string> = {
  Mathematics: "📐",
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🧬",
  Science: "🔬",
  "Computer Science": "💻",
  English: "📖",
  Hindi: "🇮🇳",
};

const SUBJECT_COLOR: Record<string, string> = {
  Mathematics:        "bg-blue-50   border-blue-100   text-blue-600",
  Physics:            "bg-purple-50 border-purple-100 text-purple-600",
  Chemistry:          "bg-orange-50 border-orange-100 text-orange-600",
  Biology:            "bg-green-50  border-green-100  text-green-600",
  Science:            "bg-teal-50   border-teal-100   text-teal-600",
  "Computer Science": "bg-indigo-50 border-indigo-100 text-indigo-600",
  English:            "bg-rose-50   border-rose-100   text-rose-600",
  Hindi:              "bg-amber-50  border-amber-100  text-amber-600",
};

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default async function HistoryPage() {
  const token = await requireAuth();

  const res = await fetch(`${BACKEND_URL}/api/v1/chat/sessions`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) redirect("/dashboard");

  const sessions: SessionOut[] = await res.json();

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "var(--font-nunito)" }}>
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/dashboard"
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1
              className="text-2xl font-extrabold text-gray-800 leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Chat History
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">{sessions.length} conversation{sessions.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Session list */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-3xl bg-green-50 border-2 border-green-100 flex items-center justify-center text-4xl mb-4 shadow-sm">
              🐼
            </div>
            <p className="font-extrabold text-gray-700 text-lg mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
              No conversations yet
            </p>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Start a chat with Panda and your conversations will appear here.
            </p>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Start Chatting
            </Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {sessions.map((session) => {
              const colorClass = SUBJECT_COLOR[session.subject] ?? "bg-gray-50 border-gray-100 text-gray-500";
              return (
                <Link
                  key={session.id}
                  href={`/dashboard/chat/${session.id}`}
                  className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <div className={`h-12 w-12 rounded-xl border flex items-center justify-center text-2xl flex-shrink-0 ${colorClass}`}>
                    {SUBJECT_EMOJI[session.subject] ?? "📚"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate text-sm">{session.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${colorClass}`}>
                        {session.subject}
                      </span>
                      <span className="text-xs text-gray-400">Class {session.class_name}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{timeAgo(session.updated_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <MessageSquare className="h-3.5 w-3.5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                    <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
