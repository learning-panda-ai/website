import { motion } from "framer-motion"
import { td, fadeUp } from "@/lib/animations/landingPage"

export default function HowItWorks({ steps }: { steps: { num: string, icon: string, title: string, desc: string }[] }) {
    return (
        <section id="how-it-works" className="py-24" style={{ background: "#FAFAF7" }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                        Simple by design
                    </motion.p>
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.1)}
                        className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                        From signup to learning in 60 seconds
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="text-gray-500 mt-3 max-w-xl mx-auto"
                    >
                        No setup. No textbook scanning. We&apos;ve already done the work — just pick your board and start asking.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                    {/* Connector line (desktop only) */}
                    <div
                        className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px opacity-20"
                        style={{ background: "linear-gradient(90deg, #22C55E, #86EFAC, #22C55E)" }}
                        aria-hidden="true"
                    />
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(i * 0.1)}
                            whileHover={{ y: -4 }}
                            className="bg-white border rounded-2xl p-7 text-center transition-shadow hover:shadow-md"
                            style={{ borderColor: "#E5E7EB" }}
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-base mx-auto mb-5 border-2"
                                style={{ background: "#F0FDF4", borderColor: "#86EFAC", color: "#1A4731", fontFamily: "var(--font-fredoka)" }}
                            >
                                {step.num}
                            </div>
                            <div className="text-2xl mb-3" aria-hidden="true">{step.icon}</div>
                            <h3 className="font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}