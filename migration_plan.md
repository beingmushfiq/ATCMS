# ATCMS Migration Plan: Next.js to React-Laravel Stack

This document outlines the strategic plan to migrate the **AI-Powered Training Center Management System (ATCMS)** from its current Next.js/Prisma/SQLite architecture to a decoupled **React (Vite) + Laravel + MySQL** architecture.

## 🏗️ Architectural Overview

| Component | Current Stack | New Stack | Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js (App Router) | React (Vite) | Faster HMR, pure client-side control. |
| **Backend** | Server Actions / API Routes | Laravel (PHP 8.2+) | Mature ecosystem, robust auth, and Eloquent ORM. |
| **Database** | SQLite (Prisma) | MySQL | Production-stable, scalable relational storage. |
| **Auth** | Next-Auth | Laravel Sanctum | Native SPA/Token authentication. |
| **Routing** | File-system based | React Router v6+ | Centralized, high-performance client routing. |

---

## 📅 Roadmap & Task List

### Phase 1: Backend Foundation (Laravel)
*Estimated Time: 3-4 Days*

- [ ] **1.1 Project Setup**
    - [ ] Initialize Laravel project: `laravel new api`.
    - [ ] Configure `.env` with MySQL credentials.
    - [ ] Install **Laravel Sanctum**.
- [ ] **1.2 Database Schema Migration**
    - [ ] Create migrations for `users`, `roles`, and `permissions`.
    - [ ] Create migrations for `categories`, `courses`, `modules`, and `lessons`.
    - [ ] Create migrations for `enrollments` and `lesson_progress`.
    - [ ] Create migrations for `business_plans` and `business_entries`.
- [ ] **1.3 Eloquent Model Design**
    - [ ] Define relationships (`hasMany`, `belongsTo`) between Courses/Modules/Lessons.
    - [ ] Set up user-to-course relations for training tracking.
- [ ] **1.4 API Infrastructure**
    - [ ] Implement `AuthController` (Login, Register, Logout).
    - [ ] Set up Middleware for role-based access control (RBAC).
    - [ ] Build initial API Resources for JSON serialization.

### Phase 2: Frontend Porting (Vite + React)
*Estimated Time: 3-4 Days*

- [ ] **2.1 Project Scaffolding**
    - [ ] Create Vite project: `npm create vite@latest frontend -- --template react-ts`.
    - [ ] Setup Tailwind CSS v4 and import existing configuration.
- [ ] **2.2 Component Migration**
    - [ ] Copy `src/components/ui` directory (keep Shadcn/Radix components).
    - [ ] Port `src/lib/utils.ts` and UI constants.
- [ ] **2.3 Client-Side Routing**
    - [ ] Set up `react-router-dom` structure.
    - [ ] Port landing pages (`/`, `/courses`).
    - [ ] Port dashboard layouts (Student, Trainer, Admin).
- [ ] **2.4 State & Data Management**
    - [ ] Setup **Axios** with base URL and interceptors for Auth.
    - [ ] Implement **TanStack Query** (React Query) for data fetching hooks.

### Phase 3: Feature Integration
*Estimated Time: 3-4 Days*

- [ ] **3.1 Authentication Flow**
    - [ ] Integrate React forms with Laravel Sanctum's `/login` endpoint.
    - [ ] Create `useAuth` hook in React for session persistence.
- [ ] **3.2 Learning Engine Port**
    - [ ] Migrate "Complete Lesson" logic from Server Actions to API calls.
    - [ ] Implement Video Player and Progress tracking hooks.
- [ ] **3.3 Business Tracking Engine**
    - [ ] Migrate Business Plan management forms (`add-entry-form.tsx`).
    - [ ] Connect dashboard stat cards to Laravel statistics API.

---

## 🚨 Critical Tool Mapping (Transition Guide)

> [!IMPORTANT]
> Use this table during development to identify the correct replacement for Next.js-specific features.

| Next.js Feature | Vite/React Equivalent | Laravel Equivalent |
| :--- | :--- | :--- |
| `next/link` | `react-router-dom` `<Link>` | N/A |
| `next/navigation` | `useNavigate`, `useLocation` | N/A |
| `next/image` | standard `<img>` + Vite assets | N/A |
| Prisma Schema | N/A | Laravel Migrations |
| Prisma Client | N/A | Eloquent Models |
| Server Actions | Axios Client (`POST`) | Controller Method |
| API Routes | N/A | `routes/api.php` |
| `page.tsx` | React Component | Blade views (optional) |

---

## 🛠️ Data Migration Strategy

To move your existing development data from SQLite to MySQL:

1.  **Export:** Run a script to read `dev.db` and output JSON files for each table.
2.  **Clean:** Ensure CUID string IDs are mapped correctly to MySQL `CHAR(30)` or equivalent.
3.  **Import:** Use a Laravel Seeder to iterate through JSON files and create records via Eloquent.

---

## ✅ Success Criteria
- [ ] All UI styles and animations are identical to the original version.
- [ ] User can login/logout and session persists on refresh.
- [ ] Course progress updates in real-time.
- [ ] All dashboards (Admin/Trainer/Student) load data from the Laravel API.
