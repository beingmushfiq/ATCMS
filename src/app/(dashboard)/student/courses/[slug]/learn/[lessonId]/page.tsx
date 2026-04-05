import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { CompleteLessonButton } from "./complete-button";
import { FileText, PlayCircle } from "lucide-react";

export default async function LessonViewerPage(props: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const params = await props.params;
  const session = await auth();
  
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

  // Find the current lesson and context
  let currentLesson = null;
  let nextLessonId = null;
  let contextModule = null;

  const allLessons = course.modules.flatMap((m: { order: number, title: string, lessons: { id: string, title: string, duration: number | null, content: string | null }[] }) => 
    m.lessons.map((l: { id: string, title: string, duration: number | null, content: string | null }) => ({ ...l, module: m }))
  );

  for (let i = 0; i < allLessons.length; i++) {
    if (allLessons[i].id === params.lessonId) {
      currentLesson = allLessons[i];
      contextModule = allLessons[i].module;
      if (i + 1 < allLessons.length) {
        nextLessonId = allLessons[i + 1].id;
      }
      break;
    }
  }

  if (!currentLesson || !contextModule) notFound();

  // Check completion
  let isCompleted = false;
  if (session?.user?.id) {
    const progress = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: session.user.id, lessonId: currentLesson.id } }
    });
    isCompleted = !!progress?.completed;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 lg:px-12 w-full animate-fade-in">
      <div className="mb-8">
        <p className="text-xs font-semibold text-[var(--brand-400)] mb-2 tracking-wider">
          MODULE {contextModule.order}: {contextModule.title}
        </p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          {currentLesson.title}
        </h1>
      </div>

      {/* Video Player Placeholder */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative mb-12 border border-[var(--border-secondary)] flex items-center justify-center group cursor-pointer hover:border-[var(--brand-500)]/50 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <PlayCircle className="w-16 h-16 text-white/50 group-hover:text-white transition-colors group-hover:scale-110 z-10" />
        <div className="absolute bottom-6 left-6 z-10">
          <p className="text-white font-medium">{currentLesson.title}</p>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-brand max-w-none mb-12">
        {/* We use dangerouslySetInnerHTML for HTML content stored in DB (from our seed) */}
        <div dangerouslySetInnerHTML={{ __html: currentLesson.content || "<p>No written content provided.</p>" }} />
      </div>
      
      {/* Attachments / Downloads */}
      {/* We can add a downloads section if resources existed on lesson */}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-8 border-t border-[var(--border-secondary)]">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <FileText className="w-4 h-4" />
          Lesson complete? Mark it down to save your progress.
        </div>
        <CompleteLessonButton 
          lessonId={currentLesson.id}
          courseId={course.id}
          courseSlug={course.slug}
          nextLessonId={nextLessonId}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}
