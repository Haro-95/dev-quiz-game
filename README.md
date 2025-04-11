# Developer Quiz Game

A modern and interactive quiz game for developers to test their programming language recognition skills. This game presents 10 random code snippets from different popular programming languages, and challenges users to identify the language correctly.

## Features

- 🎮 Clean, modern UI with dark/light mode
- 🔄 10 random code snippets per session
- ✅ Instant feedback after each answer
- 📊 Score tracking and detailed results
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Frontend Framework**: Next.js with App Router (React 19)
- **Styling**: Tailwind CSS 
- **UI Components**: Custom components with Radix UI primitives
- **Syntax Highlighting**: React Syntax Highlighter
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Haro-95/dev-quiz-game.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## How to Play

1. You will be presented with a code snippet and four programming language options.
2. Choose the language you believe the code is written in.
3. Receive instant feedback on your answer.
4. After 10 questions, view your final score and analysis.
5. Play again to test your knowledge with new snippets!

## Extending the Game

### Adding More Questions

To add more questions, edit the `src/lib/data/quiz-data.ts` file and add new questions to the `quizQuestions` array following the existing format.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Developed by Haro Abdulah
