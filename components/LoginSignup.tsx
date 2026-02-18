"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Sparkles, Lightbulb, ShieldCheck } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

const features = [
  { icon: "🎓", label: "Smart Learning" },
  { icon: "⚡", label: "Instant Help" },
  { icon: "📚", label: "1000+ Courses" },
  { icon: "🎮", label: "Fun & Games" },
];

const floatingEmojis = [
  { emoji: "🍃", top: "8%", left: "8%", delay: 0, duration: 6 },
  { emoji: "🎋", top: "18%", right: "18%", delay: 1, duration: 7 },
  { emoji: "⭐", bottom: "25%", left: "12%", delay: 0.5, duration: 5 },
  { emoji: "📖", bottom: "12%", right: "15%", delay: 2, duration: 8 },
  { emoji: "🌿", top: "45%", left: "5%", delay: 1.5, duration: 6 },
  { emoji: "💡", top: "70%", right: "8%", delay: 0.8, duration: 7 },
];

export default function LoginSignup() {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  async function handleGoogleSignIn() {
    if (!turnstileToken) return;
    setVerifying(true);
    setError(null);

    try {
      const res = await fetch("/api/verify-turnstile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: turnstileToken }),
      });

      const data = await res.json();

      if (!data.success) {
        setError("Bot check failed. Please try again.");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      await signIn("google");
    } catch {
      setError("Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden">
      {/* Left: Bamboo Forest Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="panda-forest-bg relative isolate flex flex-col items-center justify-center overflow-hidden px-8 py-16 lg:w-1/2 lg:py-0"
      >
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        <div className="glow-orb glow-orb-3" />

        {floatingEmojis.map((item, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl select-none pointer-events-none opacity-60"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.emoji}
          </motion.span>
        ))}

        <div className="relative z-10 mx-auto max-w-md text-center">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-6"
          >
            <div className="panda-bounce mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/90 shadow-xl shadow-black/20 border-2 border-white/50">
              <span className="text-5xl">🐼</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-2 text-4xl font-extrabold tracking-tight text-white lg:text-5xl"
            style={{ fontFamily: "var(--font-fredoka), var(--font-nunito), sans-serif" }}
          >
            Learning Panda
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-500/25 px-5 py-2 backdrop-blur-sm border border-yellow-400/40"
          >
            <Lightbulb className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-bold text-yellow-100" style={{ fontFamily: "var(--font-fredoka)" }}>
              AI-Powered
            </span>
            <Sparkles className="h-4 w-4 text-yellow-300" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-10 text-base leading-relaxed text-green-100/90 font-medium"
          >
            Your cheerful AI study buddy that makes learning
            <br />
            <span className="text-yellow-200 font-bold">fun</span>,{" "}
            <span className="text-green-200 font-bold">easy</span>, and{" "}
            <span className="text-white font-bold">effective!</span> 🚀
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-4 py-2.5 backdrop-blur-sm"
              >
                <span className="text-lg">{f.icon}</span>
                <span className="text-sm font-bold text-white">{f.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* Right: Auth Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative isolate flex flex-1 items-center justify-center bg-white px-6 py-12"
      >
        <div className="absolute inset-0 bamboo-dots opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-3 inline-block text-4xl"
            >
              👋
            </motion.div>
            <h2
              className="text-3xl font-extrabold tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Welcome Back!
            </h2>
            <p className="mt-2 text-base text-gray-500 font-medium">
              Sign in with Google to continue.
            </p>
          </motion.div>

          {/* Turnstile widget */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-4 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-1.5 mb-1 text-xs text-gray-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
              <span>Quick bot check</span>
            </div>
            {siteKey ? (
              <Turnstile
                ref={turnstileRef}
                siteKey={siteKey}
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                onError={() => {
                  setTurnstileToken(null);
                  setError("Bot check error. Please refresh and try again.");
                }}
                options={{ theme: "light" }}
              />
            ) : (
              <p className="text-xs text-amber-500 font-medium">
                NEXT_PUBLIC_TURNSTILE_SITE_KEY not set
              </p>
            )}
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 text-center text-sm font-semibold text-red-500"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="button"
            whileHover={turnstileToken && !verifying ? { scale: 1.02, y: -2 } : {}}
            whileTap={turnstileToken && !verifying ? { scale: 0.98 } : {}}
            onClick={handleGoogleSignIn}
            disabled={!turnstileToken || verifying}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {verifying ? (
              <>
                <svg className="h-5 w-5 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Verifying…
              </>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.2 3.23l6.9-6.9C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.82 2.69 14.09l8.06 6.26C12.6 13.6 17.85 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z" />
                    <path fill="#FBBC05" d="M10.75 28.35a14.5 14.5 0 0 1 0-8.7l-8.06-6.26A23.94 23.94 0 0 0 0 24c0 3.93.94 7.65 2.69 10.91l8.06-6.26z" />
                    <path fill="#EA4335" d="M24 48c6.13 0 11.64-2.03 15.54-5.54l-7.19-5.6c-2.01 1.35-4.59 2.14-8.35 2.14-6.15 0-11.4-4.1-13.25-9.59l-8.06 6.26C6.73 42.18 14.82 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </g>
                </svg>
                Sign in with Google
              </>
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400"
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💚
            </motion.span>
            <span>by Learning Panda</span>
            <span>🐼</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
