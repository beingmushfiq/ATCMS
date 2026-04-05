import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
                <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-6 h-6 ${s.color}`} />
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
}