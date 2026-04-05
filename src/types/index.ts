export type UserRole = "ADMIN" | "TRAINER" | "STUDENT" | "MENTOR";

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export type ModuleType = "ORIENTATION" | "CORE" | "PRACTICAL" | "EVALUATION" | "CERTIFICATION";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "PAUSED" | "DROPPED";

export type SubmissionStatus = "PENDING" | "REVIEWED" | "REVISION_NEEDED" | "APPROVED";

export type BusinessStage = "IDEA" | "PLAN" | "EXECUTION" | "REVENUE" | "GROWTH";

export type SessionStatus = "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface DashboardStats {
  label: string;
  value: string | number;
  change?: number;
  icon: string;
  color: string;
}
