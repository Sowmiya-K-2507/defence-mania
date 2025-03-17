// src/services/aiQuizService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateQuiz = async (topic, numQuestions = 10) => {
  // Use a fixed API key instead of getting it from the user
  const API_KEY =process.env.REACT_APP_AI_API_KEY; // Replace with your actual API key
	if (!API_KEY) {
    throw new Error("API key is not defined. Please make sure the REACT_APP_AI_API_KEY environment variable is set.");
  }
  
  try {
    // Initialize the Google Generative AI with the API key
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Use the gemini-1.5-pro model instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `Create a quiz about "${topic}" with ${numQuestions} multiple-choice questions. 
    Format the response as a JSON object with the following structure:
    {
      "id": "unique-id-${Date.now()}",
      "title": "Quiz title related to ${topic}",
      "description": "A brief description of the quiz",
      "timeLimit": 600, // Time limit in seconds
      "questions": [
        {
          "text": "Question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Correct option text",
          "explanation": "Explanation of the correct answer"
        }
        // More questions...
      ]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON object from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response as JSON");
    }
    
    const quizData = JSON.parse(jsonMatch[0]);
    return quizData;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz. Please try again.");
  }
};