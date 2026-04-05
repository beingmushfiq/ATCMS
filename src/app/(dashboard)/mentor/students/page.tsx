import { Card, CardContent } from "@/components/ui/card";
export const metadata = { title: "Assigned Students" };
export default function GenericListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Assigned Students</h1>
        <p className="text-[var(--text-secondary)] mt-1">Students you are mentoring</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-[var(--text-muted)]">
                <tr><th className="px-6 py-4 font-semibold">Student</th><th className="px-6 py-4 font-semibold">Program</th><th className="px-6 py-4 font-semibold">Overall Progress</th><th className="px-6 py-4 font-semibold">Next Session</th></tr>
              </thead>
              <tbody>
                <tr><td colSpan={4} className="text-center py-12 text-[var(--text-muted)]">No Assigned Students found.</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}