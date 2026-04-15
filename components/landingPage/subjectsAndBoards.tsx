import { motion } from "framer-motion"
import { fadeUp, td } from "@/lib/animations/landingPage"

export default function SubjectAndBoards({ subjects, boards }: { subjects: any[], boards: any[] }) {
    return (
        <section id="subjects" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                        Coverage
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
                        Every board. Every subject.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="text-gray-500 max-w-lg mx-auto"
                    >
                        We&apos;ve ingested the official textbooks for all major Indian school boards — and we&apos;re adding more every quarter.
                    </motion.p>
                </div>

                {/* Boards */}
                <div className="flex flex-wrap gap-3 justify-center mb-12" role="list">
                    {boards.map((b) => (
                        <span
                            key={b}
                            role="listitem"
                            className="px-5 py-2 rounded-full text-sm font-bold text-white"
                            style={{ background: "#1A4731" }}
                        >
                            {b}
                        </span>
                    ))}
                    <span
                        className="px-5 py-2 rounded-full text-sm font-semibold border"
                        style={{ borderColor: "#E5E7EB", color: "#9CA3AF" }}
                    >
                        + More coming Q3 2025
                    </span>
                </div>

                {/* Subjects grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4" role="list">
                    {subjects.map((s, i) => (
                        <motion.div
                            key={s.name}
                            role="listitem"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -3, scale: 1.03 }}
                            className="bg-white border rounded-2xl p-4 text-center transition-all hover:shadow-md cursor-default"
                            style={{ borderColor: "#E5E7EB" }}
                        >
                            <div className="text-2xl mb-2" aria-hidden="true">{s.icon}</div>
                            <div className="text-xs font-bold text-gray-700">{s.name}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mt-10 text-lg font-bold text-gray-400"
                >
                    <span style={{ color: "#1A4731" }}>Every subject.</span> Every chapter.{" "}
                    <span style={{ color: "#1A4731" }}>Every question.</span>
                </motion.p>
            </div>
        </section>
    )
}