# ATCMS — AI-Powered Training Center Management System

![Banner](/public/logos/logo_atcms.png)

## 🚀 Overview

**ATCMS** is a state-of-the-art, high-fidelity Learning Management System (LMS) designed for the modern era. It moves beyond passive video watching by integrating **AI-guided adaptive learning paths**, hands-on **business execution tracking**, and a structured **6-step mastery flow**.

Built with a premium 3D glassmorphism aesthetic, ATCMS provides a seamless powerhouse experience for Students, Trainers, Mentors, and Administrators.

---

## ✨ Key Features

### 🧠 AI-Powered Learning Engine
*   **Adaptive Paths**: The system detects student weaknesses and adjusts course material pacing.
*   **Skill Validation**: Automatic grading and feedback for practical assignments using AI evaluation.
*   **Guided Execution**: Real-time AI coaching for building business plans and executing strategies.

### 📊 Comprehensive Dashboards
*   **Student Hub**: Track progress, earn certificates, and manage your business growth KPIs.
*   **Trainer Portal**: Build complex courses, manage student rosters, and review practical submissions.
*   **Mentor Console**: Schedule 1-on-1 sessions and provide targeted feedback to assigned cohorts.
*   **Admin Command Center**: Global analytics, revenue tracking (MRR), user management, and platform settings.

### 🎨 Premium Design System
*   **Glassmorphism UI**: High-end visual aesthetic with blurred surfaces and vibrant gradients.
*   **Fully Responsive**: Perfectly tuned for mobile, tablet, and desktop viewing.
*   **Dynamic Animations**: Smooth transitions and micro-interactions for a premium feel.

---

## 🛤️ The Learning Flow Engine

ATCMS enforces a strict, scientifically-backed 6-step learning sequence to ensure actual mastery:

1.  **Orientation**: Mindset setting and direction alignment.
2.  **Core Learning**: Deep-dive into theoretical concepts and mastery.
3.  **Practical**: Hands-on execution with real-world scenarios.
4.  **Evaluation**: Rigorous testing of skills and knowledge.
5.  **Certification**: Issuance of validated, verifiable credentials.
6.  **Business**: Launching and scaling the skills into actual revenue.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, Turbopack)
*   **Database**: [Prisma 7+](https://www.prisma.io/) with PostgreSQL/MySQL support
*   **Styling**: [TailwindCSS 4](https://tailwindcss.com/) & Vanilla CSS for custom design tokens
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Authentication**: Custom secure Auth system with role-based access control (RBAC)

---

## 🚦 Getting Started

### Prerequisites
*   Node.js 20+
*   NPM or PNPM

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/beingmushfiq/atcms.git
    cd atcms
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root:
    ```env
    DATABASE_URL="your_database_url"
    NEXTAUTH_SECRET="your_secret"
    ```

4.  **Database Migration & Seeding**
    ```bash
    npx prisma generate
    npx prisma db push
    npm run seed # If you have a seeding script
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

---

## 👥 User Roles & Access

| Role | Primary Purpose | Key Tools |
| :--- | :--- | :--- |
| **Student** | Mastery & Execution | Learning Hub, Business Tracker, Certification Vault |
| **Trainer** | Knowledge Delivery | Course Creator, Submission Reviewer, Student Analytics |
| **Mentor** | Guidance & Support | Session Scheduler, Feedback Loop, Cohort Management |
| **Admin** | Platform Governance | Revenue Metrics, User Management, System Settings |

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the ATCMS Team
</p>
