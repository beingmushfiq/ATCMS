import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
}