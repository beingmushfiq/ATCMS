"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { enrollInCourse } from "@/actions/enrollments";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export function EnrollButton({ courseId }: { courseId: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleEnroll() {
    setLoading(true);
    setError("");

    const result = await enrollInCourse(courseId);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      // Wait a moment then redirect to dashboard
      setTimeout(() => {
        router.push("/student");
      }, 1500);
    }
  }

  if (success) {
    return (
      <Button size="xl" className="w-full bg-emerald-500 hover:bg-emerald-600 border-none">
        <Check className="w-5 h-5 mr-2" />
        Enrolled Successfully!
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button 
        size="xl" 
        className="w-full" 
        onClick={handleEnroll} 
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Enroll Now"
        )}
      </Button>
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
    </div>
  );
}
