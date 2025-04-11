"use client"

import React, { useState, memo, useMemo, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { HelpCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = memo(function CodeBlock({ code, language }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const [hasError, setHasError] = useState(false);

  // Map language names to syntax highlighter language identifiers
  const languageMap: Record<string, string> = {
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "Python": "python",
    "Java": "java",
    "C#": "csharp",
    "C++": "cpp",
    "PHP": "php",
    "Ruby": "ruby",
    "Swift": "swift",
    "Go": "go",
    "Rust": "rust",
    "Kotlin": "kotlin"
  };

  // Memoize processed code to prevent recalculation on re-renders
  const { syntaxLanguage, displayCode } = useMemo(() => {
    const syntaxLang = languageMap[language] || "text";
    
    // Process the code to remove excess empty lines and limit to 10 lines
    const codeLines = code.trim().split('\n');
    const nonEmptyLines = codeLines.filter(line => line.trim() !== '');
    const displayLines = nonEmptyLines.length > 10 ? nonEmptyLines.slice(0, 10) : nonEmptyLines;
    const displayCode = displayLines.join('\n') + (nonEmptyLines.length > 10 ? '\n// ...' : '');
    
    return { syntaxLanguage: syntaxLang, displayCode };
  }, [code, language]);

  // Memoize the syntax highlighter style based on theme
  const syntaxStyle = useMemo(() => 
    isDarkTheme ? vscDarkPlus : vs, 
    [isDarkTheme]
  );

  // Reset error state when inputs change
  useEffect(() => {
    setHasError(false);
  }, [code, language]);

  // Error boundary handler
  const handleError = () => {
    setHasError(true);
  };

  // Wrap syntax highlighter rendering in try/catch
  const renderHighlighter = () => {
    try {
      return (
        <SyntaxHighlighter
          language={syntaxLanguage}
          style={syntaxStyle}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            height: "100%", 
            fontSize: "1.05rem",
            lineHeight: 1.5,
            overflow: "hidden",
          }}
          showLineNumbers
          wrapLines
          lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
          codeTagProps={{ className: 'syntax-highlighter-code' }}
          PreTag="div"
        >
          {displayCode}
        </SyntaxHighlighter>
      );
    } catch (error) {
      // We'll handle the error by showing our error state
      setHasError(true);
      return null;
    }
  };

  return (
    <div className="animate-scaleIn w-full h-full overflow-hidden relative">
      <div className="w-full h-full overflow-hidden rounded-xl border shadow-md flex flex-col">
        <div className="flex items-center justify-between bg-muted p-2.5 border-b shrink-0">
          <div className="flex space-x-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full mr-1 flex items-center justify-center"
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                className="bg-card/90 backdrop-blur-sm border text-sm" 
                side="right"
                sideOffset={25}
              >
                Identify this programming language
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="overflow-hidden flex-1">
          {hasError ? (
            <div className="flex items-center justify-center h-full bg-destructive/10 p-4">
              <div className="flex flex-col items-center text-center gap-2">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="text-sm text-destructive font-medium">
                  Unable to display code. Please try refreshing.
                </p>
              </div>
            </div>
          ) : renderHighlighter()}
        </div>
      </div>
    </div>
  );
});

export default CodeBlock; 