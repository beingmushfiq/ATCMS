import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, Lock, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default async function CourseViewerLayout(props: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId: course.id } },
  });

  if (!enrollment) {
    // Optionally redirect back to detail page if they try to access viewer without enrolling
    redirect(`/courses/${course.slug}`);
  }

  // Get completed lesson IDs
  const progresses = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id },
    include: { lesson: true },
  });
  
  const completedLessonIds = new Set(
    progresses.filter((p: { completed: boolean, lessonId: string }) => p.completed).map((p: { lessonId: string }) => p.lessonId)
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar Curriculum */}
      <div className="w-80 border-r border-[var(--border-secondary)] bg-[var(--bg-tertiary)]/30 flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-[var(--border-secondary)]">
          <Link href="/student" className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-2 line-clamp-2">
            {course.title}
          </h2>
          <div className="flex items-center gap-3">
            <Progress value={enrollment.progress} className="flex-1 h-2" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">{Math.round(enrollment.progress)}%</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {course.modules.map((module: { id: string, order: number, title: string, lessons: { id: string, title: string, duration: number | null }[] }) => {
            // Determine if previous module is completed to lock/unlock sequentially.
            // For now, let's keep it simple: everything is unlocked for the demo, 
            // but we'll show UI indicators if we want sequential locking later.
            const isLocked = false; 

            return (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Mod {module.order}: {module.title}
                  </h3>
                  {isLocked && <Lock className="w-3.5 h-3.5 text-[var(--text-muted)]" />}
                </div>

                <div className="space-y-1">
                  {module.lessons.map((lesson: { id: string, title: string, duration: number | null }) => {
                    const isCompleted = completedLessonIds.has(lesson.id);
                    
                    return (
                      <Link
                        href={`/student/courses/${course.slug}/learn/${lesson.id}`}
                        key={lesson.id}
                        className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                          isLocked 
                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                            : "hover:bg-[var(--bg-tertiary)] group"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Circle className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--brand-400)] transition-colors" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium leading-snug line-clamp-2 ${isCompleted ? "text-[var(--text-secondary)]" : "text-[var(--text-primary)]"}`}>
                            {lesson.title}
                          </p>
                          {(lesson.duration || 0) > 0 && (
                            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1">
                              <PlayCircle className="w-3 h-3" /> {lesson.duration}m
                            </span>
                          )}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
        {props.children}
      </div>
    </div>
  );
}
