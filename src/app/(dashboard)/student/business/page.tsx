import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { CreatePlanForm } from "./create-plan-form";
import { AddEntryForm } from "./add-entry-form";
import { AICoachWidget } from "./ai-coach";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Briefcase, TrendingUp, Target, CalendarDays, Rocket } from "lucide-react";
import { format } from "date-fns";

export const metadata = {
  title: "Business Tracker | ATCMS",
};

export default async function BusinessTrackerPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const plan = await prisma.businessPlan.findFirst({
    where: { userId: session.user.id },
    include: {
      entries: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!plan) {
    return (
      <div className="py-6 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Business Idea Tracker</h1>
          <p className="text-[var(--text-secondary)] mt-2">
            The ultimate test of your skills is real-world execution. Launch your plan and track your revenue.
          </p>
        </div>
        <CreatePlanForm />
      </div>
    );
  }

  // Calculate some basic stats
  const totalEntries = plan.entries.length;
  const recentRevenue = plan.entries.slice(0, 3).reduce((acc, entry) => acc + entry.revenue, 0);

  const STAGE_COLORS: Record<string, string> = {
    IDEA: "bg-slate-500",
    PLAN: "bg-blue-500",
    EXECUTION: "bg-yellow-500",
    REVENUE: "bg-emerald-500",
    GROWTH: "bg-purple-500",
  };

  return (
    <div className="py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">{plan.title}</h1>
          <p className="text-[var(--text-secondary)] mt-2 max-w-2xl">{plan.description}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-secondary)] bg-[var(--bg-tertiary)]">
          <Target className="w-4 h-4 text-[var(--brand-400)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Stage:</span>
          <Badge className={`${STAGE_COLORS[plan.stage] || "bg-gray-500"} text-white border-0`}>
            {plan.stage}
          </Badge>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-[var(--brand-600)]/30 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-primary)]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Total Revenue Tracking</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">{formatCurrency(plan.revenue)}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Recent Momentum (3 entries)</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">{formatCurrency(recentRevenue)}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-500" />
              </div>
            </div>
            <p className="text-sm font-medium text-[var(--text-muted)] mb-1">Total Entries Logged</p>
            <h3 className="text-3xl font-bold text-[var(--text-primary)]">{totalEntries} Updates</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Execution Timeline</h2>
          {plan.entries.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-[var(--border-secondary)] rounded-xl">
              <CalendarDays className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)]">No execution entries yet.</p>
              <p className="text-sm text-[var(--text-muted)]">Log your first step on the right.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-[var(--border-secondary)] ml-4 space-y-8">
              {plan.entries.map((entry) => (
                <div key={entry.id} className="relative pl-8">
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--brand-500)] ring-4 ring-[var(--bg-primary)]" />
                  <div className="glass-card p-5 rounded-xl border border-[var(--border-secondary)]">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">{entry.title}</h4>
                        <span className="text-xs font-medium text-[var(--text-muted)] mt-1 block">
                          {format(new Date(entry.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                      {entry.revenue > 0 && (
                        <Badge variant="success" className="shrink-0 bg-emerald-500/10 text-emerald-500 border-none">
                          +{formatCurrency(entry.revenue)}
                        </Badge>
                      )}
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-[var(--text-secondary)] mt-3 whitespace-pre-wrap">
                        {entry.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: AI & Form */}
        <div className="lg:col-span-1 space-y-6">
          <AICoachWidget businessPlanId={plan.id} />
          
          <Card className="sticky top-6 border-[var(--border-secondary)]">
            <CardHeader>
              <CardTitle>Log Progress</CardTitle>
              <CardDescription>Update your stage and add new revenue or milestones.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddEntryForm businessPlanId={plan.id} currentStage={plan.stage} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
