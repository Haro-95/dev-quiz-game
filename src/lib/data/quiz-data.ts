import { ProgrammingLanguage, QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "1",
    language: ProgrammingLanguage.JavaScript,
    code: `
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
    `,
    options: [
      ProgrammingLanguage.JavaScript,
      ProgrammingLanguage.TypeScript,
      ProgrammingLanguage.Python,
      ProgrammingLanguage.PHP
    ]
  },
  {
    id: "2",
    language: ProgrammingLanguage.Python,
    code: `
def calculate_average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

data = [10, 15, 20, 25, 30]
average = calculate_average(data)
print(f"The average is: {average}")
    `,
    options: [
      ProgrammingLanguage.Python,
      ProgrammingLanguage.Ruby,
      ProgrammingLanguage.JavaScript,
      ProgrammingLanguage.PHP
    ]
  },
  {
    id: "3",
    language: ProgrammingLanguage.Java,
    code: `
import java.util.ArrayList;
import java.util.List;

public class Example {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("Apple");
        items.add("Banana");
        items.add("Orange");
        
        for (String item : items) {
            System.out.println(item);
        }
    }
}
    `,
    options: [
      ProgrammingLanguage.Java,
      ProgrammingLanguage.CSharp,
      ProgrammingLanguage.Kotlin,
      ProgrammingLanguage.CPlusPlus
    ]
  },
  {
    id: "4",
    language: ProgrammingLanguage.CSharp,
    code: `
using System;
using System.Collections.Generic;

namespace Example
{
    class Program
    {
        static void Main(string[] args)
        {
            var numbers = new List<int> { 1, 2, 3, 4, 5 };
            numbers.ForEach(n => Console.WriteLine(n * 2));
        }
    }
}
    `,
    options: [
      ProgrammingLanguage.CSharp,
      ProgrammingLanguage.Java,
      ProgrammingLanguage.CPlusPlus,
      ProgrammingLanguage.TypeScript
    ]
  },
  {
    id: "5",
    language: ProgrammingLanguage.CPlusPlus,
    code: `
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 3};
    
    std::sort(numbers.begin(), numbers.end());
    
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    
    return 0;
}
    `,
    options: [
      ProgrammingLanguage.CPlusPlus,
      ProgrammingLanguage.CSharp,
      ProgrammingLanguage.Rust,
      ProgrammingLanguage.Go
    ]
  },
  {
    id: "6",
    language: ProgrammingLanguage.TypeScript,
    code: `
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function formatUser(user: User): string {
  return \`User: \${user.name} (\${user.email})\`;
}

const currentUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true
};

console.log(formatUser(currentUser));
    `,
    options: [
      ProgrammingLanguage.TypeScript,
      ProgrammingLanguage.JavaScript,
      ProgrammingLanguage.Java,
      ProgrammingLanguage.Kotlin
    ]
  },
  {
    id: "7",
    language: ProgrammingLanguage.Ruby,
    code: `
class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet
    puts "Hello, my name is #{@name} and I am #{@age} years old."
  end
end

person = Person.new("Alice", 30)
person.greet
    `,
    options: [
      ProgrammingLanguage.Ruby,
      ProgrammingLanguage.Python,
      ProgrammingLanguage.PHP,
      ProgrammingLanguage.JavaScript
    ]
  },
  {
    id: "8",
    language: ProgrammingLanguage.Go,
    code: `
package main

import (
    "fmt"
    "strings"
)

func main() {
    message := "hello, world"
    
    fmt.Println(strings.ToUpper(message))
    
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0
    
    for _, num := range numbers {
        sum += num
    }
    
    fmt.Printf("Sum: %d\\n", sum)
}
    `,
    options: [
      ProgrammingLanguage.Go,
      ProgrammingLanguage.Rust,
      ProgrammingLanguage.Swift,
      ProgrammingLanguage.Java
    ]
  },
  {
    id: "9",
    language: ProgrammingLanguage.PHP,
    code: `
<?php
$fruits = ["Apple", "Banana", "Orange"];

function displayItems($items) {
    foreach ($items as $item) {
        echo $item . "<br>";
    }
}

displayItems($fruits);

$user = [
    "name" => "John",
    "email" => "john@example.com",
    "admin" => true
];

echo "Welcome, " . $user["name"];
?>
    `,
    options: [
      ProgrammingLanguage.PHP,
      ProgrammingLanguage.Python,
      ProgrammingLanguage.Ruby,
      ProgrammingLanguage.JavaScript
    ]
  },
  {
    id: "10",
    language: ProgrammingLanguage.Rust,
    code: `
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Red"), 25);
    
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
    
    let team_name = String::from("Blue");
    let score = scores.get(&team_name).unwrap_or(&0);
    
    println!("Score for {}: {}", team_name, score);
}
    `,
    options: [
      ProgrammingLanguage.Rust,
      ProgrammingLanguage.Go,
      ProgrammingLanguage.CPlusPlus,
      ProgrammingLanguage.Swift
    ]
  },
  {
    id: "11",
    language: ProgrammingLanguage.Swift,
    code: `
import Foundation

struct Person {
    let name: String
    let age: Int
    
    func describe() -> String {
        return "\\(name) is \\(age) years old."
    }
}

let people = [
    Person(name: "Alice", age: 28),
    Person(name: "Bob", age: 35),
    Person(name: "Charlie", age: 42)
]

let names = people.map { $0.name }
let descriptions = people.map { $0.describe() }

for description in descriptions {
    print(description)
}
    `,
    options: [
      ProgrammingLanguage.Swift,
      ProgrammingLanguage.Kotlin,
      ProgrammingLanguage.TypeScript,
      ProgrammingLanguage.Rust
    ]
  },
  {
    id: "12",
    language: ProgrammingLanguage.Kotlin,
    code: `
data class User(val name: String, val age: Int)

fun main() {
    val users = listOf(
        User("Alice", 28),
        User("Bob", 35),
        User("Charlie", 42)
    )
    
    val adults = users.filter { it.age >= 18 }
                     .sortedBy { it.name }
    
    for (user in adults) {
        println("\${user.name} is \${user.age} years old")
    }
    
    val averageAge = users.map { it.age }.average()
    println("Average age: \$averageAge")
}
    `,
    options: [
      ProgrammingLanguage.Kotlin,
      ProgrammingLanguage.Swift,
      ProgrammingLanguage.Java,
      ProgrammingLanguage.TypeScript
    ]
  }
];

