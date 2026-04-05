import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Plus, Users, Layers, Eye, EyeOff, Edit, Trash2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { togglePublishCourse, deleteCourse } from "@/actions/courses";

export const metadata = {
  title: "Manage Courses | ATCMS Admin",
};

export default async function AdminCoursesPage() {
  const courses = await prisma.course.findMany({
    include: {
      trainer: { select: { name: true } },
      category: { select: { name: true } },
      _count: { select: { enrollments: true, modules: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Courses</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage all platform courses</p>
        </div>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="w-4 h-4" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Course Grid */}
      {courses.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <BookOpen className="w-16 h-16 text-[var(--text-muted)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No courses yet</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">Create your first course to get started</p>
            <Link href="/admin/courses/new">
              <Button>
                <Plus className="w-4 h-4" />
                Create First Course
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              {/* Course Thumbnail Placeholder */}
              <div className="h-40 rounded-t-xl bg-gradient-to-br from-[var(--brand-700)] to-[var(--brand-900)] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJIMjR2LTJoMTJ6bTAtNHYySDI0di0yaDEyem0wLTR2MkgyNHYtMmgxMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
                <BookOpen className="w-12 h-12 text-white/30" />
                <div className="absolute top-3 right-3">
                  <Badge variant={course.published ? "success" : "secondary"}>
                    {course.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="default">{course.level}</Badge>
                </div>
              </div>

              <CardContent className="flex-1 flex flex-col pt-4">
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {course._count.enrollments} students
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> {course._count.modules} modules
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-4">
                  <span>by {course.trainer.name}</span>
                  <span className="font-semibold text-[var(--text-primary)]">
                    {course.price > 0 ? formatCurrency(course.price) : "Free"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[var(--border-secondary)]">
                  <form action={async () => {
                    "use server";
                    await togglePublishCourse(course.id);
                  }} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full" type="submit">
                      {course.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {course.published ? "Unpublish" : "Publish"}
                    </Button>
                  </form>
                  <Link href={`/admin/courses/${course.id}`}>
                    <Button variant="secondary" size="sm">
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <form action={async () => {
                    "use server";
                    await deleteCourse(course.id);
                  }}>
                    <Button variant="danger" size="sm" type="submit">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
