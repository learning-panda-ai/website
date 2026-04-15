import { AnimatePresence, motion } from "framer-motion"
import { fadeUp, td } from "@/lib/animations/landingPage"

export default function Features({ activeTab, setActiveTab, studentFeatures, parentFeatures }: { activeTab: "students" | "parents", setActiveTab: (tab: "students" | "parents") => void, studentFeatures: any[], parentFeatures: any[] }) {
    return (
        <section id="features" className="py-24" style={{ background: "#F8FBF8" }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                        Everything you need
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
                        Built for students. Trusted by parents.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={td(0.2)}
                        className="text-gray-500 max-w-lg"
                    >
                        Every feature is designed around the Indian school curriculum — not a generic global product retrofitted for India.
                    </motion.p>
                </div>

                {/* Tabs */}
                <div
                    className="flex gap-1 p-1 rounded-full w-fit mb-12"
                    style={{ background: "#E5E7EB" }}
                    role="tablist"
                >
                    {(["students", "parents"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            role="tab"
                            aria-selected={activeTab === tab}
                            className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                            style={
                                activeTab === tab
                                    ? { background: "#fff", color: "#1A4731", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                                    : { color: "#6B7280" }
                            }
                        >
                            {tab === "students" ? "For Students" : "For Parents & Schools"}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        role="tabpanel"
                    >
                        {(activeTab === "students" ? studentFeatures : parentFeatures).map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.4 }}
                                whileHover={{ y: -3 }}
                                className="bg-white border rounded-2xl p-6 transition-shadow hover:shadow-md"
                                style={{ borderColor: "#E5E7EB" }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                                    style={{ background: "#F0FDF4" }}
                                    aria-hidden="true"
                                >
                                    {f.icon}
                                </div>
                                <h3 className="font-extrabold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>{f.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}