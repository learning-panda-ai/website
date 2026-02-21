"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { getCourseByName } from "@/lib/courseData";
import { tabAnim } from "../types";

interface CoursesTabProps {
  enrolledCourses: string[];
}

export default function CoursesTab({ enrolledCourses }: CoursesTabProps) {
  const courses = enrolledCourses
    .map((name) => getCourseByName(name))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCourseByName>>[];

  return (
    <motion.div key="courses" {...tabAnim}>
      {/* Heading row */}
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-2xl font-extrabold text-gray-800"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          My courses
        </h2>
        <Link
          href="/settings"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit Courses
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-green-100">
            📚
          </div>
          <p className="font-extrabold text-gray-700 mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
            No courses yet
          </p>
          <p className="text-sm text-gray-400 mb-6 max-w-xs">
            Add your first course to start your learning journey with Panda!
          </p>
          <Link
            href="/settings"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            <Plus className="h-4 w-4" />
            Add a course
          </Link>
        </div>
      ) : (
        <div className="flex gap-10 items-start">
          <div className="flex-1 min-w-0 space-y-8">
            {courses.map((course) => {
              const topicsToShow = course.topics.slice(0, 5);
              return (
                <div key={course.slug}>
                  {/* Course name row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{course.emoji}</span>
                      <h3
                        className="font-extrabold text-gray-800 text-base"
                        style={{ fontFamily: "var(--font-fredoka)" }}
                      >
                        {course.name}
                      </h3>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
                    >
                      See all ({course.topics.length})
                    </Link>
                  </div>

                  {/* Topic path — vertical connected dots */}
                  <div className="relative">
                    {topicsToShow.map((topic, i) => {
                      const isFirst = i === 0;
                      const isLast  = i === topicsToShow.length - 1;
                      return (
                        <div key={topic.id} className="flex items-start gap-5">
                          <div className="flex flex-col items-center flex-shrink-0" style={{ width: 36 }}>
                            <div
                              className={`h-9 w-9 rounded-full border-2 flex items-center justify-center text-base z-10 flex-shrink-0 transition-all ${
                                isFirst
                                  ? "bg-green-500 border-green-600 text-white shadow-md"
                                  : "bg-white border-gray-200 text-gray-400"
                              }`}
                            >
                              {isFirst ? topic.emoji : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>
                            {!isLast && (
                              <div className="w-0.5 bg-gray-200 flex-1" style={{ minHeight: 28 }} />
                            )}
                          </div>

                          <div className={`flex items-center flex-1 min-w-0 ${!isLast ? "pb-7" : ""}`}>
                            <button
                              className={`text-sm font-semibold text-left transition-colors ${
                                isFirst
                                  ? "text-green-700 hover:text-green-800"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                            >
                              {topic.title}
                            </button>
                            {isFirst && (
                              <Link
                                href={`/courses/${course.slug}`}
                                className="ml-auto flex-shrink-0 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-sm"
                                style={{ fontFamily: "var(--font-fredoka)" }}
                              >
                                Start
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border-b border-gray-100" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
