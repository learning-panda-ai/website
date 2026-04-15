import { COURSE_CATALOG } from "@/lib/courseData";
import type { CourseInfo } from "@/types/courses";

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getCourseBySlug(slug: string): CourseInfo | undefined {
  return COURSE_CATALOG.find((c) => c.slug === slug);
}

export function getCourseByName(name: string): CourseInfo | undefined {
  return COURSE_CATALOG.find((c) => c.name === name);
}
