import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatDate } from "@/lib/utils";

export const metadata = { title: "Enrollments | ATCMS Admin" };

export default async function AdminEnrollmentsPage() {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      user: { select: { name: true, email: true } },
      course: { select: { title: true, level: true } }
    },
    orderBy: { enrolledAt: "desc" },
    take: 20
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Enrollments</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage global course enrollments</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)]">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--text-muted)]">Student</th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--text-muted)]">Course</th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--text-muted)]">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--text-muted)]">Progress</th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--text-muted)]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-secondary)]">
                {enrollments.map((e) => (
                  <tr key={e.id} className="hover:bg-[var(--bg-tertiary)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8"><AvatarFallback>{getInitials(e.user.name)}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{e.user.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{e.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{e.course.title} <Badge variant="secondary" className="ml-2">{e.course.level}</Badge></td>
                    <td className="px-6 py-4"><Badge variant={e.status === 'COMPLETED' ? 'success' : 'info'}>{e.status}</Badge></td>
                    <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{Math.round(e.progress)}%</td>
                    <td className="px-6 py-4 text-[var(--text-muted)]">{formatDate(e.enrolledAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}