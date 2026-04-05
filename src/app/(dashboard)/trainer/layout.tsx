import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default async function TrainerLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      user={{
        name: session.user.name || "Trainer",
        email: session.user.email || "",
        role: (session.user as { role: string }).role,
      }}
    >
      {children}
    </DashboardShell>
  );
}
