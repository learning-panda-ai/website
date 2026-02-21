"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Session } from "next-auth";
import { Pencil } from "lucide-react";
import { tabAnim } from "../types";

interface ProfileTabProps {
  user: Session["user"];
  enrolledCourses: string[];
}

export default function ProfileTab({ user, enrolledCourses }: ProfileTabProps) {
  const firstName = user?.name?.split(" ")[0] ?? "Learner";

  return (
    <motion.div key="profile" {...tabAnim} className="space-y-6">
      <h2 className="text-2xl font-extrabold text-gray-800" style={{ fontFamily: "var(--font-fredoka)" }}>
        Profile
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="h-20 w-20 rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-3xl font-bold text-green-700 flex-shrink-0">
          {firstName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-extrabold text-gray-800 text-lg" style={{ fontFamily: "var(--font-fredoka)" }}>
            {user?.name}
          </p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{user?.email}</p>
          <p className="text-xs text-gray-300 mt-1">Profile photo synced from Google</p>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-2 text-sm font-bold text-gray-600 border border-gray-200 hover:border-green-300 hover:text-green-700 px-4 py-2 rounded-xl transition-all flex-shrink-0"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit Profile
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-700 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
          Learning Summary
        </h3>
        <div className="space-y-3">
          {[
            { label: "Enrolled Courses", value: `${enrolledCourses.length} courses` },
            { label: "Study Streak",     value: "7 days 🔥" },
            { label: "Topics Learned",   value: "24 📚" },
            { label: "Questions Asked",  value: "142 💬" },
            { label: "Score Average",    value: "88% ⭐" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-gray-500">{row.label}</span>
              <span className="font-bold text-gray-700">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
