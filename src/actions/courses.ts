"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  const session = await auth();
  if (!session?.user || !["ADMIN", "TRAINER"].includes((session.user as { role: string }).role)) {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as string || "BEGINNER";
  const price = parseFloat(formData.get("price") as string) || 0;
  const categoryId = formData.get("categoryId") as string || undefined;

  if (!title || !description) {
    return { error: "Title and description are required" };
  }

  let slug = slugify(title);
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const course = await prisma.course.create({
    data: {
      title,
      slug,
      description,
      level,
      price,
      categoryId: categoryId || null,
      trainerId: session.user.id,
    },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/trainer/courses");
  return { success: true, courseId: course.id };
}

export async function updateCourse(courseId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const level = formData.get("level") as string;
  const price = parseFloat(formData.get("price") as string) || 0;
  const published = formData.get("published") === "true";

  const course = await prisma.course.update({
    where: { id: courseId },
    data: {
      title,
      description,
      level,
      price,
      published,
    },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/trainer/courses");
  revalidatePath(`/courses/${course.slug}`);
  return { success: true };
}

export async function deleteCourse(courseId: string) {
  const session = await auth();
  if (!session?.user || (session.user as { role: string }).role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  await prisma.course.delete({ where: { id: courseId } });
  revalidatePath("/admin/courses");
  return { success: true };
}

export async function togglePublishCourse(courseId: string) {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) return { error: "Course not found" };

  await prisma.course.update({
    where: { id: courseId },
    data: { published: !course.published },
  });

  revalidatePath("/admin/courses");
  revalidatePath("/trainer/courses");
  return { success: true, published: !course.published };
}

export async function createModule(courseId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const type = formData.get("type") as string || "CORE";
  const description = formData.get("description") as string;

  const lastModule = await prisma.module.findFirst({
    where: { courseId },
    orderBy: { order: "desc" },
  });

  await prisma.module.create({
    data: {
      title,
      description,
      type,
      order: (lastModule?.order || 0) + 1,
      courseId,
    },
  });

  revalidatePath(`/admin/courses`);
  revalidatePath(`/trainer/courses`);
  return { success: true };
}

export async function createLesson(moduleId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const duration = parseInt(formData.get("duration") as string) || null;

  const lastLesson = await prisma.lesson.findFirst({
    where: { moduleId },
    orderBy: { order: "desc" },
  });

  await prisma.lesson.create({
    data: {
      title,
      content,
      videoUrl: videoUrl || null,
      duration,
      order: (lastLesson?.order || 0) + 1,
      moduleId,
    },
  });

  revalidatePath(`/admin/courses`);
  revalidatePath(`/trainer/courses`);
  return { success: true };
}

export async function enrollInCourse(courseId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const existing = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
  });

  if (existing) return { error: "Already enrolled" };

  await prisma.enrollment.create({
    data: {
      userId: session.user.id,
      courseId,
    },
  });

  revalidatePath("/student");
  revalidatePath("/student/courses");
  return { success: true };
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;
  const color = formData.get("color") as string;

  if (!name) return { error: "Name is required" };

  await prisma.category.create({
    data: { name, icon, color },
  });

  revalidatePath("/admin/courses");
  return { success: true };
}
