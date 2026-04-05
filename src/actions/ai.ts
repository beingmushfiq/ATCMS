"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "placeholder" });

export async function generateBusinessAdvice(businessPlanId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized", steps: null };

    if (!process.env.GEMINI_API_KEY) {
       // Return a mock output if they haven't configured a key yet to not break the UI.
       return {
         steps: [
           "Simulated AI Step 1: Secure a domain name matching your idea.",
           "Simulated AI Step 2: Set up a landing page to capture emails.",
           "Simulated AI Step 3: Run your first targeted ad or post organically."
         ]
       };
    }

    const plan = await prisma.businessPlan.findUnique({
      where: { id: businessPlanId },
      include: {
        entries: {
          orderBy: { createdAt: "desc" },
          take: 5
        }
      }
    });

    if (!plan || plan.userId !== session.user.id) {
      return { error: "Business plan not found or unauthorized", steps: null };
    }

    const prompt = `
    You are an expert, direct, extremely actionable startup business coach for an AI-Powered Training center.
    The student is building the following business:
    Title: ${plan.title}
    Description: ${plan.description}
    Current Stage: ${plan.stage}
    Total Revenue: $${plan.revenue}

    Recent updates:
    ${plan.entries.map((e: { title: string, notes: string | null, revenue: number }, i: number) => `${i + 1}. ${e.title}: ${e.notes || 'No extra notes'} (Revenue: $${e.revenue})`).join("\n")}

    Generate exactly 3 concise, highly actionable "Next Steps" for this student.
    Return ONLY a raw JSON array of 3 strings. E.g. ["Do X by doing Y", "Call Z and say W", "Build feature Q"]. No markdown fences, no explanation.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    try {
      const text = response.text || "[]";
      // Sanitize potential markdown wrap
      const cleanString = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const steps = JSON.parse(cleanString);
      return { steps, error: null };
    } catch (parseError) {
      console.error("AI Parse Error:", parseError, response.text);
      return { steps: ["Keep building your product.", "Focus on marketing.", "Listen to user feedback."], error: null };
    }

  } catch (error) {
    console.error("AI Generation Error:", error);
    return { error: "Failed to connect to AI engine.", steps: null };
  }
}
