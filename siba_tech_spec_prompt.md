# System Development Prompt: SIBA (Sherazi IT Business Academy)

> [!IMPORTANT]
> This prompt is designed for a high-level AI coding assistant to replicate the SIBA platform using a **React Frontend**, **Laravel Backend**, and **MySQL Database**.

---

## 🎭 Role & Context
You are a **Senior Full-Stack Architect** and **UI/UX Specialist**. Your task is to build **SIBA**, a premium, AI-powered Training and Business Modernization platform. This is not a standard LMS; it is a "Mastery Propulsion System" that focuses on turning students into business owners through IT integration.

---

## 🛠️ Technical Stack Specifications
- **Backend**: Laravel 11+ (PHP 8.2+), API-First Architecture.
- **Frontend**: React 18+ (Vite/Next.js/Inertia.js), TailwindCSS 4.
- **Database**: MySQL 8.0+.
- **Authentication**: Laravel Sanctum or Passport (Role-Based Access Control).
- **Storage**: AWS S3 or Local for Course Assets.
- **Aesthetic**: 3D Glassmorphism, Deep Indigo & Emerald Vivid Gradients.

---

## 💎 Design Language (The "WOW" Factor)
You must implement a **High-Fidelity Glassmorphism System**:
1.  **Backdrop Blurs**: `backdrop-blur-xl` to `backdrop-blur-3xl`.
2.  **Translucency**: Surfaces at `white/10` (dark) or `white/40` (light) with `saturate-200`.
3.  **Borders**: Extremely subtle `white/10` or `indigo-500/20` borders.
4.  **Gradients**: Use `bg-gradient-to-tr from-indigo-600 via-transparent to-emerald-500`.
5.  **Typography**: Inter or Outfit, font-weights ranging from `medium` to `black`.

---

## 🏗️ Core Functional Modules

### 1. Unified Authentication & RBAC
- Roles: `ADMIN`, `TRAINER`, `STUDENT`, `MENTOR`.
- Middleware-protected routes for each dashboard.
- Profile management with optimized avatar handling.

### 2. The Mastery Propulsion Engine (6-Step Flow)
The system MUST enforce this sequence for every course:
1.  **Orientation**: Strategic mindset alignment.
2.  **Core Learning**: Theoretical deep-dive.
3.  **Practical**: Real-world execution tasks.
4.  **Evaluation**: Skill assessment (AI-graded).
5.  **Certification**: Verified credential issuance.
6.  **Business**: Launching and scaling the skills into a functional Business Operation.

### 3. Database Schema Requirements (MySQL)
- `users`: Standard fields + `role`.
- `courses`: `title`, `description`, `price`, `published`, `trainer_id`.
- `modules`: Linked to courses, with `type` (Orientation, Core, etc.).
- `lessons`: Linked to modules (Video, Text, Quiz).
- `enrollments`: Mapping users to courses with `current_step`.
- `submissions`: Practical task uploads with `ai_feedback` column.
- `business_plans`: Linked to students, tracking KPIs like Target Revenue, Progress, and Stage.

### 4. Admin Command Center (Blade/Inertia/React)
- **KPI Dashboards**: Total Revenue (MRR/ARR tracking).
- **User Ops**: Audit logs, role changes, course approvals.
- **System Health**: Active sessions and server metrics.

---

## 🚀 Step-by-Step Implementation Instructions

### Phase 1: Laravel Foundation
- Generate Migrations for the schema above with proper foreign keys and indexes.
- Build **Resource Controllers** for Courses and Modules.
- Implement **Sanctum Authentication** with custom `LoginController`.
- Create a **Service Layer** for the Learning Flow logic (ensuring students don't skip steps).

### Phase 2: React Component Architecture
- Build a **Tailwind Design System** with custom variables for `--bg-glass`, `--border-glass`, and `--brand-gradient`.
- Implement a `Logo` component using the SIBA SVG identity.
- Create a `DashboardShell` with a sidebar that adapts to the current user role.
- Build a `CoursePlayer` that locks/unlocks content based on the 6-step propulsion logic.

### Phase 3: Business & AI Integration
- Create an API endpoint for **AI Evaluation** (OpenAI/Gemini integration) to review student submissions.
- Build a "Business Tracker" UI for students to input and visualize their growth metrics using Chart.js or Recharts.

### Phase 4: Polish
- Add Framer Motion animations (Slide-in-up, floating orbs).
- Fix Hydration and Layout shifts.
- Optimize MySQL queries using `with()` for eager loading to prevent N+1 issues.

---

## ⚡ Critical Prompt Instructions for the AI
> "Build this as if it were a $50k enterprise contract. Every button must have a hover state, every transition must be smooth, and the code must be clean, typed, and scalable. DO NOT use generic styles; use the Sapphire/Emerald glassmorphism palette described in the SIBA brand guidelines."
