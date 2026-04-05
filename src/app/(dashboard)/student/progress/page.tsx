import { Card, CardContent } from "@/components/ui/card";
export const metadata = { title: "Progress" };
export default function GenericListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Progress</h1>
        <p className="text-[var(--text-secondary)] mt-1">Detailed breakdown of your skill progression</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-[var(--text-muted)]">
                <tr><th className="px-6 py-4 font-semibold">Module</th><th className="px-6 py-4 font-semibold">Score</th><th className="px-6 py-4 font-semibold">Accuracy</th><th className="px-6 py-4 font-semibold">Completion</th><th className="px-6 py-4 font-semibold">Pace</th></tr>
              </thead>
              <tbody>
                <tr><td colSpan={5} className="text-center py-12 text-[var(--text-muted)]">No Progress found.</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}