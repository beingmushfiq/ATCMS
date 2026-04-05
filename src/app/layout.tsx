import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ATCMS — AI-Powered Training Center",
  description: "Learn, execute, and scale real-world business skills with AI-powered guidance, expert mentorship, and structured certification.",
  keywords: ["training", "LMS", "business skills", "AI learning", "certification"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/logos/logo_atcms.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
