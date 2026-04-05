"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { markLessonComplete } from "@/actions/lessons";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

export function CompleteLessonButton({ 
  lessonId, 
  courseId,
  courseSlug,
  nextLessonId,
  isCompleted
}: { 
  lessonId: string;
  courseId: string;
  courseSlug: string;
  nextLessonId: string | null;
  isCompleted: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleComplete() {
    // If already complete, just navigate
    if (isCompleted) {
      if (nextLessonId) {
        router.push(`/student/courses/${courseSlug}/learn/${nextLessonId}`);
      } else {
        router.push("/student");
      }
      return;
    }

    setLoading(true);
    await markLessonComplete(lessonId, courseId);
    
    // Always navigate regardless of silent error for UX
    if (nextLessonId) {
      router.push(`/student/courses/${courseSlug}/learn/${nextLessonId}`);
    } else {
      router.push("/student");
    }
  }

  return (
    <Button 
      size="lg" 
      onClick={handleComplete} 
      disabled={loading}
      variant={isCompleted ? "secondary" : "default"}
      className={isCompleted ? "" : "bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white"}
    >
      {loading ? (
        <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : isCompleted ? (
        <Check className="w-4 h-4 mr-2" />
      ) : (
        ""
      )}
      {isCompleted 
        ? (nextLessonId ? "Next Lesson" : "Course Completed") 
        : "Complete & Continue"
      }
      {!isCompleted && nextLessonId && <ArrowRight className="w-4 h-4 ml-2" />}
    </Button>
  );
}
