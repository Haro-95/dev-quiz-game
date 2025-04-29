import { ProgrammingLanguage, QuizQuestion } from "@/types/quiz";
import { CodeSnippet, LanguageSnippets } from "@/types/snippets";

// Import all snippet files
import javascriptSnippets from "@/data/snippets/javascript.json";
import pythonSnippets from "@/data/snippets/python.json";
import javaSnippets from "@/data/snippets/java.json";
import csharpSnippets from "@/data/snippets/csharp.json";
import cppSnippets from "@/data/snippets/cpp.json";
import phpSnippets from "@/data/snippets/php.json";
import rubySnippets from "@/data/snippets/ruby.json";
import swiftSnippets from "@/data/snippets/swift.json";
import typescriptSnippets from "@/data/snippets/typescript.json";
import goSnippets from "@/data/snippets/go.json";
import rustSnippets from "@/data/snippets/rust.json";
import kotlinSnippets from "@/data/snippets/kotlin.json";

// Map to store all snippets by language
const snippetsByLanguage = new Map<ProgrammingLanguage, CodeSnippet[]>([
  [ProgrammingLanguage.JavaScript, javascriptSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Python, pythonSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Java, javaSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.CSharp, csharpSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.CPlusPlus, cppSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.PHP, phpSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Ruby, rubySnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Swift, swiftSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.TypeScript, typescriptSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Go, goSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Rust, rustSnippets.snippets as CodeSnippet[]],
  [ProgrammingLanguage.Kotlin, kotlinSnippets.snippets as CodeSnippet[]]
]);

// Get all available languages
export const getAvailableLanguages = (): ProgrammingLanguage[] => {
  return Array.from(snippetsByLanguage.keys());
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get random languages for options (including the correct one)
const getRandomLanguageOptions = (
  correctLanguage: ProgrammingLanguage,
  count: number = 4
): ProgrammingLanguage[] => {
  const languages = getAvailableLanguages()
    .filter(lang => lang !== correctLanguage);
  
  return shuffleArray([correctLanguage, ...shuffleArray(languages).slice(0, count - 1)]);
};

// Convert a code snippet to a quiz question
const convertSnippetToQuestion = (
  snippet: CodeSnippet,
  language: ProgrammingLanguage
): QuizQuestion => {
  return {
    id: snippet.id,
    code: snippet.code,
    language: language,
    options: getRandomLanguageOptions(language)
  };
};

// Get random questions from all available snippets
export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  // Create an array of all available questions
  const allQuestions: Array<{ snippet: CodeSnippet; language: ProgrammingLanguage }> = [];
  
  // Get a random selection of snippets from each language
  snippetsByLanguage.forEach((snippets, language) => {
    // Shuffle the snippets for this language
    const shuffledSnippets = shuffleArray(snippets);
    // Take 1-2 snippets from each language to ensure variety
    const numSnippets = Math.min(Math.floor(Math.random() * 2) + 1, snippets.length);
    shuffledSnippets.slice(0, numSnippets).forEach(snippet => {
      allQuestions.push({ snippet, language });
    });
  });
  
  // Shuffle all questions and select the requested number
  return shuffleArray(allQuestions)
    .slice(0, count)
    .map(({ snippet, language }) => convertSnippetToQuestion(snippet, language));
};

// Get random questions asynchronously (simulating API call)
export const getRandomQuestionsAsync = async (
  count: number = 10,
  delay: number = 0
): Promise<QuizQuestion[]> => {
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return getRandomQuestions(count);
};

// Create a batch loader for questions
export const createQuestionBatchLoader = (batchSize: number = 5) => {
  let questions: QuizQuestion[] = [];
  let currentIndex = 0;

  return async (): Promise<{ questions: QuizQuestion[]; hasMore: boolean }> => {
    // If we've used all questions or this is the first call, generate new ones
    if (currentIndex >= questions.length) {
      questions = getRandomQuestions(50); // Generate new set of questions
      currentIndex = 0;
    }

    const nextBatch = questions.slice(currentIndex, currentIndex + batchSize);
    currentIndex += batchSize;
    
    // Simulate network delay (50-150ms)
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    
    return {
      questions: nextBatch,
      hasMore: currentIndex < questions.length
    };
  };
}; 