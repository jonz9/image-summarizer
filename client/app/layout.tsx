import type React from "react";
import "./globals.css";
import { VT323 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

const vt323 = VT323({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Photographic Image Summarizer",
  description: "Upload your photo and get critized by an chatbot.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={vt323.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HeroUIProvider>
            <ToastProvider />
            {children}
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
