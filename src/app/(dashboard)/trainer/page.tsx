import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Trainer Dashboard | ATCMS",
  description: "Manage your courses and students",
};

export default async function TrainerDashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  const [myCourses, totalStudents, pendingSubmissions] = await Promise.all([
    prisma.course.findMany({
      where: { trainerId: userId },
      include: {
        _count: { select: { enrollments: true, modules: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.enrollment.count({
      where: { course: { trainerId: userId } },
    }),
    prisma.submission.count({
      where: { status: "PENDING", task: { module: { course: { trainerId: userId } } } },
    }),
  ]);

  const courseCount = await prisma.course.count({ where: { trainerId: userId } });
  const publishedCount = await prisma.course.count({ where: { trainerId: userId, published: true } });

  const stats = [
    { label: "My Courses", value: courseCount, icon: "BookOpen", color: "#6366f1" },
    { label: "Total Students", value: totalStudents, icon: "Users", color: "#10b981", change: 5 },
    { label: "Published", value: publishedCount, icon: "Globe", color: "#8b5cf6" },
    { label: "Pending Reviews", value: pendingSubmissions, icon: "FileCheck", color: "#f59e0b" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Trainer Dashboard
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Manage your courses and track student progress
          </p>
        </div>
        <Link href="/trainer/courses">
          <Button>
            <Plus className="w-4 h-4" />
            New Course
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* My Courses */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>My Courses</CardTitle>
          <Link href="/trainer/courses" className="text-sm text-[var(--text-accent)] hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent>
          {myCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] mb-2">No courses yet</p>
              <p className="text-sm text-[var(--text-muted)]">Create your first course to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-600)] to-[var(--brand-800)] flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{course.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-[var(--text-muted)]">{course._count.modules} modules</span>
                      <span className="text-xs text-[var(--text-muted)]">{course._count.enrollments} students</span>
                    </div>
                  </div>
                  <Badge variant={course.published ? "success" : "secondary"}>
                    {course.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
