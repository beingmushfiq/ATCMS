import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
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
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";

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



const flowSteps = [
  { step: "01", title: "Orientation", desc: "Mindset & direction setting", icon: Target },
  { step: "02", title: "Core Learning", desc: "Concept mastery", icon: BookOpen },
  { step: "03", title: "Practical", desc: "Hands-on execution", icon: Zap },
  { step: "04", title: "Evaluation", desc: "Skill assessment", icon: BarChart3 },
  { step: "05", title: "Certification", desc: "Validated credentials", icon: Award },
  { step: "06", title: "Business", desc: "Launch & scale", icon: Rocket },
];

const mentors = [
  {
    name: "Rahat Sherazi",
    role: "Business Strategist",
    image: "https://i.pravatar.cc/150?u=rahat",
    bio: "Specializing in modernizing traditional businesses through elite IT integration.",
  },
  {
    name: "Sarah Ahmed",
    role: "Marketing Architect",
    image: "https://i.pravatar.cc/150?u=sarah",
    bio: "Helping brands scale to 7-figures using data-driven growth strategies.",
  },
  {
    name: "Tanvir Hossain",
    role: "System Engineer",
    image: "https://i.pravatar.cc/150?u=tanvir",
    bio: "Expert in automation and cloud infrastructure for scalable business OS.",
  },
  {
    name: "Mehedi Hasan",
    role: "Product Mentor",
    image: "https://i.pravatar.cc/150?u=mehedi",
    bio: "Bridging the gap between creative vision and practical market execution.",
  },
];

