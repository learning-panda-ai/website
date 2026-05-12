import Link from "next/link";
import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "For Schools", href: "/#for-schools" },
    { label: "Pricing", href: "/#pricing" },
    { label: "How It Works", href: "/#how-it-works" },
  ],
  Resources: [
    { label: "Frequently Asked Questions", href: "/#faq" },
    { label: "About Learning Panda", href: "/about" },
    { label: "AI Usage & Crawling", href: "/llms.txt" },
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

/** Reddit SVG — Lucide doesn't include it. */
function RedditIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

const socialLinks = [
  {
    icon: <Linkedin className="h-3.5 w-3.5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/learning-panda-ai/",
  },
  {
    icon: <Instagram className="h-3.5 w-3.5" />,
    label: "Instagram",
    href: "https://www.instagram.com/learning_panda_ai/",
  },
  {
    icon: <Twitter className="h-3.5 w-3.5" />,
    label: "Twitter / X",
    href: "https://x.com/LearningPandaAI",
  },
  {
    icon: <Youtube className="h-3.5 w-3.5" />,
    label: "YouTube",
    href: "https://www.youtube.com/@learning-panda-ai",
  },
  {
    icon: <RedditIcon className="h-3.5 w-3.5" />,
    label: "Reddit",
    href: "https://www.reddit.com/user/learning-panda-ai/",
  },
];

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
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Learning Panda AI on ${label}`}
                  className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors text-gray-400 hover:text-white"
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
                    {link.href.startsWith("mailto:") ? (
                      <a href={link.href} className="text-sm hover:text-green-400 transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm hover:text-green-400 transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm">© 2025 Learning Panda AI. Made with 🐼 for students across India.</p>
          <p className="text-xs text-gray-600">CBSE · ICSE · All State Boards across India</p>
        </div>
      </div>
    </footer>
  );
}
