import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import "./globals.css";
import "../styles/syntax-highlighter.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

// Optimize font loading 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Dev Quiz Game | Test Your Programming Knowledge",
  description: "Challenge yourself with our programming language quiz. Identify code snippets from different programming languages and test your developer skills.",
  authors: [
    {
      name: "Quiz Game Developer",
      url: "https://github.com/Haro-95/dev-quiz-game.git",
    }
  ],
  keywords: [
    "programming quiz", 
    "coding quiz", 
    "developer quiz", 
    "programming languages", 
    "code learning", 
    "programming challenge"
  ],
  creator: "Quiz Game Developer",
  publisher: "Dev Quiz Game",
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} bg-background font-sans antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
