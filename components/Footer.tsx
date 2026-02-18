const footerLinks = {
  Product: ["Features", "Subjects", "Pricing", "Roadmap"],
  Resources: ["Blog", "Study Guides", "Practice Tests", "Help Center"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐼</span>
              <span
                className="text-lg font-extrabold text-white"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Learning Panda
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              AI-powered learning for students of all ages and subjects.
            </p>
            <div className="flex gap-3">
              {["𝕏", "in", "▶"].map((icon, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs cursor-pointer hover:bg-green-600 transition-colors"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-green-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Learning Panda. All rights reserved.
          </p>
          <p className="text-sm">Made with 💚 for students everywhere</p>
        </div>
      </div>
    </footer>
  );
}
