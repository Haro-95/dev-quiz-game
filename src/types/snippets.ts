export type Difficulty = "easy" | "medium" | "hard";

export interface CodeSnippet {
  id: string;
  code: string;
  difficulty: Difficulty;
  tags: string[];
  description?: string;
}

export interface LanguageSnippets {
  language: string;
  snippets: CodeSnippet[];
} 