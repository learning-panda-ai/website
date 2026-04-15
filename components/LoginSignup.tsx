"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShieldCheck, Mail, ArrowLeft, RefreshCw, ArrowRight, Star } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { useAuth } from "@/app/providers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const stats = [
  { value: "50K+", label: "Students" },
  { value: "4.9", label: "Rating", icon: <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> },
  { value: "1000+", label: "Lessons" },
];

const highlights = [
  { emoji: "🎓", title: "AI Tutor", desc: "Personalized for your grade" },
  { emoji: "⚡", title: "Instant Help", desc: "Answers in seconds, 24/7" },
  { emoji: "📈", title: "Track Progress", desc: "See yourself improve daily" },
];

type AuthStep = "method" | "email-input" | "otp-input";

export default function LoginSignup() {
  const { refreshAuth } = useAuth();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [step, setStep] = useState<AuthStep>("method");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function verifyTurnstile(): Promise<boolean> {
    if (!turnstileToken) return false;
    const res = await fetch("/api/verify-turnstile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: turnstileToken }),
    });
    const data = await res.json();
    if (!data.success) {
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
    return data.success;
  }

  async function handleGoogleSignIn() {
    if (!turnstileToken) return;
    setVerifying(true);
    setError(null);
    try {
      const ok = await verifyTurnstile();
      if (!ok) { setError("Bot check failed. Please try again."); return; }
      window.location.href = `${BACKEND_URL}/api/v1/auth/google`;
    } catch {
      setError("Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setVerifying(false);
    }
  }

  async function handleSendOtp() {
    if (!email || !turnstileToken) return;
    setSendingOtp(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, turnstile_token: turnstileToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        setError(data.detail ?? "Failed to send OTP.");
        return;
      }
      turnstileRef.current?.reset();
      setTurnstileToken(null);
      setStep("otp-input");
      startResendCooldown();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  }

  function startResendCooldown() {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((c) => {
        if (c <= 1) { clearInterval(interval); return 0; }
        return c - 1;
      });
    }, 1000);
  }

  async function handleResendOtp() {
    if (resendCooldown > 0) return;
    setSendingOtp(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.detail ?? "Failed to resend OTP."); return; }
      startResendCooldown();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otp || otp.length !== 6) return;
    setSigningIn(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp_code: otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.detail ?? "Invalid or expired code. Please try again.");
        setOtp("");
        return;
      }
      await fetch("/api/auth/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        }),
      });
      await refreshAuth();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-white">
      {/* ── Left: Brand Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative hidden lg:flex lg:w-[52%] flex-col overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #0a2e14 0%, #0f4a22 25%, #166534 55%, #15803d 75%, #16a34a 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              width: 420,
              height: 420,
              top: "-80px",
              right: "-100px",
              background: "radial-gradient(circle, rgba(74,222,128,0.18) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 300,
              height: 300,
              bottom: "60px",
              left: "-60px",
              background: "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 200,
              height: 200,
              top: "45%",
              left: "55%",
              background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-12 py-14 justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
              <span className="text-xl">🐼</span>
            </div>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Learning Panda
            </span>
          </motion.div>

          {/* Main hero content */}
          <div className="flex flex-col gap-8">
            {/* Mascot + heading */}
            <div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 14 }}
                className="mb-7 inline-flex"
              >
                <div
                  className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/25"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <motion.span
                    className="text-5xl"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🐼
                  </motion.span>
                  {/* Sparkle badges */}
                  <motion.span
                    className="absolute -top-2 -right-2 text-lg"
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    ✨
                  </motion.span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-4 text-[2.75rem] font-extrabold leading-[1.1] tracking-tight text-white"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Your AI-Powered
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #86efac, #fde68a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Study Buddy
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-base leading-relaxed text-green-100/75 font-medium max-w-sm"
              >
                Ask any question, get instant step-by-step explanations, and
                make learning <span className="text-white font-semibold">actually fun</span>.
              </motion.p>
            </div>

            {/* Highlight cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-3"
            >
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/12 px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="text-2xl">{h.emoji}</span>
                  <div>
                    <div className="text-sm font-bold text-white">{h.title}</div>
                    <div className="text-xs text-green-200/70">{h.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-6"
          >
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span
                    className="text-2xl font-extrabold text-white"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {s.value}
                  </span>
                  {s.icon}
                </div>
                <span className="text-xs text-green-200/60 font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right: Auth Panel ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-14 sm:px-10"
      >
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex items-center gap-2 lg:hidden"
          >
            <span className="text-2xl">🐼</span>
            <span
              className="text-lg font-bold text-gray-900"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Learning Panda
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* ── Step: method ── */}
            {step === "method" && (
              <motion.div
                key="method"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
              >
                {/* Heading */}
                <div className="mb-8">
                  <h2
                    className="text-[2rem] font-extrabold tracking-tight text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Welcome back! 👋
                  </h2>
                  <p className="mt-1.5 text-sm text-gray-400 font-medium">
                    Sign in to continue your learning adventure.
                  </p>
                </div>

                {/* Bot check */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                    <span>Quick security check</span>
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
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-2.5"
                  >
                    <p className="text-sm font-semibold text-red-500">{error}</p>
                  </motion.div>
                )}

                <div className="flex flex-col gap-3">
                  {/* Google */}
                  <motion.button
                    type="button"
                    whileHover={turnstileToken && !verifying ? { scale: 1.015 } : {}}
                    whileTap={turnstileToken && !verifying ? { scale: 0.985 } : {}}
                    onClick={handleGoogleSignIn}
                    disabled={!turnstileToken || verifying}
                    className="relative flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-bold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
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
                        <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.2 3.23l6.9-6.9C35.64 2.36 30.13 0 24 0 14.82 0 6.73 5.82 2.69 14.09l8.06 6.26C12.6 13.6 17.85 9.5 24 9.5z" />
                            <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.3 46.1 24.55z" />
                            <path fill="#FBBC05" d="M10.75 28.35a14.5 14.5 0 0 1 0-8.7l-8.06-6.26A23.94 23.94 0 0 0 0 24c0 3.93.94 7.65 2.69 10.91l8.06-6.26z" />
                            <path fill="#EA4335" d="M24 48c6.13 0 11.64-2.03 15.54-5.54l-7.19-5.6c-2.01 1.35-4.59 2.14-8.35 2.14-6.15 0-11.4-4.1-13.25-9.59l-8.06 6.26C6.73 42.18 14.82 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                          </g>
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-1">
                    <div className="h-px flex-1 bg-gray-100" />
                    <span className="text-xs text-gray-300 font-semibold">OR</span>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>

                  {/* Email button */}
                  <motion.button
                    type="button"
                    whileHover={turnstileToken && !verifying ? { scale: 1.015 } : {}}
                    whileTap={turnstileToken && !verifying ? { scale: 0.985 } : {}}
                    onClick={() => { setError(null); setStep("email-input"); }}
                    disabled={!turnstileToken || verifying}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm font-bold text-green-700 transition-all hover:bg-green-100 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Mail className="h-4.5 w-4.5" />
                    Continue with Email
                  </motion.button>
                </div>

                <p className="mt-8 text-center text-xs text-gray-300">
                  By continuing, you agree to our{" "}
                  <a href="/terms-of-service" className="text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">
                    Terms
                  </a>{" "}
                  &amp;{" "}
                  <a href="/privacy-policy" className="text-gray-400 underline underline-offset-2 hover:text-gray-600 transition-colors">
                    Privacy Policy
                  </a>
                </p>
              </motion.div>
            )}

            {/* ── Step: email input ── */}
            {step === "email-input" && (
              <motion.div
                key="email-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => { setStep("method"); setError(null); }}
                  className="mb-7 flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <div className="mb-8">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 border border-green-100">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <h2
                    className="text-[2rem] font-extrabold tracking-tight text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Enter your email
                  </h2>
                  <p className="mt-1.5 text-sm text-gray-400 font-medium">
                    We&apos;ll send you a 6-digit sign-in code.
                  </p>
                </div>

                <div className="mb-4 space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-800 placeholder-gray-300 outline-none transition focus:border-green-400 focus:bg-white focus:ring-3 focus:ring-green-100"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-2.5"
                  >
                    <p className="text-sm font-semibold text-red-500">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  whileHover={email && !sendingOtp ? { scale: 1.015 } : {}}
                  whileTap={email && !sendingOtp ? { scale: 0.985 } : {}}
                  onClick={handleSendOtp}
                  disabled={!email || sendingOtp}
                  className="kids-submit-btn flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-extrabold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {sendingOtp ? (
                    <>
                      <svg className="h-4.5 w-4.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Code
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* ── Step: OTP ── */}
            {step === "otp-input" && (
              <motion.div
                key="otp-input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => { setStep("email-input"); setError(null); setOtp(""); }}
                  className="mb-7 flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <div className="mb-8">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 border border-green-100">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h2
                    className="text-[2rem] font-extrabold tracking-tight text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Check your inbox
                  </h2>
                  <p className="mt-1.5 text-sm text-gray-400 font-medium">
                    We sent a 6-digit code to{" "}
                    <span className="font-bold text-green-600">{email}</span>
                  </p>
                </div>

                <div className="mb-4 space-y-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">
                    6-digit code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    onKeyDown={(e) => e.key === "Enter" && otp.length === 6 && handleVerifyOtp()}
                    placeholder="000000"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-center text-3xl font-extrabold tracking-[0.5em] text-gray-800 placeholder-gray-200 outline-none transition focus:border-green-400 focus:bg-white focus:ring-3 focus:ring-green-100"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-2.5"
                  >
                    <p className="text-sm font-semibold text-red-500">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  whileHover={otp.length === 6 && !signingIn ? { scale: 1.015 } : {}}
                  whileTap={otp.length === 6 && !signingIn ? { scale: 0.985 } : {}}
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6 || signingIn}
                  className="kids-submit-btn flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-extrabold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {signingIn ? (
                    <>
                      <svg className="h-4.5 w-4.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Verify &amp; Sign In
                    </>
                  )}
                </motion.button>

                <div className="mt-5 flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-400">Didn&apos;t receive it?</span>
                  <button
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || sendingOtp}
                    className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${sendingOtp ? "animate-spin" : ""}`} />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
