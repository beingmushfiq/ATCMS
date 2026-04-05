"use client";

import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { addBusinessEntry } from "@/actions/business";
import { Loader2 } from "lucide-react";

export function AddEntryForm({ businessPlanId, currentStage }: { businessPlanId: string, currentStage: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await addBusinessEntry(formData);
      if (result.success) {
        formRef.current?.reset();
      }
      return result;
    },
    null
  );

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input type="hidden" name="businessPlanId" value={businessPlanId} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Update Title</label>
          <input 
            name="title"
            required 
            type="text" 
            placeholder="e.g., Finished Landing Page"
            className="w-full p-2.5 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)]" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--text-secondary)]">Revenue Generated ($)</label>
          <input 
            name="revenue"
            type="number" 
            step="0.01"
            placeholder="0.00"
            className="w-full p-2.5 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)]" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">Current Stage</label>
        <select 
          name="stage"
          defaultValue={currentStage}
          className="w-full p-2.5 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)]" 
        >
          <option value="IDEA">📱 Idea & Concept</option>
          <option value="PLAN">📝 Planning & Strategy</option>
          <option value="EXECUTION">🛠️ Execution & Building</option>
          <option value="REVENUE">💰 Revenue Generation</option>
          <option value="GROWTH">🚀 Scaling & Growth</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--text-secondary)]">Notes / Progress Details</label>
        <textarea 
          name="notes"
          rows={3} 
          placeholder="What did you achieve? What are your next tasks?"
          className="w-full p-2.5 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-500)]" 
        />
      </div>
      
      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Save Progress Entry
      </Button>
    </form>
  );
}
