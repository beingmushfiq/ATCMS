import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Student Dashboard | ATCMS",
  description: "Your learning hub and progress tracker",
};

export default async function StudentDashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  const [enrollments, certificates, submissions] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: { _count: { select: { modules: true } }, trainer: { select: { name: true } } },
        },
      },
      orderBy: { enrolledAt: "desc" },
    }),
    prisma.certificate.count({ where: { userId } }),
    prisma.submission.count({ where: { userId } }),
  ]);

  const activeCourses = enrollments.filter((e) => e.status === "ACTIVE").length;
  const completedCourses = enrollments.filter((e) => e.status === "COMPLETED").length;
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
    : 0;

  const stats = [
    { label: "Active Courses", value: activeCourses, icon: "BookOpen", color: "#6366f1" },
    { label: "Completed", value: completedCourses, icon: "CheckCircle2", color: "#10b981" },
    { label: "Certificates", value: certificates, icon: "Award", color: "#f59e0b" },
    { label: "Avg. Progress", value: `${avgProgress}%`, icon: "TrendingUp", color: "#ec4899" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="glass-card p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--brand-500)]/10 to-[var(--accent-500)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[var(--brand-400)]" />
            <span className="text-sm text-[var(--text-accent)] font-medium">AI-Powered Learning</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-[var(--text-secondary)] max-w-lg">
            Continue your learning journey. Your next step is just a click away.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Courses - 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>My Courses</CardTitle>
              <Link href="/student/courses" className="text-sm text-[var(--text-accent)] hover:underline">
                Browse Catalog
              </Link>
            </CardHeader>
            <CardContent>
              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-secondary)] mb-4">You haven&apos;t enrolled in any courses yet</p>
                  <Link href="/courses">
                    <Button>
                      Browse Courses
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.slice(0, 4).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="p-4 rounded-xl bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                            {enrollment.course.title}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            by {enrollment.course.trainer.name} · {enrollment.course._count.modules} modules
                          </p>
                        </div>
                        <Badge variant={enrollment.status === "COMPLETED" ? "success" : "default"}>
                          {enrollment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={enrollment.progress} className="flex-1" />
                        <span className="text-xs font-medium text-[var(--text-secondary)] w-10 text-right">
                          {Math.round(enrollment.progress)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Suggestions */}
          <Card className="border-[var(--brand-600)]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--brand-400)]" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { text: "Complete Module 2 Assessment", type: "action" },
                  { text: "Review Week 3 materials", type: "review" },
                  { text: "Submit business plan draft", type: "task" },
                ].map((suggestion, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-secondary)]">
                    <Target className="w-4 h-4 text-[var(--brand-400)] shrink-0" />
                    <span className="text-sm text-[var(--text-secondary)]">{suggestion.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: "First Enrollment", desc: "Enrolled in your first course", earned: true },
                  { title: "Fast Learner", desc: "Complete 5 lessons in a day", earned: false },
                  { title: "Certified", desc: "Earn your first certificate", earned: false },
                ].map((achievement) => (
                  <div
                    key={achievement.title}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      achievement.earned
                        ? "bg-amber-500/10 border border-amber-500/20"
                        : "bg-[var(--bg-input)] border border-[var(--border-secondary)] opacity-50"
                    }`}
                  >
                    <Trophy className={`w-4 h-4 shrink-0 ${achievement.earned ? "text-amber-400" : "text-[var(--text-muted)]"}`} />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{achievement.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
