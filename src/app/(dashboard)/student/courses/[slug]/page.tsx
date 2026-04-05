import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CourseViewerIndex(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course || course.modules.length === 0 || course.modules[0].lessons.length === 0) {
    redirect("/student");
  }

  // Find the first lesson
  const firstLesson = course.modules[0].lessons[0];
  
  // Later we could query LessonProgress to find the truly "Next" lesson for this user
  
  redirect(`/student/courses/${course.slug}/learn/${firstLesson.id}`);
}
