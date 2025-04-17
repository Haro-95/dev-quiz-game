"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { getRandomQuestions } from "@/lib/data/quiz-data";
import { ProgrammingLanguage, QuizAnswer, QuizQuestion, QuizResult } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CodeBlock from "@/components/code-block";
import { 
  Sparkles, 
  RotateCcw, 
  Check, 
  X
} from "lucide-react";

export default function QuizGame() {
  // All state hooks must be declared first and in the same order every render
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<ProgrammingLanguage | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [randomizedOptions, setRandomizedOptions] = useState<ProgrammingLanguage[]>([]);

  // All memo hooks
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const totalQuestions = useMemo(() => questions.length, [questions]);
  const progress = useMemo(() => ((currentQuestionIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100, [currentQuestionIndex, isAnswered, totalQuestions]);
  const correctAnswers = useMemo(() => answers.filter((a) => a.isCorrect).length, [answers]);
  const quizResult = useMemo<QuizResult>(() => ({
    totalQuestions,
    correctAnswers,
    answers,
  }), [totalQuestions, correctAnswers, answers]);

  // Initialize or reset the quiz - defined as a regular function to avoid hook dependency issues
  const initializeQuiz = () => {
    const randomQuestions = getRandomQuestions(10);
    setQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setIsAnswered(false);
    if (randomQuestions.length > 0) {
      setRandomizedOptions([...randomQuestions[0].options].sort(() => Math.random() - 0.5));
    }
  };

  // All callback hooks next - always in the same order
  const handleAnswerSelect = useCallback((language: ProgrammingLanguage) => {
    if (isAnswered) return;

    setSelectedAnswer(language);
    setIsAnswered(true);

    const isCorrect = language === currentQuestion?.language;
    const answer: QuizAnswer = {
      questionId: currentQuestion?.id || "",
      selectedLanguage: language,
      isCorrect,
    };

    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex === totalQuestions - 1) {
        setShowResult(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    }, 2000);  // Increased to 2 seconds for better visibility of feedback pill
  }, [currentQuestion, currentQuestionIndex, isAnswered, totalQuestions]);

  const handleRestartQuiz = useCallback(() => {
    // Call local function to avoid hook dependency
    initializeQuiz();
  }, []);

  // All effect hooks last
  // Initialize quiz on component mount
  useEffect(() => {
    initializeQuiz();
  }, []);

  // When currentQuestionIndex changes, randomize the options for the new question
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      setRandomizedOptions([...questions[currentQuestionIndex].options].sort(() => Math.random() - 0.5));
    }
  }, [currentQuestionIndex, questions]);

  // Check if the question is loaded yet
  if (!currentQuestion) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Loading quiz...</h2>
        </div>
      </div>
    );
  }

  // Render the results page
  if (showResult) {
    return (
      <div className="w-full flex justify-center items-center animate-fadeIn px-4 py-2">
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-card rounded-xl p-6 shadow-lg border border-primary/20 animate-scaleIn">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-primary/20 rounded-full p-2 h-10 w-10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold">Quiz Complete!</h2>
            </div>
            
            <div className="mb-6">
              <div className="text-center mb-6">
                <div className="inline-block mb-4 bg-primary/10 rounded-full px-5 py-2 border border-primary/20">
                  <p className="text-base mb-0">
                    You got <span className="font-bold text-primary text-xl">{quizResult.correctAnswers}</span> out of{" "}
                    <span className="font-bold">{quizResult.totalQuestions}</span> questions
                  </p>
                </div>
                
                {/* Score percentage and message */}
                <div className="bg-card border border-border rounded-lg shadow-sm grid place-items-center h-[160px]">
                  <div className="flex flex-col items-center justify-center text-center px-6">
                    {/* Progress bar at top */}
                    <div className="w-full max-w-[200px] mb-3">
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${Math.round((quizResult.correctAnswers / quizResult.totalQuestions) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Score in the middle */}
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {Math.round((quizResult.correctAnswers / quizResult.totalQuestions) * 100)}% Score
                    </h3>
                    
                    {/* Message at the bottom */}
                    <p className="text-sm text-muted-foreground max-w-[280px]">
                      {quizResult.correctAnswers === quizResult.totalQuestions
                        ? "Perfect! You're a programming language expert!"
                        : quizResult.correctAnswers >= quizResult.totalQuestions * 0.8
                        ? "Great job! You really know your programming languages!"
                        : quizResult.correctAnswers >= quizResult.totalQuestions * 0.6
                        ? "Good work! You have solid programming language knowledge."
                        : quizResult.correctAnswers >= quizResult.totalQuestions * 0.4
                        ? "Nice effort! Keep practicing to improve your score."
                        : "Keep learning! You&apos;ll get better with practice."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-lg mb-3">Your Results</h3>
            
            <div className="space-y-1.5 mb-6">
              {quizResult.answers.map((answer, index) => (
                <div
                  key={answer.questionId}
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    answer.isCorrect 
                      ? "bg-green-500/10 dark:bg-green-900/20 border border-green-500/20" 
                      : "bg-red-500/10 dark:bg-red-900/20 border border-red-500/20"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      answer.isCorrect 
                        ? "bg-green-500/20 text-green-500" 
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {answer.isCorrect ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <X className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <span className="font-medium text-sm">Question {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {answer.isCorrect ? (
                      <span className="text-sm text-green-600 dark:text-green-400">Correct</span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <span className="text-xs text-red-600 dark:text-red-400">{answer.selectedLanguage}</span>
                        <span className="text-xs bg-background/50 px-1.5 py-0.5 rounded-full">
                          Correct: {questions.find((q) => q.id === answer.questionId)?.language}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleRestartQuiz} 
              className="w-full rounded-full py-6 text-base font-medium"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Play Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-2 flex flex-col">
      {/* Quiz Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h2>
          <span className="text-base font-mono bg-muted px-3 py-1 rounded-full">
            Score: {correctAnswers}/{answers.length}
          </span>
        </div>
        <Progress value={progress} className="h-2.5 rounded-full" />
      </div>

      <div className="flex flex-col">
        {/* Code Block with help tooltip that appears on the right side */}
        <div className="relative mb-4" style={{ height: "38vh", maxHeight: "38vh" }}>
          <CodeBlock code={currentQuestion.code} language={currentQuestion.language} />
        </div>

        {/* Question and Answers */}
        <div className="bg-card rounded-xl p-6 shadow-md border mb-6">
          <h3 className="text-xl font-semibold mb-4">
            What programming language is this?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {randomizedOptions.map((language) => (
              <button
                key={language}
                className={`py-3 px-4 rounded-lg border text-base transition-all duration-200 font-medium ${
                  !isAnswered 
                    ? "hover:bg-primary/10 active:bg-primary/20 border-border" 
                    : selectedAnswer === language
                      ? language === currentQuestion.language
                        ? "bg-green-500/10 border-green-500 text-green-600"
                        : "bg-red-500/10 border-red-500 text-red-600"
                      : language === currentQuestion.language 
                        ? "bg-green-500/10 border-green-500 text-green-600" 
                        : "opacity-50 border-border"
                }`}
                onClick={() => handleAnswerSelect(language)}
                disabled={isAnswered}
              >
                {language}
              </button>
            ))}
          </div>
          
          {/* Feedback Pill */}
          {isAnswered && (
            <div className={`mt-4 py-3 px-4 rounded-lg text-center font-medium ${
              selectedAnswer === currentQuestion.language
                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                : "bg-red-500/20 text-red-600 dark:text-red-400"
            }`}>
              {selectedAnswer === currentQuestion.language 
                ? "Correct! Well done!" 
                : `Incorrect. That&apos;s ${currentQuestion.language} code.`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}