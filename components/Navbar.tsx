"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, LayoutDashboard, Bell, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/app/providers";
import type { AuthUser } from "@/types/auth";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Subjects", href: "#subjects" },
  { label: "Testimonials", href: "#testimonials" },
];

interface NavbarProps {
  user?: AuthUser | null;
}

export default function Navbar({ user: propsUser }: NavbarProps = {}) {
  const authContext = useAuth();
  const user = propsUser ?? authContext.user;
  const logout = authContext.logout;
  const pathname = usePathname();
  const isLoggedIn = !!user;
  const isDashboard = pathname?.startsWith("/dashboard");
  const firstName = user?.name?.split(" ")[0] ?? "User";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🐼</span>
          <span
            className="text-xl font-extrabold text-green-700"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Learning Panda
          </span>
        </Link>

        {isDashboard ? (
          /* ── Dashboard controls ── */
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Bell className="h-4 w-4 text-gray-500" />
            </button>
            <Link
              href="/settings"
              className="h-9 w-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Settings className="h-4 w-4 text-gray-500" />
            </Link>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
              <div className="h-8 w-8 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-sm font-bold text-green-700">
                {firstName[0]}
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {user?.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        ) : (
          /* ── Landing controls ── */
          <>
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all hover:shadow-md"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-bold text-green-700 hover:text-green-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all hover:shadow-md"
                  >
                    Start Learning Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
