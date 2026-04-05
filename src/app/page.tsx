import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Target,
  BarChart3,
  Rocket,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Sequential course flow from Orientation to Certification with no shortcuts — real mastery guaranteed.",
    color: "#6366f1",
  },
  {
    icon: Target,
    title: "Practical Execution",
    description: "Hands-on projects, real-world scenarios, and live assignments — not just theory.",
    color: "#10b981",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Guidance",
    description: "Personalized learning paths, weakness detection, and adaptive pace powered by AI.",
    color: "#8b5cf6",
  },
  {
    icon: Award,
    title: "Skill Certification",
    description: "Earn certificates based on actual skill validation — not attendance.",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Business Tracking",
    description: "Track your business from idea to revenue with KPI dashboards and growth insights.",
    color: "#ec4899",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Get paired with industry mentors for guidance, feedback, and live support sessions.",
    color: "#3b82f6",
  },
];

const stats = [
  { value: "500+", label: "Students Trained" },
  { value: "50+", label: "Expert Courses" },
  { value: "95%", label: "Completion Rate" },
  { value: "200+", label: "Certificates Issued" },
];

const flowSteps = [
  { step: "01", title: "Orientation", desc: "Mindset & direction setting", icon: Target },
  { step: "02", title: "Core Learning", desc: "Concept mastery", icon: BookOpen },
  { step: "03", title: "Practical", desc: "Hands-on execution", icon: Zap },
  { step: "04", title: "Evaluation", desc: "Skill assessment", icon: BarChart3 },
  { step: "05", title: "Certification", desc: "Validated credentials", icon: Award },
  { step: "06", title: "Business", desc: "Launch & scale", icon: Rocket },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      <div className="mesh-bg" />
      <div className="grid-pattern fixed inset-0 opacity-20 pointer-events-none" />

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center px-6 lg:px-12 glass">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center overflow-hidden">
            <Image src="/logos/logo_atcms.png" width={36} height={36} alt="ATCMS Logo" className="object-cover" />
          </div>
          <span className="text-lg font-bold gradient-text">ATCMS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 ml-12">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Courses", href: "/courses" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* ─── HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-32 left-10 w-64 h-64 md:w-96 md:h-96 bg-[var(--brand-500)]/8 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 md:w-[500px] md:h-[500px] bg-[var(--accent-500)]/6 rounded-full blur-[120px] animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-[var(--brand-600)]/4 rounded-full blur-[150px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[var(--brand-600)]/10 border border-[var(--brand-600)]/20 text-xs sm:text-sm text-[var(--brand-300)] mb-6 sm:mb-8 animate-fade-in whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">AI-Powered Training Platform</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] md:leading-[1.1] tracking-tight mb-4 sm:mb-6 animate-fade-in delay-100 flex flex-col sm:block break-words">
            <span className="text-[var(--text-primary)]">Learn. Execute.</span>
            <span className="hidden sm:inline">{" "}</span>
            <span className="gradient-text">Scale Your Business.</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in delay-200 px-2 sm:px-0">
            The complete training management system that combines structured learning,
            hands-on execution, AI guidance, and real-world business tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in delay-300 w-full px-4 sm:px-0">
            <Link href="/register" className="w-full sm:w-auto mt-2 sm:mt-0">
              <Button size="xl" className="group w-full sm:w-auto">
                <span className="truncate">Start Learning Free</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto mt-2 sm:mt-0">
              <Button size="xl" variant="secondary" className="w-full sm:w-auto">
                <span className="truncate">Explore Features</span>
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto animate-fade-in delay-400 px-2 sm:px-0">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-3 sm:p-4 text-center break-words">
                <p className="text-xl sm:text-2xl font-bold gradient-text-brand">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-[var(--text-muted)] mt-1 truncate">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-600)]/10 border border-[var(--brand-600)]/20 text-xs text-[var(--brand-300)] mb-4">
              <Shield className="w-3 h-3" />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              A complete ecosystem for learning, execution, and growth — powered by AI and guided by experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card p-6 group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (LEARNING FLOW) ────────────────────── */}
      <section id="how-it-works" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-900)]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-500)]/10 border border-[var(--accent-500)]/20 text-xs text-[var(--accent-400)] mb-4">
              <Zap className="w-3 h-3" />
              <span>Learning Flow Engine</span>
            </div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Your Path to{" "}
              <span className="gradient-text">Mastery</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Every topic follows a structured 6-step flow — from orientation to business execution. No shortcuts, no gaps.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  <div className="glass-card p-5 text-center h-full">
                    <div className="text-xs font-bold text-[var(--brand-400)] mb-3">{step.step}</div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--brand-600)]/15 border border-[var(--brand-600)]/20 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[var(--brand-400)]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{step.title}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{step.desc}</p>
                  </div>
                  {/* Arrow */}
                  {i < flowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-4 h-4 text-[var(--brand-500)]/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Loop indicator */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card">
              <div className="pulse-dot" />
              <span className="text-sm text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">Adaptive Loop:</strong>{" "}
                Learn → Execute → Evaluate → Improve → Scale
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROLES ───────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Built for{" "}
              <span className="gradient-text">Everyone</span>
            </h2>
            <p className="text-[var(--text-secondary)]">
              Tailored dashboards and tools for every role in the ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Student",
                desc: "Learn, execute, and track your business growth with AI-powered guidance.",
                features: ["Adaptive Learning", "Progress Tracking", "Business KPIs", "Certificates"],
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                role: "Trainer",
                desc: "Create courses, manage students, and track learning outcomes.",
                features: ["Course Builder", "Student Analytics", "Assignment Review", "Live Sessions"],
                gradient: "from-blue-500 to-cyan-600",
              },
              {
                role: "Mentor",
                desc: "Guide assigned students with personalized feedback and support.",
                features: ["Student Oversight", "Session Scheduling", "Feedback Tools", "Progress Reports"],
                gradient: "from-purple-500 to-pink-600",
              },
              {
                role: "Admin",
                desc: "Full system control, analytics, and business intelligence.",
                features: ["User Management", "Revenue Dashboard", "System Analytics", "Platform Settings"],
                gradient: "from-orange-500 to-red-600",
              },
            ].map((item) => (
              <div key={item.role} className="glass-card p-6 flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.role}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 flex-1">{item.desc}</p>
                <div className="space-y-2">
                  {item.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-500)]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="glass-card p-12 lg:p-16 animated-border">
            <Sparkles className="w-10 h-10 text-[var(--brand-400)] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ready to Transform Your Skills?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Join hundreds of students already building real businesses through structured learning and AI-powered guidance.
            </p>
            <Link href="/register">
              <Button size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-primary)] py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-[var(--text-secondary)]">ATCMS</span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              © {new Date().getFullYear()} AI-Powered Training Center. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
