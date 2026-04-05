import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { ClaimCertificateButton } from "./claim-button";
import { Award, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "My Certificates | ATCMS",
};

export default async function CertificatesPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const [certificates, enrollments] = await Promise.all([
    prisma.certificate.findMany({
      where: { userId: session.user.id },
      include: { course: true },
      orderBy: { issuedAt: "desc" }
    }),
    prisma.enrollment.findMany({
      where: { userId: session.user.id, status: "COMPLETED" },
      include: { course: true }
    })
  ]);

  // Find completed courses that don't have a certificate yet
  const claimedCourseIds = new Set(certificates.map((c: { courseId: string }) => c.courseId));
  const claimableEnrollments = enrollments.filter((e: { courseId: string }) => !claimedCourseIds.has(e.courseId));

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Certificates</h1>
        <p className="text-[var(--text-secondary)] mt-2">
          View, download, and share your verified credentials.
        </p>
      </div>

      {claimableEnrollments.length > 0 && (
        <div className="space-y-4 mb-12">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Ready to Claim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {claimableEnrollments.map((enr: { id: string, course: { title: string } }) => (
              <Card key={enr.id} className="border-[var(--brand-500)]/30 bg-gradient-to-r from-[var(--bg-tertiary)] to-[var(--brand-900)]/10">
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-500)]/20 flex items-center justify-center shrink-0">
                    <Award className="w-8 h-8 text-[var(--brand-400)]" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-[var(--text-primary)]">{enr.course.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4">Completed 100% Core Curriculum</p>
                    <ClaimCertificateButton enrollmentId={enr.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Earned Certificates</h2>
        {certificates.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[var(--border-secondary)] rounded-xl">
            <Award className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">You haven't earned any certificates yet.</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Complete 100% of a course to earn your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert: { id: string, certificateNo: string, issuedAt: Date, course: { title: string } }) => (
              <Card key={cert.id} className="overflow-hidden group border-[var(--border-secondary)] hover:border-[var(--brand-500)]/50 transition-colors">
                <div className="h-40 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-primary)] p-6 flex flex-col justify-between border-b border-[var(--border-secondary)]">
                  <div className="flex justify-between items-start">
                    <div className="px-3 py-1 bg-[var(--brand-500)]/10 text-[var(--brand-400)] text-xs font-bold rounded-full font-mono">
                      {cert.certificateNo}
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[var(--text-primary)] font-serif text-2xl tracking-wide opacity-90 group-hover:opacity-100 transition-opacity">
                      Certificate of Completion
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-[var(--text-primary)] mb-1">{cert.course.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Issued on {format(new Date(cert.issuedAt), "MMMM d, yyyy")}
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Real PDF generation would go here */}
                    <Button variant="outline" className="flex-1" disabled>
                      <Download className="w-4 h-4 mr-2" /> PDF
                    </Button>
                    <Link href={`/verify-certificate/${cert.certificateNo}`} className="flex-1">
                      <Button variant="secondary" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" /> Verify
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
