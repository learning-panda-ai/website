import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, td } from "@/lib/animations/landingPage"

export default function ForSchools({ schoolProps }: { schoolProps: { icon: React.ReactNode, title: string, desc: string }[] }) {
    return (
        <section id="for-schools" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left */}
                    <div>
                        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                            B2B2C
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
                            Bring Learning Panda AI to your school
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(0.2)}
                            className="text-gray-500 leading-relaxed mb-10"
                        >
                            Give every student a personal AI tutor — without replacing teachers. Panda handles
                            repetitive doubt-solving so teachers can focus on higher-order instruction.
                        </motion.p>

                        <div className="flex flex-col gap-8">
                            {schoolProps.map((prop, i) => (
                                <motion.div
                                    key={prop.title}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={td(i * 0.1)}
                                    className="flex gap-4"
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                                        style={{ background: "#F0FDF4" }}
                                        aria-hidden="true"
                                    >
                                        {prop.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-gray-900 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>{prop.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{prop.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={td(0.4)} className="mt-10">
                            <a
                                href="mailto:schools@learningpanda.ai"
                                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded-2xl text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                                style={{ background: "#1A4731" }}
                            >
                                Request a School Demo <ArrowRight className="h-4 w-4" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — Teacher Dashboard Mockup */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="bg-white rounded-3xl p-7 shadow-xl border"
                        style={{ borderColor: "#E5E7EB" }}
                        role="region"
                        aria-label="Teacher dashboard preview"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h4 className="font-bold text-gray-900">🖥️ Teacher Dashboard</h4>
                            <span
                                className="text-xs font-bold px-2.5 py-1 rounded-full"
                                style={{ background: "#F0FDF4", color: "#1A4731" }}
                            >
                                Class 9-A · Science
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                            {[["34", "Students Active"], ["78%", "Ch. 9 Mastery"], ["3", "At-Risk Alerts"]].map(([val, label]) => (
                                <div key={label} className="rounded-xl p-3 text-center" style={{ background: "#F9FAFB" }}>
                                    <div className="text-xl font-extrabold" style={{ color: "#1A4731", fontFamily: "var(--font-fredoka)" }}>{val}</div>
                                    <div className="text-[10px] text-gray-400 font-medium">{label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Student list */}
                        <div className="flex flex-col gap-2">
                            {[
                                { initial: "R", name: "Rohan Gupta", sub: "Ch. 9 · 45 min today", progress: "92%", color: "bg-green-500", progressColor: "#22C55E", alert: false },
                                { initial: "A", name: "Ananya Iyer", sub: "Ch. 8 · 28 min today", progress: "85%", color: "bg-blue-500", progressColor: "#22C55E", alert: false },
                                { initial: "P", name: "Priya Sharma", sub: "Ch. 7 · 12 min today", progress: "61%", color: "bg-amber-400", progressColor: "#F59E0B", alert: false },
                                { initial: "V", name: "Vikram Nair", sub: "Ch. 6 · 0 min today", progress: "38%", color: "bg-red-400", progressColor: "#EF4444", alert: true },
                            ].map((s) => (
                                <div
                                    key={s.name}
                                    className="flex items-center gap-3 p-3 rounded-xl"
                                    style={{ background: "#F9FAFB" }}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${s.color}`} aria-hidden="true">
                                        {s.initial}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-gray-900 truncate">{s.name}</div>
                                        <div className="text-[10px] text-gray-400">{s.sub}</div>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <span className="text-xs font-bold" style={{ color: s.progressColor }}>{s.progress}</span>
                                        {s.alert && (
                                            <span
                                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                                                style={{ background: "#FEF2F2", color: "#EF4444" }}
                                            >
                                                ⚠ At Risk
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}