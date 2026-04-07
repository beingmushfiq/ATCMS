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

      {/* ─── ANNOUNCEMENT BAR ────────────────────────────────────── */}
      <div className="relative z-[60] bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-600)] py-2 px-4 shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest animate-reveal">
          <Zap className="w-3 h-3 animate-pulse" />
          <span>Join the AI Revolution in Training. 500+ Students Already Scaling.</span>
          <ArrowRight className="w-3 h-3" />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      </div>

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-8 inset-x-4 sm:inset-x-8 lg:inset-x-12 z-50 h-16 sm:h-20 flex items-center px-6 lg:px-12 glass rounded-3xl sm:rounded-[2rem] border-white/5 shadow-2xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-500)] to-[var(--accent-500)] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
            <Image src="/logos/logo_atcms.png" width={48} height={48} alt="ATCMS Logo" className="object-cover relative z-10" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-black gradient-text tracking-tighter">ATCMS.</span>
        </Link>

        <div className="hidden lg:flex items-center gap-10 ml-16">
          {[
            { label: "Platform", href: "#features" },
            { label: "Learning Engine", href: "#how-it-works" },
            { label: "Courses", href: "/courses" },
            { label: "Mentors", href: "#" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" className="font-semibold text-white/70 hover:text-white">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-2xl px-6 sm:px-8 font-bold shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all">
              Join Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-screen pt-32 lg:pt-40 pb-20 flex flex-col items-center">
        <div className="hero-spotlight" />
        
        {/* Floating Orbs for depth */}
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] animate-float-slow delay-500" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-xs font-bold text-[var(--brand-300)] mb-8 shadow-xl">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="uppercase tracking-[0.2em]">Next-Gen Learning OS</span>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white/50">v2.4 Live Now</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8">
              <span className="text-white">Master Your</span><br />
              <span className="gradient-text">Future Self.</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-12 max-w-lg">
              The only platform that bridge the gap between <strong className="text-white">Structured Orientation</strong> and <strong className="text-white">Business Scaling</strong> using proprietary AI guidance.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] hover:scale-105 transition-transform duration-300 px-10">
                  Step Into Orientation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] overflow-hidden bg-[var(--bg-secondary)]">
                    <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="pl-6 text-sm text-[var(--text-muted)] font-medium">
                  <span className="text-white font-bold tracking-wider">500+ Learners</span> Trusted.
                </div>
              </div>
            </div>

            {/* Benefit Bullets */}
            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
              {[
                { icon: Shield, text: "Skill Validation", sub: "Actual metrics, not attendance" },
                { icon: BarChart3, text: "Revenue Focused", sub: "Scale your ideas to business" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.text}</h4>
                    <p className="text-[10px] text-[var(--text-muted)] leading-tight">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Mockup */}
          <div className="relative animate-slide-in-right delay-200">
            <div className="relative z-20 group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative glass-card border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <Image 
                  src="/images/hero-dashboard.png" 
                  width={1200} 
                  height={800} 
                  alt="ATCMS Dashboard Mockup" 
                  className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105"
                />
                {/* Floating UI indicators */}
                <div className="absolute top-10 right-10 p-4 glass rounded-2xl shadow-2xl animate-float-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-black tracking-tighter">Your Progress</p>
                      <p className="text-xs font-bold text-white">+84.2% Growth</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-10 left-10 p-4 glass rounded-2xl shadow-2xl animate-float-slow delay-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-black tracking-tighter">Verified Skills</p>
                      <p className="text-xs font-bold text-white">Fullstack Expert</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background elements for the image section */}
            <div className="absolute -z-10 top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
          </div>

        </div>

        {/* ─── TRUSTED BY / SOCIAL PROOF ─────────────────────── */}
        <div className="w-full mt-24 py-12 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-12 flex flex-wrap items-center justify-center gap-12 sm:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-black tracking-tighter text-white">TECHCORE</span>
            <span className="text-xl font-black tracking-tighter text-white">GEN-Z LABS</span>
            <span className="text-xl font-black tracking-tighter text-white">NEXUS ACADEMY</span>
            <span className="text-xl font-black tracking-tighter text-white">SKYLINE BIZ</span>
            <span className="text-xl font-black tracking-tighter text-white">VISIONARY CO.</span>
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
        </div>
      </section>


      {/* ─── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 font-mono">
              <Shield className="w-4 h-4" />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Built for <span className="gradient-text">Unstoppable</span> Growth
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              We've engineered every feature to remove friction from your learning journey and accelerate your business execution.
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
          <div className="text-center mb-24 relative z-10 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6 font-mono">
              <Zap className="w-4 h-4" />
              <span>The Flow Engine</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Mastery is a <span className="gradient-text">Sequence.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Our 6-step propulsion system ensures you don't just "learn" — you master, execute, and scale.
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
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Built for <span className="gradient-text">Teams that Scale.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Tailored workspaces engineered for every stakeholder in the training ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Student",
                desc: "The core learner experience. Focus on execution and scaling your business.",
                features: ["Adaptive UX", "Business KPIs", "Project Hub"],
                gradient: "from-emerald-500/20 to-teal-600/20",
                iconColor: "text-emerald-400",
              },
              {
                role: "Trainer",
                desc: "Command center for course creation and student performance analytics.",
                features: ["Course OS", "Real-time Analytics", "Batch Tools"],
                gradient: "from-blue-500/20 to-cyan-600/20",
                iconColor: "text-blue-400",
              },
              {
                role: "Mentor",
                desc: "Dedicated view for high-impact guidance and personalized feedback loops.",
                features: ["Feedback Engine", "Session Scheduler", "Oversight"],
                gradient: "from-purple-500/20 to-pink-600/20",
                iconColor: "text-purple-400",
              },
              {
                role: "Admin",
                desc: "Total platform control with deep business intelligence and audit logs.",
                features: ["System Health", "Revenue Ops", "Global Settings"],
                gradient: "from-orange-500/20 to-red-600/20",
                iconColor: "text-orange-400",
              },
            ].map((item) => (
              <div key={item.role} className={`glass-card p-8 group hover:-translate-y-2 transition-all duration-500`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Users className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.role}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">{item.desc}</p>
                <div className="space-y-3">
                  {item.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
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
      <section className="py-40 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="relative glass-card p-16 lg:p-24 overflow-hidden rounded-[3rem] border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-emerald-600/20 animate-pulse" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Rocket className="w-8 h-8 text-[var(--brand-400)]" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
                Stop Learning.<br />
                Start <span className="gradient-text">Succeeding.</span>
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
                Join 500+ professionals who transformed their skillsets into revenue-generating businesses using the ATCMS OS.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/register">
                  <Button size="xl" className="rounded-2xl px-12 font-black shadow-2xl hover:scale-105 transition-transform bg-white text-indigo-900 hover:bg-white/90">
                    Get Access Now
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 py-3 glass rounded-2xl">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white/70">100% Secure & AI-Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-20 bg-black/40">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">ATCMS.</span>
              </div>
              <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
                The world's first AI-powered Training Management System that focuses on real-world business outcomes rather than just passive learning.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Platform</h4>
              <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-[10px]">Company</h4>
              <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
            <p className="text-[10px] sm:text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest">
              © {new Date().getFullYear()} ATCMS OS. Built for the ambitious.
            </p>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-white transition-colors">Discord</Link>
              <Link href="#" className="hover:text-white transition-colors">Github</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
