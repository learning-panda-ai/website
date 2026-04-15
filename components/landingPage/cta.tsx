import Link from "next/link"
import { fadeUp } from "@/lib/animations/landingPage"
import { motion } from "framer-motion"
import { Check, LayoutDashboard } from "lucide-react"

export default function CTA({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <section
            className="py-28 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #1A4731 0%, #1B5E3A 100%)" }}
            aria-label="Call to action"
        >
            {/* Decorative rings */}
            {[
                "absolute w-72 h-72 rounded-full border border-white/10 -top-16 -left-16",
                "absolute w-96 h-96 rounded-full border border-white/10 -bottom-24 -right-24",
            ].map((cls, i) => (
                <div key={i} className={cls} aria-hidden="true" />
            ))}

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <div className="text-5xl mb-5" aria-hidden="true">🐼</div>
                    <h2
                        className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                        Start learning the smarter way — for free
                    </h2>
                    <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
                        No credit card. No setup. Just pick your board, your class, and start asking.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={isLoggedIn ? "/dashboard" : "/login"}
                            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-base transition-all hover:shadow-xl hover:-translate-y-0.5"
                            style={{ background: "#fff", color: "#1A4731" }}
                        >
                            {isLoggedIn ? (
                                <><LayoutDashboard className="h-5 w-5" /> Go to Dashboard</>
                            ) : (
                                <>🚀 Start Free Today</>
                            )}
                        </Link>
                        <a
                            href="mailto:schools@learningpanda.ai"
                            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-2xl text-base border-2 transition-all"
                            style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
                        >
                            Request a School Demo
                        </a>
                    </div>
                    <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                        <Check className="inline h-3.5 w-3.5 mr-1" />Free forever plan &nbsp;·&nbsp;
                        <Check className="inline h-3.5 w-3.5 mr-1" />No credit card &nbsp;·&nbsp;
                        <Check className="inline h-3.5 w-3.5 mr-1" />Cancel anytime
                    </p>
                </motion.div>
            </div>
        </section>
    )
}