export default async function HomePage() {
  const featuredCourses = await prisma.course.findMany({
    where: { published: true },
    take: 3,
    include: {
      trainer: { select: { name: true } },
      category: { select: { name: true } },
      _count: { select: { enrollments: true, modules: true } },
    },
    orderBy: { enrollments: { _count: "desc" } },
  });
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      <div className="mesh-bg" />
      <div className="grid-pattern fixed inset-0 opacity-20 pointer-events-none" />

      {/* ─── ANNOUNCEMENT BAR ────────────────────────────────────── */}
      <div className="relative z-[60] bg-gradient-to-r from-[var(--brand-600)] to-[var(--accent-600)] py-2 px-4 shadow-lg overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest animate-reveal">
          <Zap className="w-3 h-3 animate-pulse" />
          <span>Join the AI Revolution in Training. 500+ Students Already Scaling.</span>
          <ArrowRight className="w-3 h-3" />
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      </div>

      {/* ─── NAVBAR ─────────────────────────────────────────── */}
      <nav className="fixed top-8 inset-x-4 sm:inset-x-8 lg:inset-x-12 z-50 h-16 sm:h-20 flex items-center px-6 lg:px-12 glass rounded-3xl sm:rounded-[2rem] shadow-2xl">
        <Logo className="sm:scale-110" />

        <div className="hidden lg:flex items-center gap-10 ml-16">
          {[
            { label: "Platform", href: "#features" },
            { label: "Learning Engine", href: "#how-it-works" },
            { label: "Courses", href: "#courses" },
            { label: "Mentors", href: "#mentors" },
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
          <ThemeToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" className="font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-2xl px-6 sm:px-8 font-bold bg-[var(--brand-600)] hover:bg-[var(--brand-700)] text-white shadow-lg transition-all">
              Join Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* ─── HERO SECTION ───────────────────────────────────── */}
      <section className="relative min-h-[90vh] pt-16 lg:pt-24 pb-20 flex flex-col items-center">
        <div className="hero-spotlight" />
        
        {/* Floating Orbs for depth */}
        <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] animate-float-slow delay-500" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="text-left animate-slide-in-left">
            {/* Box 1: Brand Name */}
            <div className="mb-6">
              <span className="text-xs font-black tracking-[0.5em] text-[var(--brand-400)] uppercase block mb-2">Sherazi IT Business Academy</span>
              <div className="h-1 w-12 bg-gradient-to-r from-[var(--brand-500)] to-transparent" />
            </div>

            {/* Sliding Clients Marquee */}
            <div className="relative overflow-hidden w-full mb-2">
              <div className="animate-marquee whitespace-nowrap flex gap-12 items-center py-2">
                {['TECHCORE', 'GEN-Z LABS', 'NEXUS ACADEMY', 'SKYLINE BIZ', 'VISIONARY CO.'].map((company, i) => (
                  <span key={i} className="text-[10px] font-black tracking-[0.3em] text-[var(--text-muted)]">{company}</span>
                ))}
                {/* Duplicate for seamless loop */}
                {['TECHCORE', 'GEN-Z LABS', 'NEXUS ACADEMY', 'SKYLINE BIZ', 'VISIONARY CO.'].map((company, j) => (
                  <span key={`dup-${j}`} className="text-[10px] font-black tracking-[0.3em] text-[var(--text-muted)]">{company}</span>
                ))}
              </div>
            </div>
            <p className="text-[8px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-60 mb-8 ml-1 font-mono flex items-center gap-2">
              <Shield className="w-2 h-2" />
              Industry partners certified by SIBA
            </p>

            {/* Box 2: Purpose & Tagline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-8">
              <span className="text-[var(--text-primary)]">Modernizing</span><br />
              <span className="gradient-text">Business OS.</span>
            </h1>

            <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-12 max-w-lg">
              We specialize in <strong className="text-[var(--text-primary)]">Business Development</strong> and <strong className="text-[var(--text-primary)]">Strategic Growth</strong>. SIBA is the world&apos;s first Academy built to modernize every type of business through elite IT integration and scalable systems.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="xl" className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[var(--brand-600)] to-[var(--brand-400)] hover:scale-105 transition-transform duration-300 px-10 text-white">
                  Join the Academy
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex -space-x-3 items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] overflow-hidden bg-[var(--bg-secondary)] relative">
                    <Image 
                      src={`https://i.pravatar.cc/100?u=${i+10}`} 
                      fill 
                      alt="User" 
                      sizes="40px"
                    />
                  </div>
                ))}
                <div className="pl-6 text-sm text-[var(--text-muted)] font-medium">
                  <span className="text-[var(--text-primary)] font-bold tracking-wider">500+ Experts</span> Scaling.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Video/Mockup Space */}
          <div className="relative animate-slide-in-right delay-200">
            <div className="relative z-20 group">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--brand-500)]/20 to-[var(--accent-500)]/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative glass-card border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] aspect-video">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/u31qwQUeGuM" 
                  title="SIBA Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {/* Floating UI indicators overlaying video slightly */}
                <div className="absolute top-4 right-4 p-3 glass rounded-xl shadow-2xl animate-float-slow pointer-events-none">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent-500)]/20 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-[var(--accent-400)]" />
                    </div>
                    <div>
                      <p className="text-[8px] text-[var(--text-primary)]/50 uppercase font-black tracking-tighter leading-none">Global Impact</p>
                      <p className="text-[10px] font-bold text-[var(--text-primary)]">+84% Conversion</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background elements for the video section */}
            <div className="absolute -z-10 top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>


      {/* ─── FEATURES ───────────────────────────────────────── */}
      <section id="features" className="py-10 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 font-mono">
              <Shield className="w-4 h-4" />
              <span>Platform Capabilities</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Built for <span className="gradient-text">Unstoppable</span> Growth
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              We&apos;ve engineered every feature to remove friction from your learning journey and accelerate your business execution.
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
      <section id="how-it-works" className="py-10 md:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--brand-900)]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24 relative z-10 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6 font-mono">
              <Zap className="w-4 h-4" />
              <span>The Flow Engine</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Mastery is a <span className="gradient-text">Sequence.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Our 6-step propulsion system ensures you don&apos;t just &quot;learn&quot; — you master, execute, and scale.
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
      <section className="py-10 md:py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-6">
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
                <h3 className="text-xl font-black text-[var(--text-primary)] mb-3 tracking-tight">{item.role}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">{item.desc}</p>
                <div className="space-y-3">
                  {item.features.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-xs font-medium text-[var(--text-muted)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-500)] opacity-40" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─────────────────────────────────── */}
      <section id="courses" className="py-10 md:py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-400 mb-6 font-mono">
                <BookOpen className="w-4 h-4" />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-6">
                Featured <span className="gradient-text">Courses.</span>
              </h2>
            </div>
            <Link href="/courses">
              <Button variant="ghost" className="group text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]">
                Explore Full Catalog <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.length > 0 ? featuredCourses.map((course) => (
              <div key={course.id} className="glass-card flex flex-col group hover:-translate-y-2 transition-all duration-500">
                <div className="h-48 relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <BookOpen className="w-20 h-20 text-[var(--text-primary)]" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[var(--bg-primary)]/40 backdrop-blur-md border border-[var(--border-secondary)] text-[10px] font-bold text-[var(--text-primary)] uppercase tracking-widest">
                      {course.category?.name || "General"}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-400)] transition-colors">{course.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-6 flex-1">{course.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-[var(--border-secondary)]">
                    <div className="flex items-center gap-3">
                      <div className="text-xs">
                        <p className="text-[var(--text-muted)] uppercase tracking-tighter text-[8px] font-black">Trainer</p>
                        <p className="text-[var(--text-primary)] font-bold">{course.trainer.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[var(--text-primary)]/40 uppercase tracking-tighter text-[8px] font-black">Investment</p>
                      <p className="text-lg font-black text-[var(--text-primary)]">{course.price > 0 ? formatCurrency(course.price) : "Free"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              [1, 2, 3].map((n) => (
                <div key={n} className="glass-card h-80 animate-pulse bg-[var(--bg-secondary)]" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── OUR MENTORS ─────────────────────────────────────── */}
      <section id="mentors" className="py-10 md:py-16 relative overflow-hidden">
        <div className="hero-spotlight opacity-50" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-black uppercase tracking-widest text-purple-400 mb-6 font-mono">
              <Users className="w-4 h-4" />
              <span>Expert Guidance</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              Learn from the <span className="gradient-text">Elite.</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Direct access to industry professionals who have already scaled what you&apos;re building.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentors.map((mentor, i) => (
              <div key={i} className="glass-card p-6 text-center group hover:-translate-y-2 transition-all duration-500">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border-secondary)]">
                    <Image 
                      src={mentor.image} 
                      fill 
                      alt={mentor.name} 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, 96px"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{mentor.name}</h3>
                <p className="text-xs text-[var(--brand-400)] font-black uppercase tracking-widest mb-4">{mentor.role}</p>
                <div className="h-px w-8 border-b border-[var(--border-secondary)] mx-auto mb-4" />
                <p className="text-[10px] text-[var(--text-muted)] leading-relaxed italic line-clamp-3">&quot;{mentor.bio}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-10 md:py-24 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <div className="relative glass-card p-16 lg:p-24 overflow-hidden rounded-[3rem] border-white/10 shadow-[0_0_100px_rgba(99,102,241,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-emerald-600/20 animate-pulse" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <Rocket className="w-8 h-8 text-[var(--brand-400)]" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-8 tracking-tighter leading-tight">
                Stop Learning.<br />
                Start <span className="gradient-text">Succeeding.</span>
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
                Join 500+ professionals who transformed their businesses and modernized their operations using the SIBA OS.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/register">
                  <Button size="xl" className="rounded-2xl px-12 font-black shadow-2xl hover:scale-105 transition-transform bg-white text-indigo-900 hover:bg-white/90">
                    Get Access Now
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 py-3 glass rounded-2xl">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-[var(--text-primary)]/70">100% Secure & AI-Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border-secondary)] py-12 md:py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Logo className="mb-6 scale-125 origin-left" />
              <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
                The world&apos;s first AI-powered Training Management System that focuses on real-world business outcomes rather than just passive learning.
              </p>
            </div>
            <div>
              <h4 className="text-[var(--text-primary)] font-bold mb-6 uppercase tracking-widest text-[10px]">Platform</h4>
              <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                <li><Link href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-[var(--text-primary)] transition-colors">How it Works</Link></li>
                <li><Link href="/courses" className="hover:text-[var(--text-primary)] transition-colors">Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[var(--text-primary)] font-bold mb-6 uppercase tracking-widest text-[10px]">Company</h4>
              <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
            <p className="text-[10px] sm:text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest" suppressHydrationWarning>
              © {new Date().getFullYear()} SIBA (Sherazi IT Business Academy). All Rights Reserved.
            </p>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)]/30">
              <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Discord</Link>
              <Link href="#" className="hover:text-[var(--text-primary)] transition-colors">Github</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
