"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createBusinessPlan } from "@/actions/business";
import { Loader2 } from "lucide-react";

export function CreatePlanForm() {
  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      return await createBusinessPlan(formData);
    },
    null
  );

  return (
    <Card className="max-w-xl mx-auto mt-12 border-[var(--border-secondary)]">
      <CardHeader>
        <CardTitle className="text-2xl text-[var(--text-primary)]">Launch Your Business Plan</CardTitle>
        <CardDescription>
          Record your idea here. We will track your journey from Idea to Revenue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Business Title / Concept</label>
            <input 
              name="title"
              required 
              type="text" 
              placeholder="e.g., AI Operations Agency"
              className="w-full p-2.5 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)]" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--text-secondary)]">Brief Description</label>
            <textarea 
              name="description"
              required 
              rows={4} 
              placeholder="Describe what you plan to build and sell..."
              className="w-full p-2.5 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)]" 
            />
          </div>
          
          {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Start My Journey
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
