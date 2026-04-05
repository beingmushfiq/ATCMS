"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function claimCertificate(enrollmentId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true }
    });

    if (!enrollment || enrollment.userId !== session.user.id) {
      return { error: "Enrollment not found" };
    }

    if (enrollment.progress < 100 || enrollment.status !== "COMPLETED") {
      return { error: "Course not fully completed yet" };
    }

    const existingCert = await prisma.certificate.findFirst({
      where: {
        userId: session.user.id,
        courseId: enrollment.courseId,
      }
    });

    if (existingCert) {
      return { error: "Certificate already claimed" };
    }

    // Generate random cert ID
    const certificateNo = `CERT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    await prisma.certificate.create({
      data: {
        userId: session.user.id,
        courseId: enrollment.courseId,
        certificateNo,
      }
    });

    revalidatePath("/student/certificates");
    return { success: true };
  } catch (error) {
    console.error("Claim certificate error:", error);
    return { error: "Failed to claim certificate" };
  }
}
