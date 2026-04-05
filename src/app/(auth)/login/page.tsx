"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Award,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result.redirect) {
      router.push(result.redirect);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-900)] via-[var(--brand-800)] to-[var(--bg-primary)]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[var(--brand-500)]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-[var(--accent-500)]/8 rounded-full blur-3xl animate-float delay-300" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-80 transition-opacity w-fit">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center overflow-hidden">
              <Image src="/logos/logo_atcms.png" width={48} height={48} alt="ATCMS Logo" className="object-cover" />
            </div>
            <span className="text-2xl font-bold gradient-text">ATCMS</span>
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            AI-Powered<br />Training Center
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-md">
            Learn, execute, and scale real-world business skills with AI-powered guidance and mentorship.
          </p>

          <div className="space-y-5">
            {[
              { icon: BookOpen, text: "Structured learning with real-world application" },
              { icon: Users, text: "Expert mentors and trainer guidance" },
              { icon: Sparkles, text: "AI-powered adaptive learning paths" },
              { icon: Award, text: "Skill-based certification system" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-4 animate-slide-in-left" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[var(--brand-400)]" />
                </div>
                <span className="text-[var(--text-secondary)]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="mesh-bg" />

        {/* Back to Home Button */}
        <Link href="/" className="absolute top-6 right-6 lg:top-8 lg:right-8 z-50">
          <Button variant="ghost" size="sm" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            Back to Home
          </Button>
        </Link>

        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-3 mb-8 justify-center hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center overflow-hidden">
              <Image src="/logos/logo_atcms.png" width={48} height={48} alt="ATCMS Logo" className="object-cover" />
            </div>
            <span className="text-2xl font-bold gradient-text">ATCMS</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome back</h2>
            <p className="text-[var(--text-secondary)]">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-scale-in">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                icon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-[var(--text-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--text-accent)] hover:underline font-medium">
              Create one
            </Link>
          </p>

          {/* Demo Accounts */}
          <div className="mt-8 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]">
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { role: "Admin", email: "admin@atcms.com" },
                { role: "Trainer", email: "trainer@atcms.com" },
                { role: "Student", email: "student@atcms.com" },
                { role: "Mentor", email: "mentor@atcms.com" },
              ].map(({ role, email }) => (
                <div key={role} className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-secondary)]">
                  <span className="text-[var(--text-accent)] font-medium">{role}</span>
                  <p className="text-[var(--text-muted)] truncate">{email}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-2">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
