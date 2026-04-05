const fs = require('fs');
const path = require('path');

const b = 'd:/Training Platform/atcms/src/app/(dashboard)';

const getAdminEnrollments = () => `import { prisma } from "@/lib/prisma";
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
}`;

const getAdminRevenue = () => `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, CreditCard, Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Revenue | ATCMS Admin" };

export default function AdminRevenuePage() {
  const stats = [
    { title: "Total Revenue", value: "0.00", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "MRR", value: "0.00", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Active Subscriptions", value: "0", icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10" },
    { title: "Transactions Today", value: "0", icon: CreditCard, color: "text-amber-400", bg: "bg-amber-500/10" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Revenue Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-1">Financial performance overview</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={\`w-12 h-12 rounded-xl \${s.bg} flex items-center justify-center shrink-0\`}>
                  <Icon className={\`w-6 h-6 \${s.color}\`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-muted)]">{s.title}</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)]">{s.title.includes('Revenue') || s.title === 'MRR' ? formatCurrency(parseFloat(s.value)) : s.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          <div className="text-center py-16 text-[var(--text-muted)]">No transactions recorded yet.</div>
        </CardContent>
      </Card>
    </div>
  );
}`;

const getAdminAnalytics = () => `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const metadata = { title: "Analytics | ATCMS Admin" };

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">System Analytics</h1>
        <p className="text-[var(--text-secondary)] mt-1">Platform usage and engagement metrics</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96">
          <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-5rem)] text-[var(--text-muted)]">
            <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
            <p>Chart data will appear here once populated</p>
          </CardContent>
        </Card>
        <Card className="h-96">
          <CardHeader><CardTitle>Course Engagement</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-5rem)] text-[var(--text-muted)]">
            <BarChart3 className="w-12 h-12 mb-4 opacity-50" />
            <p>Chart data will appear here once populated</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}`;

const getAdminSettings = () => `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Settings | ATCMS Admin" };

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Platform Settings</h1>
        <p className="text-[var(--text-secondary)] mt-1">Configure global application settings</p>
      </div>
      <Card>
        <CardHeader><CardTitle>General Configuration</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Platform Name</label>
              <Input defaultValue="ATCMS" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--text-secondary)]">Support Email</label>
              <Input defaultValue="support@atcms.com" type="email" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}`;

const getTrainerCourses = () => `import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

export const metadata = { title: "My Courses | Trainer" };

export default async function TrainerCoursesPage() {
  const session = await auth();
  const userId = session?.user?.id;
  
  const courses = await prisma.course.findMany({
    where: { trainerId: userId },
    include: { _count: { select: { enrollments: true, modules: true } } },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Courses</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage the courses you teach</p>
      </div>
      
      {courses.length === 0 ? (
        <Card><CardContent className="text-center py-20 text-[var(--text-muted)]"><BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />No courses published yet.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map(c => (
            <Card key={c.id}>
              <div className="h-32 bg-gradient-to-br from-[var(--brand-700)] to-[var(--brand-900)] rounded-t-xl flex items-center justify-center relative">
                <BookOpen className="w-10 h-10 text-white/30" />
                <Badge className="absolute top-3 right-3" variant={c.published ? 'success' : 'secondary'}>{c.published ? 'Published' : 'Draft'}</Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2 line-clamp-1">{c.title}</h3>
                <div className="flex justify-between text-sm text-[var(--text-muted)] mb-4">
                  <span>{c._count.enrollments} Students</span>
                  <span>{c._count.modules} Modules</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}`;

const getGenericList = (title, desc, cols) => {
  const headers = cols.map(c => `<th className="px-6 py-4 font-semibold">${c}</th>`).join('');
  return `import { Card, CardContent } from "@/components/ui/card";
export const metadata = { title: "${title}" };
export default function GenericListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">${title}</h1>
        <p className="text-[var(--text-secondary)] mt-1">${desc}</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-[var(--text-muted)]">
                <tr>${headers}</tr>
              </thead>
              <tbody>
                <tr><td colSpan={${cols.length}} className="text-center py-12 text-[var(--text-muted)]">No ${title} found.</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}`;
};

const generators = {
  admin: {
    enrollments: getAdminEnrollments,
    revenue: getAdminRevenue,
    analytics: getAdminAnalytics,
    settings: getAdminSettings
  },
  trainer: {
    courses: getTrainerCourses,
    students: () => getGenericList("Students", "Manage enrolled students", ["Name", "Course", "Progress", "Last Active"]),
    submissions: () => getGenericList("Submissions", "Review student assignments", ["Student", "Assignment", "Course", "Status", "Date"]),
    sessions: () => getGenericList("Sessions", "Manage live training sessions", ["Topic", "Date", "Attendees", "Status", "Action"]),
    analytics: getAdminAnalytics
  },
  student: {
    assignments: () => getGenericList("Assignments", "Your pending and completed assignments", ["Title", "Course", "Due Date", "Status", "Grade"]),
    progress: () => getGenericList("Progress", "Detailed breakdown of your skill progression", ["Module", "Score", "Accuracy", "Completion", "Pace"])
  },
  mentor: {
    students: () => getGenericList("Assigned Students", "Students you are mentoring", ["Student", "Program", "Overall Progress", "Next Session"]),
    sessions: () => getGenericList("1-on-1 Sessions", "Your scheduled mentorship sessions", ["Student", "Topic", "Date/Time", "Status", "Action"]),
    feedback: () => getGenericList("Feedback History", "Feedback provided to students", ["Student", "Assessment", "Rating", "Date"])
  }
};

for (const [role, pages] of Object.entries(generators)) {
  for (const [p, gen] of Object.entries(pages)) {
    const dir = path.join(b, role, p);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), gen());
  }
}
