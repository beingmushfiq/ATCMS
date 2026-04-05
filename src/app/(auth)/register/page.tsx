"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const roles = [
  { value: "STUDENT", label: "Student", desc: "Learn & execute business skills" },
  { value: "TRAINER", label: "Trainer", desc: "Create courses & guide students" },
  { value: "MENTOR", label: "Mentor", desc: "Provide guidance & feedback" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("STUDENT");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.set("role", selectedRole);

    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/login?registered=true");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      <div className="mesh-bg" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Back to Home Button */}
      <Link href="/" className="absolute top-6 right-6 lg:top-8 lg:right-8 z-50">
        <Button variant="ghost" size="sm" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          Back to Home
        </Button>
      </Link>

      <div className="w-full max-w-lg relative z-10 animate-fade-in">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-8 justify-center hover:opacity-80 transition-opacity w-fit mx-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center overflow-hidden">
            <Image src="/logos/logo_atcms.png" width={48} height={48} alt="ATCMS Logo" className="object-cover" />
          </div>
          <span className="text-2xl font-bold gradient-text">ATCMS</span>
        </Link>

        <div className="glass-card p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Create your account</h2>
            <p className="text-[var(--text-secondary)]">Start your learning journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-scale-in">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Full name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                icon={<User className="w-4 h-4" />}
              />
            </div>

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
                minLength={6}
                icon={<Lock className="w-4 h-4" />}
              />
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
                I want to join as
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map(({ value, label, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedRole(value)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      selectedRole === value
                        ? "border-[var(--brand-500)] bg-[var(--brand-600)]/10 shadow-[var(--shadow-glow)]"
                        : "border-[var(--border-primary)] bg-[var(--bg-input)] hover:border-[var(--border-active)]"
                    }`}
                  >
                    {selectedRole === value && (
                      <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-[var(--brand-400)]" />
                    )}
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-1 leading-tight">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--text-accent)] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
