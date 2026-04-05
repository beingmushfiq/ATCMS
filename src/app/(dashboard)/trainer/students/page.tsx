import { Card, CardContent } from "@/components/ui/card";
export const metadata = { title: "Students" };
export default function GenericListPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Students</h1>
        <p className="text-[var(--text-secondary)] mt-1">Manage enrolled students</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] text-[var(--text-muted)]">
                <tr><th className="px-6 py-4 font-semibold">Name</th><th className="px-6 py-4 font-semibold">Course</th><th className="px-6 py-4 font-semibold">Progress</th><th className="px-6 py-4 font-semibold">Last Active</th></tr>
              </thead>
              <tbody>
                <tr><td colSpan={4} className="text-center py-12 text-[var(--text-muted)]">No Students found.</td></tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}