import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EnrollButton } from "./enroll-button";
import { CheckCircle2, Clock, PlayCircle, Users, BookOpen, Layers } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Course Details | ATCMS",
};

export default async function CourseDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      trainer: { select: { name: true, bio: true } },
      category: { select: { name: true } },
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" }, select: { id: true, title: true, duration: true } } },
      },
      _count: { select: { enrollments: true } },
    },
  });

  if (!course) notFound();

  const session = await auth();
  const userId = session?.user?.id;

  let isEnrolled = false;
  if (userId) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    isEnrolled = !!enrollment;
  }

  const totalLessons = course.modules.reduce((acc: number, mod: { lessons: { id: string }[] }) => acc + mod.lessons.length, 0);
  const totalDuration = course.modules.reduce(
    (acc: number, mod: { lessons: { duration: number | null }[] }) => acc + mod.lessons.reduce((lAcc: number, l: { duration: number | null }) => lAcc + (l.duration || 0), 0),
    0
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mesh-bg absolute inset-0 h-[600px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-12 border-b border-[var(--border-primary)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              {course.category && <Badge variant="secondary">{course.category.name}</Badge>}
              <Badge variant={course.level === "BEGINNER" ? "success" : "warning"}>{course.level}</Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] leading-tight">
              {course.title}
            </h1>
            
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] pt-4">
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {course._count.enrollments} Students</span>
              <span className="flex items-center gap-2"><Layers className="w-4 h-4" /> {course.modules.length} Modules</span>
              <span className="flex items-center gap-2"><PlayCircle className="w-4 h-4" /> {totalLessons} Lessons</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {Math.round(totalDuration / 60)} Hours</span>
            </div>
          </div>

          {/* Floating Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 overflow-hidden border-[var(--border-secondary)] shadow-2xl">
              <div className="h-48 bg-gradient-to-br from-[var(--brand-700)] to-[var(--accent-900)] flex items-center justify-center relative group cursor-pointer">
                <BookOpen className="w-16 h-16 text-white/30 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <PlayCircle className="w-12 h-12 text-white absolute opacity-80 shadow-lg rounded-full" />
              </div>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-[var(--text-primary)] mb-6">
                  {course.price > 0 ? formatCurrency(course.price) : "Free"}
                </div>
                
                <div className="space-y-4 mb-6">
                  {["Full lifetime access", "Certificate of completion", "Real-world assignments", "Expert mentor access"].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand-400)] shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                {isEnrolled ? (
                  <Link href={`/student/courses/${course.slug}`}>
                    <Button size="xl" className="w-full">Continue Learning</Button>
                  </Link>
                ) : userId ? (
                  <EnrollButton courseId={course.id} />
                ) : (
                  <Link href={`/login?callbackUrl=/courses/${course.slug}`}>
                    <Button size="xl" className="w-full">Sign in to Enroll</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((module: { id: string, order: number, type: string, title: string, lessons: { id: string, title: string, duration: number | null }[] }) => (
                  <div key={module.id} className="glass-card rounded-xl border border-[var(--border-secondary)] overflow-hidden">
                    <div className="p-4 bg-[var(--bg-tertiary)]/30 border-b border-[var(--border-secondary)] flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-[var(--brand-400)] mb-1">MODULE {module.order} • {module.type}</p>
                        <h3 className="text-base font-semibold text-[var(--text-primary)]">{module.title}</h3>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">{module.lessons.length} lessons</span>
                    </div>
                    <div className="divide-y divide-[var(--border-secondary)]">
                      {module.lessons.map((lesson: { id: string, title: string, duration: number | null }) => (
                        <div key={lesson.id} className="p-4 flex items-center gap-3 hover:bg-[var(--bg-tertiary)]/20 transition-colors">
                          <PlayCircle className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                          <span className="text-sm font-medium text-[var(--text-secondary)]">{lesson.title}</span>
                          {(lesson.duration || 0) > 0 && <span className="text-xs text-[var(--text-muted)] ml-auto">{lesson.duration}m</span>}
                        </div>
                      ))}
                      {module.lessons.length === 0 && (
                        <div className="p-4 text-sm text-[var(--text-muted)]">Content coming soon...</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructor Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Your Instructor</h2>
            <div className="glass-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center text-white text-xl font-bold">
                  {course.trainer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{course.trainer.name}</h3>
                  <p className="text-sm text-[var(--text-accent)] font-medium">Expert Trainer</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {course.trainer.bio || "Industry expert dedicated to helping you scale your business skills through real-world execution."}
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
