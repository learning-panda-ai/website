"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, ArrowRight, Pencil } from "lucide-react";
import { getCourseByName } from "@/lib/courses";
import { tabAnim } from "@/lib/animations/dashboard";

interface CoursesTabProps {
  enrolledCourses: string[];
  firstName?: string;
}

// Soft color pairs for course subject tags [bg, text]
const TAG_COLORS: [string, string][] = [
  ["bg-blue-50 border border-blue-100",   "text-blue-700"],
  ["bg-purple-50 border border-purple-100", "text-purple-700"],
  ["bg-orange-50 border border-orange-100", "text-orange-700"],
  ["bg-rose-50 border border-rose-100",     "text-rose-700"],
  ["bg-teal-50 border border-teal-100",     "text-teal-700"],
];

export default function CoursesTab({ enrolledCourses, firstName = "Explorer" }: CoursesTabProps) {
  const courses = enrolledCourses
    .map((name) => getCourseByName(name))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCourseByName>>[];

  return (
    <motion.div key="courses" {...tabAnim} className="space-y-8">
      {/* Welcome heading */}
      <div>
        <h1
          className="text-4xl font-bold text-[#1B5E20] mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Welcome Back, {firstName}!
        </h1>
        <p className="text-[#44483D] font-medium">
          {courses.length > 0
            ? `You have ${courses.length} ${courses.length === 1 ? "course" : "courses"} in progress. Keep up the momentum!`
            : "Add your first course and start your learning journey!"}
        </p>
      </div>

      {courses.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 bg-[#C8E6C9] rounded-full flex items-center justify-center text-4xl mb-5 border-2 border-[#43A047]/20">
            📚
          </div>
          <p
            className="font-bold text-[#1B1C17] text-lg mb-1"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            No courses yet
          </p>
          <p className="text-sm text-[#75796C] mb-6 max-w-xs">
            Add your first course to start your learning journey with Panda!
          </p>
          <Link
            href="/settings"
            className="flex items-center gap-2 bg-[#43A047] hover:bg-[#388E3C] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <Plus className="h-4 w-4" />
            Add a course
          </Link>
        </div>
      ) : (
        <>
          {/* Edit courses link */}
          <div className="flex justify-end -mt-4">
            <Link
              href="/settings"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#44483D] hover:text-[#43A047] transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit courses
            </Link>
          </div>

          {/* Bento card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {courses.map((course, idx) => {
              const [tagBg, tagText] = TAG_COLORS[idx % TAG_COLORS.length];
              const firstTopic = course.topics[0];
              const isFeature = courses.length >= 3 && idx === courses.length - 1;

              if (isFeature) {
                /* Wide featured card */
                return (
                  <div
                    key={course.slug}
                    className="group md:col-span-2 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(67,160,71,0.08)] hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Colored banner */}
                      <div className="md:w-1/3 h-40 md:h-auto rounded-xl overflow-hidden bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7] flex items-center justify-center text-6xl flex-shrink-0">
                        {course.emoji}
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`${tagBg} ${tagText} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
                            {course.category}
                          </span>
                        </div>
                        <h3
                          className="text-3xl font-bold text-[#1B5E20] mb-2"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {course.name}
                        </h3>
                        <p className="text-[#44483D] text-sm mb-5 font-medium line-clamp-2">
                          {course.description}
                        </p>
                        <div className="space-y-1.5 mb-5">
                          <div className="flex justify-between text-xs font-bold text-[#44483D]">
                            <span>Progress</span>
                            <span>{course.topics.length} topics</span>
                          </div>
                          <div className="h-2.5 w-full bg-[#E8E4D9] rounded-full overflow-hidden">
                            <div className="h-full bg-[#43A047] rounded-full w-0" />
                          </div>
                        </div>
                        <Link
                          href={`/courses/${course.slug}`}
                          className="w-fit flex items-center gap-2 px-6 py-3 bg-[#43A047] text-white font-bold rounded-xl hover:bg-[#388E3C] transition-all"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          Continue Learning
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              /* Small card */
              return (
                <div
                  key={course.slug}
                  className="group bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(67,160,71,0.08)] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-5">
                    <span className={`${tagBg} ${tagText} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
                      {course.category}
                    </span>
                    <span className="text-2xl">{course.emoji}</span>
                  </div>
                  <div className="mb-5">
                    <h3
                      className="text-xl font-bold text-[#1B5E20] mb-1"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {course.name}
                    </h3>
                    <p className="text-xs text-[#44483D] font-medium">
                      {firstTopic ? `Start: ${firstTopic.title}` : `${course.topics.length} topics`}
                    </p>
                  </div>
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between text-xs font-bold text-[#44483D]">
                      <span>Progress</span>
                      <span>{course.topics.length} topics</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#E8E4D9] rounded-full overflow-hidden">
                      <div className="h-full bg-[#43A047] rounded-full w-0 group-hover:w-1 transition-all duration-700" />
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#F5F2EA] text-[#43A047] font-bold rounded-xl group-hover:bg-[#43A047] group-hover:text-white transition-all text-sm"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Resume Module
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}
