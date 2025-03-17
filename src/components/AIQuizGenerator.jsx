import { useState } from "react";
import { generateQuiz } from "../services/aiQuizService";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function AIQuizGenerator({ onQuizGenerated, setAllQuizzes }) {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError("Please enter a topic for your quiz");
      return;
    }
    
    setError("");
    setIsGenerating(true);
    
    try {
      const newQuiz = await generateQuiz(topic, 15);
      
      // Save the generated quiz to Firestore
      try {
        const docRef = await addDoc(collection(db, "quizzes"), {
          ...newQuiz,
          isAIGenerated: true,
          createdAt: new Date()
        });
        
        // Add the Firestore document ID to the quiz
        newQuiz.firestoreId = docRef.id;
      } catch (firestoreError) {
        console.error("Error saving quiz to Firestore:", firestoreError);
        // Continue even if saving to Firestore fails
      }
      
      // Update the quizzes list
      setAllQuizzes(prevQuizzes => [newQuiz, ...prevQuizzes]);
      
      // Notify parent component
      onQuizGenerated(newQuiz);
      
      // Reset form
      setTopic("");
    } catch (error) {
      setError(error.message || "Failed to generate quiz. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-quiz-generator bg-white p-6 rounded-lg shadow-md border border-green-200 mb-8">
      <h2 className="text-xl font-bold text-green-800 mb-4">Generate AI Quiz</h2>
      
      <form onSubmit={handleGenerateQuiz}>
        <div className="mb-4">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
            What would you like to test your knowledge on?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., World History, Quantum Physics, Python Programming"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow transition-colors disabled:opacity-70"
        >
          {isGenerating ? "Generating Quiz..." : "Generate Quiz"}
        </button>
      </form>
      
      {isGenerating && (
        <div className="mt-4 text-center text-gray-600">
          <p>Generating your custom quiz. This may take up to 30 seconds...</p>
          <div className="loading-spinner mt-2 mx-auto w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default AIQuizGenerator;