import { motion } from "framer-motion"
import { fadeUp, td } from "@/lib/animations/landingPage"

export default function InterationModes({ modes }: { modes: { icon: React.ReactNode, title: string, desc: string, tag: string, tagColor: string }[] }) {
    return (
        <section
            id="interaction"
            className="py-24"
            style={{ background: "#1A4731" }}
            aria-label="Ways to interact with Panda"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-400 mb-3">
                        3 ways to learn
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.1)}
                        className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                        Ask in the way that feels natural
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="max-w-xl mx-auto"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                        Whether your child prefers typing, speaking, or a face-to-face session — Panda is ready in all three modes.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {modes.map((mode, i) => (
                        <motion.div
                            key={mode.title}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(i * 0.1)}
                            whileHover={{ y: -5 }}
                            className="rounded-3xl p-8 text-center transition-all"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.12)",
                            }}
                            role="article"
                        >
                            <div className="text-4xl mb-5" aria-hidden="true">{mode.icon}</div>
                            <h3 className="text-xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                                {mode.title}
                            </h3>
                            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                                {mode.desc}
                            </p>
                            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${mode.tagColor}`}>
                                {mode.tag}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}