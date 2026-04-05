import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL?.replace("file:", "") || "./dev.db";
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url }),
});

async function main() {
  console.log("🌱 Seeding database...\n");

  // Clean existing data
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.reply.deleteMany();
  await prisma.discussion.deleteMany();
  await prisma.businessEntry.deleteMany();
  await prisma.businessPlan.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.task.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.mentorAssignment.deleteMany();
  await prisma.liveSession.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 12);

  // ─── CREATE USERS ─────────────────────────────────────────
  console.log("👤 Creating users...");

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@atcms.com",
      password: hashedPassword,
      role: "ADMIN",
      bio: "Platform administrator",
      level: "EXPERT",
    },
  });

  const trainer1 = await prisma.user.create({
    data: {
      name: "Sarah Mitchell",
      email: "trainer@atcms.com",
      password: hashedPassword,
      role: "TRAINER",
      bio: "Digital marketing expert with 10+ years of experience",
      level: "EXPERT",
    },
  });

  const trainer2 = await prisma.user.create({
    data: {
      name: "James Rodriguez",
      email: "trainer2@atcms.com",
      password: hashedPassword,
      role: "TRAINER",
      bio: "Business strategy consultant and educator",
      level: "EXPERT",
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "student@atcms.com",
      password: hashedPassword,
      role: "STUDENT",
      bio: "Aspiring entrepreneur looking to build a digital business",
      level: "BEGINNER",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Maria Garcia",
      email: "student2@atcms.com",
      password: hashedPassword,
      role: "STUDENT",
      bio: "Marketing graduate transitioning to digital marketing",
      level: "INTERMEDIATE",
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: "David Chen",
      email: "student3@atcms.com",
      password: hashedPassword,
      role: "STUDENT",
      bio: "Small business owner learning to scale online",
      level: "BEGINNER",
    },
  });

  const mentor = await prisma.user.create({
    data: {
      name: "Dr. Emily Parker",
      email: "mentor@atcms.com",
      password: hashedPassword,
      role: "MENTOR",
      bio: "Business coach and former Fortune 500 executive",
      level: "EXPERT",
    },
  });

  console.log(`   ✅ Created ${7} users\n`);

  // ─── CREATE CATEGORIES ────────────────────────────────────
  console.log("📁 Creating categories...");

  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Digital Marketing", icon: "Megaphone", color: "#6366f1" } }),
    prisma.category.create({ data: { name: "Business Strategy", icon: "Target", color: "#10b981" } }),
    prisma.category.create({ data: { name: "E-Commerce", icon: "ShoppingBag", color: "#f59e0b" } }),
    prisma.category.create({ data: { name: "Leadership", icon: "Crown", color: "#ec4899" } }),
    prisma.category.create({ data: { name: "Finance", icon: "DollarSign", color: "#3b82f6" } }),
    prisma.category.create({ data: { name: "Technology", icon: "Cpu", color: "#8b5cf6" } }),
  ]);

  console.log(`   ✅ Created ${categories.length} categories\n`);

  // ─── CREATE COURSES ───────────────────────────────────────
  console.log("📚 Creating courses...");

  const course1 = await prisma.course.create({
    data: {
      title: "Digital Marketing Mastery",
      slug: "digital-marketing-mastery",
      description: "Master the complete digital marketing ecosystem — from SEO and content marketing to paid advertising and analytics. Build real campaigns and drive measurable results.",
      price: 99.99,
      level: "BEGINNER",
      published: true,
      featured: true,
      trainerId: trainer1.id,
      categoryId: categories[0].id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Business Strategy & Execution",
      slug: "business-strategy-execution",
      description: "Learn to develop winning business strategies and execute them with precision. From market analysis to competitive positioning, this course covers it all.",
      price: 149.99,
      level: "INTERMEDIATE",
      published: true,
      trainerId: trainer2.id,
      categoryId: categories[1].id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: "E-Commerce Empire",
      slug: "ecommerce-empire",
      description: "Build and scale a profitable e-commerce business from scratch. Product sourcing, store setup, marketing funnels, and scaling strategies.",
      price: 199.99,
      level: "BEGINNER",
      published: true,
      featured: true,
      trainerId: trainer1.id,
      categoryId: categories[2].id,
    },
  });

  const course4 = await prisma.course.create({
    data: {
      title: "Leadership & Team Building",
      slug: "leadership-team-building",
      description: "Develop essential leadership skills to build, manage, and inspire high-performing teams. Real-world scenarios and practical exercises included.",
      price: 79.99,
      level: "ADVANCED",
      published: true,
      trainerId: trainer2.id,
      categoryId: categories[3].id,
    },
  });

  const course5 = await prisma.course.create({
    data: {
      title: "Financial Intelligence for Entrepreneurs",
      slug: "financial-intelligence-entrepreneurs",
      description: "Understand financial statements, cash flow management, pricing strategies, and investment fundamentals for growing your business.",
      price: 0,
      level: "BEGINNER",
      published: true,
      trainerId: trainer2.id,
      categoryId: categories[4].id,
    },
  });

  const course6 = await prisma.course.create({
    data: {
      title: "AI & Automation for Business",
      slug: "ai-automation-business",
      description: "Leverage artificial intelligence and automation tools to streamline operations, reduce costs, and gain competitive advantage.",
      price: 129.99,
      level: "INTERMEDIATE",
      published: false,
      trainerId: trainer1.id,
      categoryId: categories[5].id,
    },
  });

  console.log(`   ✅ Created 6 courses\n`);

  // ─── CREATE MODULES ───────────────────────────────────────
  console.log("📦 Creating modules & lessons...");

  // Course 1: Digital Marketing Mastery — Full module flow
  const modules1 = await Promise.all([
    prisma.module.create({
      data: {
        title: "Welcome & Orientation",
        description: "Understand the digital marketing landscape and set your learning goals.",
        type: "ORIENTATION",
        order: 1,
        courseId: course1.id,
      },
    }),
    prisma.module.create({
      data: {
        title: "SEO Fundamentals",
        description: "Master search engine optimization from keyword research to on-page and off-page SEO.",
        type: "CORE",
        order: 2,
        courseId: course1.id,
      },
    }),
    prisma.module.create({
      data: {
        title: "Content Marketing Strategy",
        description: "Learn to create, distribute, and measure content that drives business results.",
        type: "CORE",
        order: 3,
        courseId: course1.id,
      },
    }),
    prisma.module.create({
      data: {
        title: "Paid Advertising",
        description: "Master Google Ads, Facebook Ads, and other paid channels for rapid growth.",
        type: "CORE",
        order: 4,
        courseId: course1.id,
      },
    }),
    prisma.module.create({
      data: {
        title: "Live Campaign Project",
        description: "Build and launch a real marketing campaign with measurable KPIs.",
        type: "PRACTICAL",
        order: 5,
        courseId: course1.id,
      },
    }),
    prisma.module.create({
      data: {
        title: "Final Assessment",
        description: "Demonstrate your mastery through real-world scenario evaluations.",
        type: "EVALUATION",
        order: 6,
        courseId: course1.id,
      },
    }),
    prisma.module.create({
      data: {
        title: "Digital Marketing Certification",
        description: "Complete your final project and earn your certification.",
        type: "CERTIFICATION",
        order: 7,
        courseId: course1.id,
      },
    }),
  ]);

  // Add lessons to Module 1 (Orientation)
  await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Welcome to Digital Marketing",
        content: "<h2>Welcome!</h2><p>In this course, you will master the complete digital marketing ecosystem. We'll cover SEO, content marketing, paid advertising, analytics, and more.</p><p>By the end, you'll be able to plan, execute, and optimize digital marketing campaigns that drive real business results.</p>",
        order: 1,
        duration: 10,
        moduleId: modules1[0].id,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "The Digital Marketing Landscape",
        content: "<h2>Understanding the Ecosystem</h2><p>Digital marketing encompasses all marketing efforts that use the internet or electronic devices. It includes:</p><ul><li>Search Engine Optimization (SEO)</li><li>Content Marketing</li><li>Social Media Marketing</li><li>Pay-Per-Click (PPC)</li><li>Email Marketing</li><li>Affiliate Marketing</li></ul>",
        order: 2,
        duration: 15,
        moduleId: modules1[0].id,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Setting Your Learning Goals",
        content: "<h2>Goal Setting Framework</h2><p>Before diving in, let's establish clear objectives for your learning journey. Use the SMART framework:</p><ul><li><strong>Specific</strong> — What exactly do you want to achieve?</li><li><strong>Measurable</strong> — How will you track progress?</li><li><strong>Achievable</strong> — Is this realistic?</li><li><strong>Relevant</strong> — Does it align with your business goals?</li><li><strong>Time-bound</strong> — What's your deadline?</li></ul>",
        order: 3,
        duration: 12,
        moduleId: modules1[0].id,
      },
    }),
  ]);

  // Add lessons to Module 2 (SEO)
  await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Introduction to SEO",
        content: "<h2>What is SEO?</h2><p>SEO is the practice of optimizing your website to rank higher in search engine results pages (SERPs). It involves understanding how search engines work and what people search for.</p>",
        order: 1,
        duration: 20,
        moduleId: modules1[1].id,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Keyword Research Mastery",
        content: "<h2>Finding the Right Keywords</h2><p>Keyword research is the foundation of SEO. Learn to find high-value, low-competition keywords that drive targeted traffic to your website.</p>",
        order: 2,
        duration: 25,
        moduleId: modules1[1].id,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "On-Page SEO Techniques",
        content: "<h2>Optimizing Your Content</h2><p>On-page SEO includes optimizing title tags, meta descriptions, header tags, images, internal linking, and content quality.</p>",
        order: 3,
        duration: 30,
        moduleId: modules1[1].id,
      },
    }),
  ]);

  // Create modules for other courses (simplified)
  for (const course of [course2, course3, course4, course5]) {
    const moduleTypes = ["ORIENTATION", "CORE", "CORE", "PRACTICAL", "EVALUATION", "CERTIFICATION"];
    const moduleTitles = [
      "Getting Started",
      "Core Concepts",
      "Advanced Techniques",
      "Hands-On Project",
      "Assessment",
      "Certification",
    ];
    
    for (let j = 0; j < moduleTypes.length; j++) {
      const mod = await prisma.module.create({
        data: {
          title: moduleTitles[j],
          description: `${moduleTitles[j]} for ${course.title}`,
          type: moduleTypes[j],
          order: j + 1,
          courseId: course.id,
        },
      });

      // Add a lesson
      await prisma.lesson.create({
        data: {
          title: `Introduction to ${moduleTitles[j]}`,
          content: `<h2>${moduleTitles[j]}</h2><p>Welcome to this module. Here you'll learn the essential concepts and skills needed to progress through the course.</p>`,
          order: 1,
          duration: 15,
          moduleId: mod.id,
        },
      });
    }
  }

  console.log("   ✅ Created modules and lessons\n");

  // ─── CREATE ENROLLMENTS ───────────────────────────────────
  console.log("📝 Creating enrollments...");

  await Promise.all([
    prisma.enrollment.create({
      data: { userId: student1.id, courseId: course1.id, progress: 42.5 },
    }),
    prisma.enrollment.create({
      data: { userId: student1.id, courseId: course3.id, progress: 15.0 },
    }),
    prisma.enrollment.create({
      data: { userId: student2.id, courseId: course1.id, progress: 78.3 },
    }),
    prisma.enrollment.create({
      data: { userId: student2.id, courseId: course2.id, progress: 23.0 },
    }),
    prisma.enrollment.create({
      data: { userId: student3.id, courseId: course5.id, progress: 8.0 },
    }),
    prisma.enrollment.create({
      data: { userId: student3.id, courseId: course4.id, progress: 55.0 },
    }),
  ]);

  console.log("   ✅ Created 6 enrollments\n");

  // ─── CREATE MENTOR ASSIGNMENTS ────────────────────────────
  console.log("🤝 Creating mentor assignments...");

  await Promise.all([
    prisma.mentorAssignment.create({
      data: { mentorId: mentor.id, studentId: student1.id },
    }),
    prisma.mentorAssignment.create({
      data: { mentorId: mentor.id, studentId: student2.id },
    }),
  ]);

  console.log("   ✅ Created 2 mentor assignments\n");

  // ─── CREATE BUSINESS PLANS ────────────────────────────────
  console.log("💼 Creating business plans...");

  await prisma.businessPlan.create({
    data: {
      title: "Online Marketing Agency",
      description: "Full-service digital marketing agency targeting small businesses",
      stage: "PLAN",
      revenue: 0,
      userId: student1.id,
    },
  });

  await prisma.businessPlan.create({
    data: {
      title: "E-Commerce Store — Eco Products",
      description: "Sustainable & eco-friendly product e-commerce store",
      stage: "IDEA",
      revenue: 0,
      userId: student2.id,
    },
  });

  console.log("   ✅ Created 2 business plans\n");

  // ─── CREATE NOTIFICATIONS ────────────────────────────────
  console.log("🔔 Creating notifications...");

  await Promise.all([
    prisma.notification.create({
      data: {
        type: "SYSTEM",
        title: "Welcome to ATCMS!",
        message: "Your account has been set up. Start exploring courses and begin your learning journey.",
        userId: student1.id,
      },
    }),
    prisma.notification.create({
      data: {
        type: "ENROLLMENT",
        title: "New Student Enrolled",
        message: "Alex Johnson has enrolled in Digital Marketing Mastery.",
        userId: trainer1.id,
      },
    }),
    prisma.notification.create({
      data: {
        type: "REMINDER",
        title: "Continue Learning",
        message: "You're 42.5% through Digital Marketing Mastery. Keep going!",
        userId: student1.id,
      },
    }),
  ]);

  console.log("   ✅ Created 3 notifications\n");

  // ─── Done ──────────────────────────────────────────────────
  console.log("✨ Database seeded successfully!\n");
  console.log("📧 Demo Accounts:");
  console.log("   Admin:   admin@atcms.com / password123");
  console.log("   Trainer: trainer@atcms.com / password123");
  console.log("   Student: student@atcms.com / password123");
  console.log("   Mentor:  mentor@atcms.com / password123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
