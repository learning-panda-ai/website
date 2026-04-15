"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { tabAnim } from "@/lib/animations/settings";
import type { UserProp } from "@/types/settings";

export default function SecurityTab({ user }: { user: UserProp }) {
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date(user.createdAt);
  const memberSince = `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

  return (
    <motion.div key="security" {...tabAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left col: account details + danger zone */}
      <div className="lg:col-span-2 flex flex-col gap-6">

        {/* Account details */}
        <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6 sm:p-8">
          <h3 className="font-bold text-[#1B5E20] text-xl mb-5" style={{ fontFamily: "var(--font-fredoka)" }}>
            Account Details
          </h3>
          <div className="space-y-5">
            <div>
              <label className="text-sm font-bold text-[#1B5E20] px-1 block mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                Email Address
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="flex-1 bg-[#E8E4D9]/50 border-none rounded-xl py-3 px-4 text-[#44483D]/70 cursor-not-allowed outline-none"
                />
                <span className="self-start flex items-center gap-1 text-xs font-bold text-[#43A047] bg-[#43A047]/10 border border-[#43A047]/20 px-3 py-1.5 rounded-full whitespace-nowrap">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                </span>
              </div>
              <p className="text-xs text-[#75796C] mt-1.5 px-1">Managed by Google — cannot be changed here.</p>
            </div>
            <div>
              <label className="text-sm font-bold text-[#1B5E20] px-1 block mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
                Member Since
              </label>
              <p className="text-sm font-semibold text-[#44483D] px-1">{memberSince}</p>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-bold text-red-600 text-xl mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
              Account Safety
            </h3>
            <p className="text-sm text-[#44483D]/70 mb-6">
              Deactivating your account will permanently remove your course progress, streaks, and certificates.
              This action cannot be undone.
            </p>
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              <AlertTriangle className="h-4 w-4" />
              Delete Account
            </button>
          </div>
          <span className="absolute -bottom-4 -right-4 text-[120px] text-red-500/5 select-none leading-none pointer-events-none">⚠</span>
        </div>
      </div>

      {/* Right col: connected accounts + privacy */}
      <div className="lg:col-span-1 flex flex-col gap-4">

        {/* Connected accounts */}
        <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6">
          <h3 className="font-bold text-[#1B5E20] text-lg mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
            Connected Accounts
          </h3>
          <div className="flex items-center justify-between gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 bg-white rounded-xl border border-blue-100 flex items-center justify-center shadow-sm flex-shrink-0">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#1B1C17]">Google</p>
                <p className="text-xs text-[#75796C] truncate">{user.email}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#43A047] bg-[#43A047]/10 border border-[#43A047]/20 px-3 py-1 rounded-full flex-shrink-0">
              Connected
            </span>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-[#43A047]/5 border border-[#43A047]/10 rounded-2xl p-5 flex gap-3">
          <span className="text-2xl">🐼</span>
          <div>
            <p className="text-sm font-bold text-[#1B5E20] mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
              Your data is safe with Panda!
            </p>
            <p className="text-xs text-[#44483D]/60 leading-relaxed">
              We never sell your personal data to third parties. All data is used only to improve
              your learning experience and keep it personalised just for you.
            </p>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
