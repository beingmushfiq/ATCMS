"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { claimCertificate } from "@/actions/certificates";
import { Loader2, Award } from "lucide-react";

export function ClaimCertificateButton({ enrollmentId }: { enrollmentId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClaim() {
    setLoading(true);
    setError("");

    const result = await claimCertificate(enrollmentId);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    }
    // if success, the page revalidates and this button disappears
  }

  return (
    <div className="space-y-2">
      <Button 
        onClick={handleClaim} 
        disabled={loading}
        className="w-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Award className="w-4 h-4 mr-2" />
        )}
        Claim Certificate
      </Button>
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
    </div>
  );
}
