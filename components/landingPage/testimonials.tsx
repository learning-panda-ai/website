import { Star } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, td } from "@/lib/animations/landingPage"


export default function Testimonials({ testimonials, stats }: { testimonials: any[], stats: any[] }) {
    return (
        <section id="stats" className="py-24" style={{ background: "#F0FDF4" }} aria-label="Platform stats and testimonials">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(i * 0.1)}
                            className="text-center"
                        >
                            <div
                                className="text-4xl sm:text-5xl font-extrabold mb-2"
                                style={{ color: "#1A4731", fontFamily: "var(--font-fredoka)" }}
                            >
                                {s.number}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonials */}
                <div className="text-center mb-12">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-3xl font-extrabold text-gray-900 tracking-tight"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                        What students, parents & teachers say
                    </motion.h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={td(i * 0.1)}
                            className="bg-white rounded-2xl p-6 border shadow-sm"
                            style={{ borderColor: "#E5E7EB" }}
                            role="article"
                        >
                            <div className="flex items-center gap-0.5 mb-4" aria-label="5 out of 5 stars">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed italic mb-5">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${t.color}`} aria-hidden="true">
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                                    <div className="text-xs text-gray-400">{t.meta}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}