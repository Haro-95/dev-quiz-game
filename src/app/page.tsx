"use client";

import QuizGame from "@/components/quiz-game";
import { Code, Hash } from "lucide-react";
import ErrorBoundary from "@/components/error-boundary";

export default function Home() {
  return (
    <section className="container mx-auto h-[calc(100vh-4.1rem)] flex flex-col items-center justify-between py-4">
      {/* Top content */}
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col items-center text-center gap-2 mb-4">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-base font-medium text-primary border border-primary/20">
            <Code className="h-4 w-4" />
            <span>Test Your Skills</span>
            <Hash className="h-4 w-4" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight mb-3 dark:text-[#6cd58c] text-[#2a9d4e] drop-shadow-sm font-[var(--font-raleway)]">
            Programming Language <span className="font-bold">Quiz</span>
          </h1>
          <p className="text-base text-muted-foreground mb-1">
            Can you identify these programming languages from the code snippets?
          </p>
        </div>
        <div className="w-full max-w-2xl mx-auto flex justify-center">
          <ErrorBoundary>
            <QuizGame />
          </ErrorBoundary>
        </div>
      </div>
      
      {/* Footer at bottom */}
      <div className="text-center text-base text-muted-foreground">
        © {new Date().getFullYear()} Dev Quiz • Built with Next.js & Tailwind
      </div>
    </section>
  );
}
