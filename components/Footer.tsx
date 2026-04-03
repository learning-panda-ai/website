const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "For Schools", href: "#for-schools" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Study Guides", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "mailto:hello@learningpanda.ai" },
    { label: "School Partnerships", href: "mailto:schools@learningpanda.ai" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Child Safety Policy", href: "/child-safety" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐼</span>
              <span
                className="text-lg font-extrabold text-white"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Learning Panda AI
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              AI-powered learning, grounded in your board&apos;s textbooks.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "𝕏", label: "Twitter/X" },
                { icon: "in", label: "LinkedIn" },
                { icon: "▶", label: "YouTube" },
                { icon: "◈", label: "Instagram" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Follow us on ${label}`}
                  className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs cursor-pointer hover:bg-green-600 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-green-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm">© 2025 Learning Panda AI. Made with 🐼 for students across India.</p>
          <p className="text-xs text-gray-600">CBSE · ICSE · Maharashtra · Karnataka · Tamil Nadu · UP</p>
        </div>
      </div>
    </footer>
  );
}
