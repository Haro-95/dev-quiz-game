"use client"

import * as React from "react"
import { useEffect, useState, useCallback, memo } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export const ThemeToggle = memo(function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const toggleTheme = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true)
    
    // Use requestAnimationFrame for smoother animation timing
    requestAnimationFrame(() => {
      const newTheme = resolvedTheme === "dark" ? "light" : "dark"
      setTheme(newTheme)
      
      // Reset animation state after transition completes
      const animationTimeout = setTimeout(() => setIsAnimating(false), 700)
      return () => clearTimeout(animationTimeout)
    })
  }, [isAnimating, resolvedTheme, setTheme])

  // Handle keyboard events for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTheme();
    }
  }, [toggleTheme]);

  // Return a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full w-10 h-10 bg-muted/30 relative overflow-hidden"
        aria-label="Loading theme toggle"
        disabled
      >
        <span className="sr-only">Loading theme toggle</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      disabled={isAnimating}
      className="rounded-full w-10 h-10 bg-muted/30 hover:bg-muted/60 relative overflow-hidden transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      aria-live="polite"
      role="switch"
      tabIndex={0}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>
      <div className="w-full h-full flex items-center justify-center">
        <Sun 
          aria-hidden="true"
          className={`h-[1.3rem] w-[1.3rem] absolute transition-transform duration-500 text-amber-600
            ${isDark ? 'rotate-[90deg] scale-0' : 'rotate-0 scale-100'}`}
        />
        <Moon 
          aria-hidden="true"
          className={`h-[1.3rem] w-[1.3rem] absolute transition-transform duration-500 text-sky-300
            ${isDark ? 'rotate-0 scale-100' : 'rotate-[-90deg] scale-0'}`}
        />
      </div>
    </Button>
  )
}) 