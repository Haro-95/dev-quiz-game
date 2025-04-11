"use client";

import { Code2, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="px-4 sm:px-6 flex h-16 items-center w-full justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
            <Code2 className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Dev Quiz Game</h1>
          <div className="hidden md:flex items-center ml-2 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            <Terminal className="mr-1 h-3 w-3" />
            <span>v1.0</span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
} 