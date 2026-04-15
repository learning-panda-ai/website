import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, td } from "@/lib/animations/landingPage"

export default function Gamefication({ leaderboard }: { leaderboard: { rank: string, name: string, xp: string, isYou: boolean }[] }) {
    return (
        <section
            id="gamification"
            className="py-24"
            style={{ background: "linear-gradient(135deg, #FEF3C7 0%, #FFF7ED 50%, #F0FDF4 100%)" }}
            aria-label="Gamification features"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div>
                        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                            Engagement by design
                        </motion.p>
                        <motion.h2
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(0.1)}
                            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-5"
                            style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                            Learning that feels like a game
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(0.2)}
                            className="text-gray-500 leading-relaxed mb-8"
                        >
                            Students who maintain streaks study 3× more consistently. Panda&apos;s XP system,
                            leaderboards, and quiz battles turn daily revision into something students look forward to.
                        </motion.p>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={td(0.3)}>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                                style={{ background: "#1A4731" }}
                            >
                                Try It Free <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right — Game cards */}
                    <div className="flex flex-col gap-4">
                        {/* XP Bar */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-5 shadow-md border"
                            style={{ borderColor: "#E5E7EB" }}
                            role="region"
                            aria-label="XP progress"
                        >
                            <p className="text-sm font-bold text-gray-900 mb-3">⭐ Your XP Progress</p>
                            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1.5">
                                <span>Level 7 — Panda Scholar</span>
                                <span>370 / 500 XP</span>
                            </div>
                            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#E5E7EB" }}>
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: "linear-gradient(90deg, #22C55E, #16A34A)" }}
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "74%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                                />
                            </div>
                        </motion.div>

                        {/* Streak */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(0.1)}
                            className="bg-white rounded-2xl p-5 shadow-md border"
                            style={{ borderColor: "#E5E7EB" }}
                            role="region"
                            aria-label="Streak counter"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-3xl" aria-hidden="true">🔥</span>
                                <div>
                                    <div className="text-2xl font-extrabold" style={{ color: "#F59E0B", fontFamily: "var(--font-fredoka)" }}>14</div>
                                    <div className="text-xs text-gray-500 font-medium">Day streak — keep it going!</div>
                                </div>
                                <div className="ml-auto text-right">
                                    <div className="text-[10px] text-gray-400">Best</div>
                                    <div className="text-base font-bold" style={{ color: "#F59E0B" }}>21 days</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Badges */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(0.15)}
                            className="bg-white rounded-2xl p-5 shadow-md border"
                            style={{ borderColor: "#E5E7EB" }}
                            role="region"
                            aria-label="Earned badges"
                        >
                            <p className="text-sm font-bold text-gray-900 mb-3">🏅 Recently Earned</p>
                            <div className="flex gap-2 flex-wrap">
                                {[["🧬", "Bio Master"], ["⚡", "Physics Pro"], ["🔥", "2-Week Streak"], ["⚔️", "Battle Winner"]].map(([icon, label]) => (
                                    <div
                                        key={label}
                                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold"
                                        style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731" }}
                                    >
                                        <span className="text-lg" aria-hidden="true">{icon}</span>
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Leaderboard */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(0.2)}
                            className="bg-white rounded-2xl p-5 shadow-md border"
                            style={{ borderColor: "#E5E7EB" }}
                            role="region"
                            aria-label="Class leaderboard"
                        >
                            <p className="text-sm font-bold text-gray-900 mb-3">🏆 Class 10-B Leaderboard</p>
                            <div className="flex flex-col gap-0">
                                {leaderboard.map((entry, i) => (
                                    <div
                                        key={entry.name}
                                        className="flex items-center gap-3 py-2.5 px-2 rounded-lg"
                                        style={entry.isYou ? { background: "#F0FDF4" } : {}}
                                    >
                                        <span className="text-sm w-6 font-bold" style={{ color: i === 0 ? "#D97706" : "#9CA3AF" }}>
                                            {entry.rank}
                                        </span>
                                        <span className={`flex-1 text-sm font-semibold ${entry.isYou ? "text-green-800" : "text-gray-900"}`}>
                                            {entry.name}
                                        </span>
                                        <span className="text-xs font-bold" style={{ color: "#1A4731" }}>{entry.xp}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}