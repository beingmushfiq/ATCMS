export const APP_NAME = "ATCMS";
export const APP_FULL_NAME = "AI-Powered Training Center";
export const APP_DESCRIPTION = "Learn, Execute, and Scale real-world business skills with AI-powered guidance";

export const ROLES = {
  ADMIN: "ADMIN",
  TRAINER: "TRAINER",
  STUDENT: "STUDENT",
  MENTOR: "MENTOR",
} as const;

export const COURSE_LEVELS = [
  { value: "BEGINNER", label: "Beginner", color: "#10b981" },
  { value: "INTERMEDIATE", label: "Intermediate", color: "#f59e0b" },
  { value: "ADVANCED", label: "Advanced", color: "#ef4444" },
  { value: "EXPERT", label: "Expert", color: "#8b5cf6" },
] as const;

export const MODULE_TYPES = [
  { value: "ORIENTATION", label: "Orientation", icon: "Compass", color: "#818cf8" },
  { value: "CORE", label: "Core Learning", icon: "BookOpen", color: "#6366f1" },
  { value: "PRACTICAL", label: "Practical", icon: "Wrench", color: "#10b981" },
  { value: "EVALUATION", label: "Evaluation", icon: "ClipboardCheck", color: "#f59e0b" },
  { value: "CERTIFICATION", label: "Certification", icon: "Award", color: "#ec4899" },
] as const;

export const BUSINESS_STAGES = [
  { value: "IDEA", label: "Idea", icon: "Lightbulb" },
  { value: "PLAN", label: "Planning", icon: "FileText" },
  { value: "EXECUTION", label: "Execution", icon: "Rocket" },
  { value: "REVENUE", label: "Revenue", icon: "DollarSign" },
  { value: "GROWTH", label: "Growth", icon: "TrendingUp" },
] as const;

export const ADMIN_NAV = [
  { title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { title: "Users", href: "/admin/users", icon: "Users" },
  { title: "Courses", href: "/admin/courses", icon: "GraduationCap" },
  { title: "Enrollments", href: "/admin/enrollments", icon: "UserCheck" },
  { title: "Revenue", href: "/admin/revenue", icon: "DollarSign" },
  { title: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
  { title: "Settings", href: "/admin/settings", icon: "Settings" },
];

export const TRAINER_NAV = [
  { title: "Dashboard", href: "/trainer", icon: "LayoutDashboard" },
  { title: "My Courses", href: "/trainer/courses", icon: "BookOpen" },
  { title: "Students", href: "/trainer/students", icon: "Users" },
  { title: "Submissions", href: "/trainer/submissions", icon: "FileCheck" },
  { title: "Live Sessions", href: "/trainer/sessions", icon: "Video" },
  { title: "Analytics", href: "/trainer/analytics", icon: "BarChart3" },
];

export const STUDENT_NAV = [
  { title: "Dashboard", href: "/student", icon: "LayoutDashboard" },
  { title: "My Courses", href: "/student/courses", icon: "BookOpen" },
  { title: "Assignments", href: "/student/assignments", icon: "ClipboardList" },
  { title: "Certificates", href: "/student/certificates", icon: "Award" },
  { title: "Business Plan", href: "/student/business", icon: "Briefcase" },
  { title: "Progress", href: "/student/progress", icon: "TrendingUp" },
];

export const MENTOR_NAV = [
  { title: "Dashboard", href: "/mentor", icon: "LayoutDashboard" },
  { title: "Students", href: "/mentor/students", icon: "Users" },
  { title: "Sessions", href: "/mentor/sessions", icon: "Video" },
  { title: "Feedback", href: "/mentor/feedback", icon: "MessageSquare" },
];
