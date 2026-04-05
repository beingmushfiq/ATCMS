"use server";

import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "STUDENT";

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return { success: true };
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Get the user to determine redirect
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    const redirectPath = {
      ADMIN: "/admin",
      TRAINER: "/trainer",
      STUDENT: "/student",
      MENTOR: "/mentor",
    }[user?.role || "STUDENT"] || "/student";

    return { success: true, redirect: redirectPath };
  } catch {
    return { error: "Invalid email or password" };
  }
}

export async function logoutUser() {
  await signOut({ redirect: false });
  redirect("/login");
}
