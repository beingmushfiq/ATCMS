"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function markLessonComplete(lessonId: string, courseId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    // Mark lesson complete
    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId: session.user.id, lessonId },
      },
      update: { completed: true },
      create: {
        userId: session.user.id,
        lessonId,
        completed: true,
      },
    });

    // Recalculate course progress
    // 1. Get all lessons in course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: { include: { lessons: { select: { id: true } } } },
      },
    });

    if (!course) return { error: "Course not found" };

    const allLessonIds = course.modules.flatMap((m: { lessons: { id: string }[] }) => m.lessons.map((l: { id: string }) => l.id));
    const totalLessons = allLessonIds.length;

    // 2. Count completed lessons for user in this course
    const completedCount = await prisma.lessonProgress.count({
      where: {
        userId: session.user.id,
        lessonId: { in: allLessonIds },
        completed: true,
      },
    });

    // 3. Update Enrollment
    const progress = totalLessons === 0 ? 0 : (completedCount / totalLessons) * 100;
    const status = progress === 100 ? "COMPLETED" : "ACTIVE";

    await prisma.enrollment.update({
      where: { userId_courseId: { userId: session.user.id, courseId } },
      data: { progress, status },
    });

    revalidatePath(`/student/courses/${course.slug}`);
    revalidatePath("/student");

    return { success: true };
  } catch (error) {
    console.error("Mark lesson complete error:", error);
    return { error: "Failed to mark complete" };
  }
}
