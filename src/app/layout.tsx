import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIBA — Sherazi IT Business Academy",
  description: "Modernizing businesses through expert IT training and business development. Learn, execute, and scale with SIBA.",
  keywords: ["SIBA", "Sherazi IT Business Academy", "business development", "IT training", "business growth", "modernization"],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
