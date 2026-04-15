"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle2, XCircle } from "lucide-react";
import { tabAnim } from "@/components/settings/types";

const FREE_FEATURES = [
  { ok: true,  text: "Ask Panda up to 20 questions / day" },
  { ok: true,  text: "Access to all core subjects" },
  { ok: true,  text: "Basic progress tracking" },
  { ok: true,  text: "Study streak tracking" },
  { ok: false, text: "Advanced AI explanations" },
  { ok: false, text: "Unlimited questions" },
  { ok: false, text: "Offline mode" },
  { ok: false, text: "Priority support" },
];

export default function SubscriptionTab() {
  return (
    <motion.div key="subscription" {...tabAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left: current plan */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6 sm:p-8">
        <h3 className="font-bold text-[#1B5E20] text-xl mb-5" style={{ fontFamily: "var(--font-fredoka)" }}>
          Current Plan
        </h3>

        {/* Plan badge */}
        <div className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-[#43A047]/5 border-2 border-[#43A047]/15 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🌱</span>
              <p className="font-extrabold text-[#1B5E20] text-xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                Free Learner
              </p>
            </div>
            <p className="text-sm text-[#44483D]/70">Enjoy free access to core learning features</p>
          </div>
          <p className="text-3xl font-extrabold text-[#43A047]" style={{ fontFamily: "var(--font-fredoka)" }}>
            ₹0<span className="text-base font-semibold text-[#75796C]"> /mo</span>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {FREE_FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              {f.ok
                ? <CheckCircle2 className="h-4 w-4 text-[#43A047] flex-shrink-0" />
                : <XCircle      className="h-4 w-4 text-[#CFD8DC]  flex-shrink-0" />}
              <span className={f.ok ? "text-[#1B1C17]" : "text-[#44483D]/40"}>{f.text}</span>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-[#43A047] hover:bg-[#388E3C] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Zap className="h-4 w-4" />
          Upgrade to Panda Pro
        </button>
      </div>

      {/* Right: payment + billing */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6">
          <h3 className="font-bold text-[#1B5E20] text-lg mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Payment Methods
          </h3>
          <p className="text-sm text-[#44483D]/60 mb-3">No payment methods added yet.</p>
          <button
            className="text-sm font-bold text-[#43A047] hover:text-[#388E3C] transition-colors"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            + Add payment method
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#43A047]/10 shadow-sm p-6">
          <h3 className="font-bold text-[#1B5E20] text-lg mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Billing History
          </h3>
          <p className="text-sm text-[#44483D]/60">
            No invoices yet. Upgrade to Panda Pro to start your premium learning journey!
          </p>
        </div>

        <div className="bg-[#F5F2EA] rounded-2xl p-5">
          <p className="text-xs font-bold text-[#75796C] uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            Need help?
          </p>
          <p className="text-xs text-[#44483D]/60 leading-relaxed">
            Questions about billing or your plan? Reach out to us at{" "}
            <span className="text-[#43A047] font-semibold">support@learningpanda.ai</span>
          </p>
        </div>
      </div>

    </motion.div>
  );
}
