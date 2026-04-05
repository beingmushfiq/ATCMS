"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createBusinessPlan(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) return { error: "Title and description are required" };

    const existing = await prisma.businessPlan.findFirst({
      where: { userId: session.user.id },
    });

    if (existing) return { error: "Business plan already exists" };

    await prisma.businessPlan.create({
      data: {
        title,
        description,
        stage: "IDEA",
        userId: session.user.id,
      },
    });

    revalidatePath("/student/business");
    return { success: true };
  } catch (error) {
    console.error("Create business plan error:", error);
    return { error: "Failed to create business plan" };
  }
}

export async function addBusinessEntry(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const businessPlanId = formData.get("businessPlanId") as string;
    const title = formData.get("title") as string;
    const notes = formData.get("notes") as string;
    const revenueStr = formData.get("revenue") as string;
    const revenue = revenueStr ? parseFloat(revenueStr) : 0;
    const stage = formData.get("stage") as string;

    if (!title || !businessPlanId) return { error: "Title is required" };

    // Verify ownership
    const plan = await prisma.businessPlan.findUnique({
      where: { id: businessPlanId },
    });

    if (!plan || plan.userId !== session.user.id) {
      return { error: "Unauthorized or plan not found" };
    }

    // Add entry
    await prisma.businessEntry.create({
      data: {
        title,
        notes,
        revenue,
        businessPlanId,
      },
    });

    // Update global plan stats
    await prisma.businessPlan.update({
      where: { id: businessPlanId },
      data: {
        revenue: plan.revenue + revenue,
        stage: stage || plan.stage,
      },
    });

    revalidatePath("/student/business");
    return { success: true };
  } catch (error) {
    console.error("Add business entry error:", error);
    return { error: "Failed to add entry" };
  }
}
