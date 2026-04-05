"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Bot, Loader2, ArrowRight } from "lucide-react";
import { generateBusinessAdvice } from "@/actions/ai";

export function AICoachWidget({ businessPlanId }: { businessPlanId: string }) {
  const [steps, setSteps] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    const result = await generateBusinessAdvice(businessPlanId);
    
    if (result.error) {
      setError(result.error);
    } else if (result.steps) {
      setSteps(result.steps);
    }
    setLoading(false);
  }

  return (
    <Card className="border-[var(--brand-500)]/20 shadow-[0_0_15px_-3px_var(--brand-500)] shadow-transparent transition-all hover:shadow-[var(--brand-500)]/20">
      <CardHeader className="pb-3 border-b border-[var(--border-secondary)] bg-[var(--bg-tertiary)]/50 rounded-t-xl">
        <CardTitle className="flex items-center gap-2 text-lg text-[var(--text-primary)]">
          <Sparkles className="w-5 h-5 text-[var(--brand-400)]" />
          Gemini AI Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {!steps && !loading && (
          <div className="text-center py-4">
            <Bot className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Have our AI analyze your recent execution history and suggest 3 highly actionable next steps to move the needle.
            </p>
            <Button onClick={handleAnalyze} className="w-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white">
              Analyze Momentum
            </Button>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-[var(--bg-tertiary)] rounded-full animate-pulse"></div>
              <Loader2 className="w-12 h-12 text-[var(--brand-500)] animate-spin absolute inset-0" />
            </div>
            <p className="text-sm font-medium text-[var(--brand-400)] animate-pulse">
              Analyzing plan & entries...
            </p>
          </div>
        )}

        {steps && !loading && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              Based on your momentum, focus on these next:
            </p>
            <div className="space-y-2">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-[var(--bg-input)] border border-[var(--border-secondary)] hover:border-[var(--brand-500)]/50 transition-colors group">
                  <ArrowRight className="w-4 h-4 text-[var(--brand-400)] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={handleAnalyze} className="w-full mt-2">
               Refresh Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
