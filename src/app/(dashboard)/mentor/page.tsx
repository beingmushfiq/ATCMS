import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/stat-card";
import { getInitials } from "@/lib/utils";
import { Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Mentor Dashboard | ATCMS",
};

export default async function MentorDashboard() {
  const session = await auth();
  if (!session?.user?.id) return null;

  // Fetch mentor assignments
  const assignments = await prisma.mentorAssignment.findMany({
    where: { mentorId: session.user.id },
    include: {
      student: { select: { id: true, name: true, email: true, avatar: true } },
    },
    orderBy: { assignedAt: "desc" }
  });

  // Fetch live sessions
  // const sessions = await prisma.liveSession.findMany({
  //   where: { trainerId: session.user.id }, // Mentors act as trainers for sessions
  //   orderBy: { scheduledAt: "asc" }
  // });

  // const upcomingSessions = sessions.filter((s) => !(s as unknown as { completed?: boolean }).completed); // mock

  const stats = [
    { label: "Assigned Students", value: assignments.length, icon: "Users", color: "#6366f1" },
    { label: "Upcoming Sessions", value: 0, icon: "Video", color: "#10b981" },
    { label: "Pending Reviews", value: 4, icon: "MessageSquare", color: "#f59e0b" },
    { label: "Completion Rate", value: "84%", icon: "GraduationCap", color: "#ec4899" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Mentor Portal</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          Manage your assigned students, schedule 1-on-1s, and provide execution feedback.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Roster */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>My Student Roster</CardTitle>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                  <p className="text-[var(--text-secondary)]">No students assigned to you yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment: { id: string, assignedAt: Date, student: { id: string, name: string | null, email: string | null } }) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-[var(--brand-500)]/20">
                          <AvatarFallback className="text-[var(--brand-400)] font-medium">
                            {getInitials(assignment.student.name || "S")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{assignment.student.name}</p>
                          <p className="text-xs text-[var(--text-muted)]">{assignment.student.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-[var(--brand-500)]/10 text-[var(--brand-400)] border-none">
                          Active
                        </Badge>
                        <Button variant="secondary" size="sm">Review Progress</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--brand-400)]" />
                Live Coaching Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-[var(--text-secondary)] text-center py-4">No upcoming 1-on-1s scheduled.</p>
              <Button className="w-full mt-4" variant="secondary">
                Schedule New Session
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
