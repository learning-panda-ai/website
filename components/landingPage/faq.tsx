import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { fadeUp, td } from "@/lib/animations/landingPage";

export default function FAQ({ faqItems, openFaq, setOpenFaq }: { faqItems: { q: string; a: string }[]; openFaq: number | null; setOpenFaq: (index: number | null) => void }) {
    return (
        <section id="faq" className="py-24" style={{ background: "#F8FBF8" }}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3">
                        Questions answered
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
                        Frequently asked questions
                    </motion.h2>
                </div>

                <div className="divide-y" style={{ borderColor: "#E5E7EB" }} role="list">
                    {faqItems.map((item, i) => (
                        <div key={i} role="listitem">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 py-5 text-left font-semibold text-gray-900 hover:text-green-800 transition-colors"
                                aria-expanded={openFaq === i}
                            >
                                <span>{item.q}</span>
                                <span
                                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors"
                                    style={openFaq === i ? { background: "#22C55E" } : { background: "#E5E7EB" }}
                                >
                                    {openFaq === i ? (
                                        <Minus className="h-3 w-3 text-white" />
                                    ) : (
                                        <Plus className="h-3 w-3 text-gray-500" />
                                    )}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-gray-500 leading-relaxed pb-5">{item.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}