export interface QuizQuestion {
  id: string;
  code: string;
  language: ProgrammingLanguage;
  options: ProgrammingLanguage[];
}

export interface QuizAnswer {
  questionId: string;
  selectedLanguage: ProgrammingLanguage;
  isCorrect: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  answers: QuizAnswer[];
}

export enum ProgrammingLanguage {
  JavaScript = "JavaScript",
  Python = "Python",
  Java = "Java",
  CSharp = "C#",
  CPlusPlus = "C++",
  PHP = "PHP",
  Ruby = "Ruby",
  Swift = "Swift",
  TypeScript = "TypeScript",
  Go = "Go",
  Rust = "Rust",
  Kotlin = "Kotlin"
} 