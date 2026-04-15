'use client';
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { td, fadeUp } from "@/lib/animations/landingPage";

function LeftHighlight() {
    return (
        <div>
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0)}
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border"
                style={{
                    background: "#F0FDF4",
                    borderColor: "#86EFAC",
                    color: "#1A4731",
                }}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Now available for CBSE, ICSE & 4 State Boards
            </motion.div>

            <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.1)}
                className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-gray-900 leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
            >
                Your textbooks.{" "}
                <br className="hidden sm:block" />
                Your board.{" "}
                <span
                    className="relative inline-block"
                    style={{ color: "#1A4731" }}
                >
                    Your AI tutor.
                    <svg
                        className="absolute -bottom-1 left-0 w-full"
                        height="6"
                        viewBox="0 0 200 6"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path d="M0 3 Q100 0 200 3" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                    </svg>
                </span>
            </motion.h1>

            <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.2)}
                className="text-lg text-gray-500 leading-relaxed mb-8 max-w-125"
            >
                Learning Panda AI studies CBSE, ICSE, and State board textbooks so your child gets
                answers from the exact content their school teaches — not generic internet results.
            </motion.p>

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.3)}
                className="flex flex-col sm:flex-row gap-3 mb-8"
            >
                <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-3.5 rounded-2xl text-base transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: "#22C55E" }}
                >
                    🚀 Start Learning Free
                </Link>
                <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-base border-2 transition-all hover:-translate-y-0.5"
                    style={{ borderColor: "#1A4731", color: "#1A4731" }}
                >
                    See How It Works
                </a>
            </motion.div>

            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={td(0.4)}
                className="flex flex-wrap gap-2"
            >
                {["CBSE Aligned", "ICSE Aligned", "State Boards", "Class 1-12", "Hindi & English"].map((b) => (
                    <span
                        key={b}
                        className="inline-flex items-center gap-1.5 bg-white border text-gray-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
                        style={{ borderColor: "#E5E7EB" }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        {b}
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

function RightHighlight({ showChatResponse }: { showChatResponse: boolean }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={td(0.15)}
            className="relative"
        >
            {/* Floating cards */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-4 z-10 bg-white border shadow-md rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700"
                style={{ borderColor: "#E5E7EB" }}
                aria-hidden="true"
            >
                🔥 Day 14 streak!
            </motion.div>
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute -bottom-4 -left-2 z-10 bg-white border shadow-md rounded-xl px-3 py-2 flex items-center gap-2 text-xs font-bold text-gray-700"
                style={{ borderColor: "#E5E7EB" }}
                aria-hidden="true"
            >
                ✅ +50 XP earned
            </motion.div>

            <div
                className="bg-white rounded-3xl p-6 shadow-xl border"
                style={{ borderColor: "#E5E7EB" }}
                role="region"
                aria-label="AI chat demo"
            >
                {/* Chat header */}
                <div className="flex items-center gap-3 pb-4 mb-5 border-b" style={{ borderColor: "#F3F4F6" }}>
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
                        style={{ background: "linear-gradient(135deg, #1A4731, #22C55E)" }}
                        aria-hidden="true"
                    >
                        🐼
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">Panda AI Tutor</div>
                        <div className="text-xs font-semibold text-green-500">Class 9 · CBSE · Science</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-green-500">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online
                    </div>
                </div>

                {/* Messages */}
                <div className="space-y-4 min-h-50">
                    {/* Student message */}
                    <div className="flex gap-2.5 justify-end">
                        <div className="max-w-[80%]">
                            <div
                                className="text-xs font-semibold px-3.5 py-2.5 rounded-2xl rounded-br-sm leading-relaxed"
                                style={{ background: "#EFF6FF", color: "#1E40AF" }}
                            >
                                Explain Newton&apos;s third law from Class 9 CBSE Science Chapter 9
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1 text-right">Rohan, Class 9 · just now</p>
                        </div>
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 shrink-0 mt-0.5"
                            style={{ background: "#EFF6FF" }}
                            aria-label="Student"
                        >
                            R
                        </div>
                    </div>

                    {/* Typing / Response */}
                    <AnimatePresence mode="wait">
                        {!showChatResponse ? (
                            <motion.div
                                key="typing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-2.5"
                            >
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                                    style={{ background: "#F0FDF4" }}
                                    aria-label="Panda AI"
                                >
                                    🐼
                                </div>
                                <div
                                    className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
                                    style={{ background: "#F0FDF4" }}
                                    role="status"
                                    aria-label="Panda is typing"
                                >
                                    {[0, 0.15, 0.3].map((delay, i) => (
                                        <motion.span
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-green-500 block"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex gap-2.5"
                            >
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                                    style={{ background: "#F0FDF4" }}
                                    aria-label="Panda AI"
                                >
                                    🐼
                                </div>
                                <div className="max-w-[82%]">
                                    <div
                                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                                        style={{ background: "#1A4731", color: "#fff" }}
                                    >
                                        📘 Ch. 9: Force &amp; Laws of Motion
                                    </div>
                                    <div
                                        className="text-xs leading-relaxed px-3.5 py-2.5 rounded-2xl rounded-bl-sm"
                                        style={{ background: "#F0FDF4", color: "#111827" }}
                                    >
                                        Great question! According to your NCERT textbook, Chapter 9:{" "}
                                        <strong>Newton&apos;s Third Law</strong> states that for every action,
                                        there is an equal and opposite reaction.
                                        <br />
                                        <br />
                                        Example from your book: When you push against a wall, the wall pushes
                                        back with the same force — which is why you don&apos;t fall forward. 🤝
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Panda AI · from your exact CBSE textbook</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input bar */}
                <div
                    className="mt-4 flex items-center gap-2 rounded-full px-4 py-2.5 border"
                    style={{ background: "#F9FAFB", borderColor: "#E5E7EB" }}
                >
                    <span className="flex-1 text-xs text-gray-400">Ask any question from your textbook...</span>
                    <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "#22C55E" }}
                        aria-hidden="true"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function LandingPageHero() {
    const [showChatResponse, setShowChatResponse] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShowChatResponse(true), 2200);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            className="relative pt-20 pb-24 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #F0FDF4 0%, #FAFAF7 45%, #FAFAF7 100%)" }}
            aria-label="Hero"
        >
            {/* Background glow */}
            <div
                className="absolute top-0 right-0 w-150 h-150 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)" }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <LeftHighlight />
                    <RightHighlight showChatResponse={showChatResponse} />
                </div>
            </div>
        </section>
    )
}