import Link from "next/link";
import type { Session } from "next-auth";
import { Star } from "lucide-react";

interface DashboardHeaderProps {
  user: Session["user"];
  enrolledCourses: string[];
}

export default function DashboardHeader({ user, enrolledCourses }: DashboardHeaderProps) {
  const firstName = user?.name?.split(" ")[0] ?? "Learner";

  return (
    <>
      {/* Streak banner */}
      <div
        className="bg-gradient-to-r from-green-600 to-emerald-500 text-white"
        style={{ fontFamily: "var(--font-fredoka)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold truncate">
            🐼 Start leveling up and building your weekly streak!
          </p>
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="flex items-center gap-1.5 text-sm font-bold">
              🔥 <span>0</span>
              <span className="font-normal text-green-100 hidden sm:inline">week streak</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="font-bold">Level 1</span>
              <div className="w-20 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-white rounded-full" />
              </div>
              <span className="text-green-100 text-xs">0 / 1 skill</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-green-100 border-2 border-green-200 flex items-center justify-center text-2xl font-bold text-green-700 flex-shrink-0">
              {firstName[0]}
            </div>
            <div>
              <p
                className="font-extrabold text-gray-800 text-base leading-tight"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {user?.name}
              </p>
              <p className="text-sm text-gray-400 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden sm:flex items-center gap-2">
              {enrolledCourses.length > 0 && (
                <span className="text-xs font-bold bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                  📚 {enrolledCourses.length} {enrolledCourses.length === 1 ? "course" : "courses"}
                </span>
              )}
              <span className="text-xs font-bold bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1 rounded-full">
                🔥 7 streak
              </span>
              <span className="text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full">
                <Star className="h-3 w-3 inline mr-0.5" />88% avg
              </span>
            </div>
            <Link
              href="/settings"
              className="text-sm font-bold text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-700 bg-white px-4 py-2 rounded-xl transition-all"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
