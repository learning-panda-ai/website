import { motion } from "framer-motion";
import { td, fadeUp } from "@/lib/animations/landingPage";

export default function ProblemAndSolution({ problems }: { problems: { before: string; after: string }[] }) {
    return (
        <section aria-label="Problem and solution" style={{ background: "#1A4731" }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                    {problems.map((p, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(i * 0.1)}
                            className="px-8 py-12"
                        >
                            <div className="flex items-start gap-2.5 text-sm text-white/50 mb-6 leading-relaxed">
                                <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-400 shrink-0 mt-0.5">✕</span>
                                {p.before}
                            </div>
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center mb-4"
                                style={{ background: "#22C55E" }}
                                aria-hidden="true"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                                </svg>
                            </div>
                            <p className="text-white font-semibold leading-relaxed">{p.after}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}