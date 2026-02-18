"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginSignup from "@/components/LoginSignup";
import Onboarding from "@/components/onboarding/Onboarding";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [justOnboarded, setJustOnboarded] = useState(false);

  // Already-onboarded users who land on /login get sent straight to dashboard
  useEffect(() => {
    if (status === "authenticated" && session?.user?.onboarded && !justOnboarded) {
      router.replace("/dashboard");
    }
  }, [status, session, justOnboarded, router]);

  const view =
    status === "loading" || !session?.user
      ? "auth"
      : justOnboarded
      ? "done"
      : session.user.onboarded
      ? "redirecting"
      : "onboarding";

  return (
    <AnimatePresence mode="wait">
      {view === "auth" && (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <LoginSignup />
        </motion.div>
      )}

      {view === "onboarding" && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Onboarding onComplete={async () => { await update(); setJustOnboarded(true); }} />
        </motion.div>
      )}

      {view === "done" && (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bamboo-dots relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
          style={{
            background: "linear-gradient(160deg, #FFFDF7 0%, #E8F5E9 50%, #F1F8E9 100%)",
          }}
        >
          <motion.div
            className="absolute text-6xl select-none pointer-events-none"
            style={{ top: "10%", left: "10%" }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🎉
          </motion.div>
          <motion.div
            className="absolute text-5xl select-none pointer-events-none"
            style={{ top: "15%", right: "15%" }}
            animate={{ y: [0, -10, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            🌟
          </motion.div>
          <motion.div
            className="absolute text-4xl select-none pointer-events-none"
            style={{ bottom: "15%", left: "15%" }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            🍃
          </motion.div>
          <motion.div
            className="absolute text-5xl select-none pointer-events-none"
            style={{ bottom: "20%", right: "10%" }}
            animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            🏆
          </motion.div>
          <motion.div
            className="absolute text-4xl select-none pointer-events-none"
            style={{ top: "40%", left: "5%" }}
            animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            🎋
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="panda-bounce mb-6 flex h-28 w-28 items-center justify-center rounded-4xl bg-white shadow-xl shadow-green-200/50 border-3 border-green-200"
          >
            <span className="text-6xl">🐼</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </motion.div>
              <span
                className="text-sm font-extrabold text-green-500 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                You did it!
              </span>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </motion.div>
            </div>
            <h1
              className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl bg-linear-to-r from-green-600 via-emerald-500 to-green-400 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              You&apos;re all set!
            </h1>
            <p className="mx-auto max-w-md text-base text-green-600/70 font-medium">
              Your awesome learning adventure is about to begin! 🚀
              <br />
              We&apos;ve made everything just right for you. 🌟
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
            className="kids-submit-btn mt-8 flex items-center gap-2 rounded-2xl px-10 py-4 text-base font-extrabold text-white"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <Sparkles className="h-5 w-5" />
            Start Learning! 🎮
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