/**
 * Gets random questions synchronously
 * @param count Number of questions to return
 * @returns Array of random quiz questions
 */
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
} 

/**
 * Gets random questions asynchronously with delay to simulate API call
 * This allows for future expansion where questions could be loaded from an API
 * @param count Number of questions to return
 * @param delay Optional delay in ms to simulate network latency
 * @returns Promise resolving to array of random quiz questions
 */
export async function getRandomQuestionsAsync(
  count: number = 10, 
  delay: number = 0
): Promise<QuizQuestion[]> {
  // Simulate API call with delay
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Loads questions in batches for optimized performance
 * @param batchSize Size of each batch of questions
 * @returns Function that loads the next batch when called
 */
export function createQuestionBatchLoader(batchSize: number = 5) {
  const availableQuestions = [...quizQuestions].sort(() => 0.5 - Math.random());
  let currentIndex = 0;

  return async (): Promise<{questions: QuizQuestion[], hasMore: boolean}> => {
    const nextBatch = availableQuestions.slice(currentIndex, currentIndex + batchSize);
    currentIndex += batchSize;
    
    const hasMore = currentIndex < availableQuestions.length;
    
    // Simulate network delay (50-150ms)
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    
    return { 
      questions: nextBatch,
      hasMore
    };
  };
} 