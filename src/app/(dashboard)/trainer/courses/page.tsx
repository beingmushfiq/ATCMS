import { prisma } from "@/lib/prisma";
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
}