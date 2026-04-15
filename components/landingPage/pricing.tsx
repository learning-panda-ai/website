import { motion } from "framer-motion"
import Link from "next/link"
import { fadeUp, td } from "@/lib/animations/landingPage"


export default function Pricing({ isAnnual, setIsAnnual }: { isAnnual: boolean, setIsAnnual: (isAnnual: boolean) => void }) {
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                        Transparent pricing
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.1)}
                        className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                        Plans for every student and school
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="text-gray-500 mb-10"
                    >
                        Start free — no credit card required. Upgrade when you&apos;re ready for the full experience.
                    </motion.p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-3" role="group" aria-label="Billing period">
                        <span className={`text-sm font-semibold ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            role="switch"
                            aria-checked={isAnnual}
                            className="w-11 h-6 rounded-full relative transition-colors"
                            style={{ background: "#22C55E" }}
                            aria-label="Switch to annual billing"
                        >
                            <span
                                className="absolute w-4.5 h-4.5 bg-white rounded-full top-0.5 transition-transform shadow-sm"
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    top: "3px",
                                    left: isAnnual ? "calc(100% - 21px)" : "3px",
                                }}
                            />
                        </button>
                        <span className={`text-sm font-semibold ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
                        <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: "#F59E0B" }}>
                            Save 30%
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {/* Free */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="rounded-3xl p-8 border-2 transition-shadow hover:shadow-md"
                        style={{ borderColor: "#E5E7EB", background: "#fff" }}
                    >
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Free</div>
                        <div className="flex items-start mb-2">
                            <span className="text-lg font-bold mt-2 mr-1">₹</span>
                            <span className="text-5xl font-extrabold text-gray-900" style={{ fontFamily: "var(--font-fredoka)" }}>0</span>
                            <span className="text-gray-400 text-sm self-end mb-2 ml-1">/ month</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">Get started at no cost. Perfect for trying Panda before committing.</p>
                        <Link
                            href="/login"
                            className="w-full flex items-center justify-center font-bold py-3.5 rounded-2xl text-sm border-2 mb-6 transition-all hover:border-green-400 hover:text-green-700"
                            style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
                        >
                            Get Started Free
                        </Link>
                        <ul className="space-y-3">
                            {[
                                ["✓", "20 questions per day", true],
                                ["✓", "Text chat only", true],
                                ["✓", "Basic chapter quizzes", true],
                                ["✓", "CBSE & ICSE content", true],
                                ["✓", "Daily streak tracking", true],
                                ["–", "Voice & video chat", false],
                                ["–", "Smart study planner", false],
                                ["–", "Parent reports", false],
                            ].map(([check, label, enabled]) => (
                                <li key={label as string} className={`flex items-start gap-2.5 text-sm ${enabled ? "text-gray-600" : "text-gray-300"}`}>
                                    <span
                                        className="w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            background: enabled ? "#F0FDF4" : "#F9FAFB",
                                            color: enabled ? "#1A4731" : "#D1D5DB",
                                        }}
                                    >
                                        {check as string}
                                    </span>
                                    {label as string}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Pro */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.1)}
                        className="rounded-3xl p-8 border-2 relative transition-shadow hover:shadow-md"
                        style={{ borderColor: "#22C55E", boxShadow: "0 0 0 4px rgba(34,197,94,0.1)", background: "#fff" }}
                    >
                        <div
                            className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white whitespace-nowrap"
                            style={{ background: "#22C55E" }}
                        >
                            ⭐ Most Popular
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Pro</div>
                        <div className="flex items-start mb-2">
                            <span className="text-lg font-bold mt-2 mr-1">₹</span>
                            <motion.span
                                key={isAnnual ? "annual" : "monthly"}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl font-extrabold text-gray-900"
                                style={{ fontFamily: "var(--font-fredoka)" }}
                            >
                                {isAnnual ? "2,499" : "299"}
                            </motion.span>
                            <span className="text-gray-400 text-sm self-end mb-2 ml-1">
                                {isAnnual ? "/ year" : "/ month"}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            {isAnnual ? "Save ₹1,089 vs monthly billing. Best value for serious students." : "Everything a serious student needs. Cancel anytime."}
                        </p>
                        <Link
                            href="/login"
                            className="w-full flex items-center justify-center font-bold py-3.5 rounded-2xl text-sm text-white mb-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                            style={{ background: "#22C55E" }}
                        >
                            Start Pro Free (7 days)
                        </Link>
                        <ul className="space-y-3">
                            {[
                                "Unlimited questions per day",
                                "Text, voice & video chat",
                                "Adaptive quizzes & spaced repetition",
                                "AI oral exams",
                                "Smart study planner",
                                "Weekly parent reports",
                                "Leaderboards & quiz battles",
                                "All 6 boards + all subjects",
                            ].map((label) => (
                                <li key={label} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <span
                                        className="rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                                        style={{ width: "18px", height: "18px", minWidth: "18px", background: "#F0FDF4", color: "#1A4731" }}
                                    >
                                        ✓
                                    </span>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* School */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="rounded-3xl p-8 border-2 transition-shadow hover:shadow-md"
                        style={{ borderColor: "#E5E7EB", background: "#fff" }}
                    >
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">School</div>
                        <div className="text-4xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>Custom</div>
                        <p className="text-sm text-gray-500 mb-6">Bulk licenses for schools. Includes teacher dashboard, admin controls, and priority support.</p>
                        <a
                            href="mailto:schools@learningpanda.ai"
                            className="w-full flex items-center justify-center font-bold py-3.5 rounded-2xl text-sm text-white mb-6 transition-all hover:shadow-md hover:-translate-y-0.5"
                            style={{ background: "#1A4731" }}
                        >
                            Request a Demo
                        </a>
                        <ul className="space-y-3">
                            {[
                                "Everything in Pro",
                                "Teacher dashboard",
                                "At-risk student alerts",
                                "Chapter assignment by teacher",
                                "Bulk student management",
                                "Priority support (SLA)",
                                "Custom curriculum upload",
                                "Onboarding & training included",
                            ].map((label) => (
                                <li key={label} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <span
                                        className="rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                                        style={{ width: "18px", height: "18px", minWidth: "18px", background: "#F0FDF4", color: "#1A4731" }}
                                    >
                                        ✓
                                    </span>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}