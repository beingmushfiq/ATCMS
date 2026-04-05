"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function enrollInCourse(courseId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "You must be logged in to enroll" };
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (existing) {
      return { error: "You are already enrolled in this course" };
    }

    // Create enrollment
    await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
        status: "ACTIVE",
        progress: 0,
      },
    });

    // Create an activity log
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: "ENROLLMENT",
        details: JSON.stringify({ courseId }),
      },
    });

    revalidatePath("/student");
    revalidatePath("/courses");
    
    return { success: true };
  } catch (error) {
    console.error("Enrollment error:", error);
    return { error: "Failed to enroll. Please try again." };
  }
}
