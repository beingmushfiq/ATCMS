import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDate, formatCurrency } from "@/lib/utils";

export const metadata = {
  title: "Admin Dashboard | ATCMS",
  description: "System overview and management",
};

export default async function AdminDashboard() {
  const [totalUsers, totalCourses, totalEnrollments, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
  ]);

  const studentCount = await prisma.user.count({ where: { role: "STUDENT" } });
  const trainerCount = await prisma.user.count({ where: { role: "TRAINER" } });
  const publishedCourses = await prisma.course.count({ where: { published: true } });
  const completedEnrollments = await prisma.enrollment.count({ where: { status: "COMPLETED" } });

  const stats = [
    { label: "Total Users", value: totalUsers, icon: "Users", color: "#6366f1", change: 12 },
    { label: "Active Students", value: studentCount, icon: "GraduationCap", color: "#10b981", change: 8 },
    { label: "Total Courses", value: totalCourses, icon: "BookOpen", color: "#f59e0b", change: 15 },
    { label: "Enrollments", value: totalEnrollments, icon: "UserCheck", color: "#ec4899", change: 22 },
    { label: "Trainers", value: trainerCount, icon: "Users", color: "#3b82f6" },
    { label: "Published Courses", value: publishedCourses, icon: "Globe", color: "#8b5cf6" },
    { label: "Completions", value: completedEnrollments, icon: "CheckCircle2", color: "#14b8a6" },
    { label: "Revenue", value: formatCurrency(0), icon: "DollarSign", color: "#f97316" },
  ];

  const roleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN": return "danger" as const;
      case "TRAINER": return "info" as const;
      case "STUDENT": return "success" as const;
      case "MENTOR": return "warning" as const;
      default: return "secondary" as const;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Admin Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Complete system overview and management center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] text-center py-8">
                  No users yet. Seed the database to get started.
                </p>
              ) : (
                recentUsers.map((user: { id: string, name: string | null, email: string | null, role: string, createdAt: Date }) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">{getInitials(user.name || "Unknown")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user.name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
                    </div>
                    <Badge variant={roleBadgeVariant(user.role)}>{user.role}</Badge>
                    <span className="text-xs text-[var(--text-muted)] hidden sm:inline">{formatDate(user.createdAt)}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Platform Status", value: "Online", color: "bg-emerald-500" },
                { label: "Database", value: "SQLite (Dev)", color: "bg-blue-500" },
                { label: "AI Engine", value: "Ready", color: "bg-purple-500" },
                { label: "Learning Flow", value: "Active", color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-tertiary)]/50">
                  <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color} animate-pulse`} />
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Users", href: "/admin/users" },
                  { label: "Courses", href: "/admin/courses" },
                  { label: "Analytics", href: "/admin/analytics" },
                  { label: "Settings", href: "/admin/settings" },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="p-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-primary)] text-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--brand-400)] hover:border-[var(--border-active)] transition-all"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
