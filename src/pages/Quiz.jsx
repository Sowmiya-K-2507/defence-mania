import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import quizData from "./quizData"; // Import static quiz data
import AIQuizGenerator from "../components/AIQuizGenerator";
import "./Quiz.css";

// Add default time limit to existing quiz data if it doesn't exist
const quizDataWithTimeLimit = quizData.map(quiz => ({
  ...quiz,
  timeLimit: quiz.timeLimit || 600 // Default 10 minutes (600 seconds)
}));

function Quiz() {
  // State management (original states)
  const [showQuizList, setShowQuizList] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // New states for AI generation
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [recentAIQuizzes, setRecentAIQuizzes] = useState([]);

  // New state for cancel confirmation popup
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Load quizzes on component mount
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        // Combine static quizzes with AI-generated ones from Firestore
        const aiQuizzesQuery = query(
          collection(db, "quizzes"), 
          orderBy("createdAt", "desc"),
          limit(20)
        );
        
        const aiQuizzesSnapshot = await getDocs(aiQuizzesQuery);
        const aiQuizzes = aiQuizzesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            firestoreId: doc.id,
            timeLimit: data.timeLimit || 600 // Default 10 minutes if not specified
          };
        });
        
        setRecentAIQuizzes(aiQuizzes);
        setAllQuizzes([...quizDataWithTimeLimit, ...aiQuizzes]);
      } catch (error) {
        console.error("Error loading quizzes:", error);
      }
    };
    
    loadQuizzes();
  }, []);

  // Handle a newly generated AI quiz
  const handleAIQuizGenerated = (newQuiz) => {
    // Ensure the quiz has a time limit
    const quizWithTimeLimit = {
      ...newQuiz,
      timeLimit: newQuiz.timeLimit || 600 // Default 10 minutes if not specified
    };
    
    setShowAIGenerator(false);
    setSelectedQuiz(quizWithTimeLimit);
    setShowQuizList(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers(Array(quizWithTimeLimit.questions.length).fill(null));
    setQuizCompleted(false);
    setTimeLeft(quizWithTimeLimit.timeLimit);
  };

  // Original functions with timer fix
  const handleSelectQuiz = (quizId) => {
    if (!isLoggedIn) {
      alert("Please log in to take a quiz");
      return;
    }
    
    const quiz = allQuizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    setSelectedQuiz(quiz);
    setShowQuizList(false);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers(Array(quiz.questions.length).fill(null));
    setQuizCompleted(false);
    // Always set the time limit
    setTimeLeft(quiz.timeLimit || 600);
  };

  const handleAnswer = (option) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = option;
    setUserAnswers(newAnswers);
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const handleSubmitQuiz = async () => {
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].answer) {
        finalScore++;
      }
    });
    
    setScore(finalScore);
    setQuizCompleted(true);
    
    try {
      await addDoc(collection(db, "scores"), {
        userId: auth.currentUser?.email || auth.currentUser?.uid,
        quizId: selectedQuiz.id,
        quizName: selectedQuiz.title,
        score: finalScore,
        totalQuestions: selectedQuiz.questions.length,
        timestamp: new Date(),
        isAIGenerated: selectedQuiz.isAIGenerated || false
      });
    } catch (error) {
      console.error("Error saving score:", error);
      alert("There was an error saving your score. Please try again later.");
    }
  };

  const handleBackToList = () => {
    setShowQuizList(true);
    setSelectedQuiz(null);
    setQuizCompleted(false);
    setTimeLeft(null);
    setShowAIGenerator(false);
  };

  // New function to handle cancel button click
  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  // New function to exit quiz without submitting
  const handleExitWithoutSubmit = () => {
    setShowCancelPopup(false);
    handleBackToList();
  };

  // New function to submit quiz from cancel popup
  const handleSubmitFromCancel = () => {
    setShowCancelPopup(false);
    handleSubmitQuiz();
  };

  useEffect(() => {
    if (!selectedQuiz || quizCompleted) return;
    
    const allQuestionsAnswered = userAnswers.every(answer => answer !== null);
    if (allQuestionsAnswered) {
      handleSubmitQuiz();
    }
  }, [userAnswers]);
  
  // Fixed timer functionality
  useEffect(() => {
    if (!timeLeft) return;
    
    const timerId = setInterval(() => {
      setTimeLeft(time => {
        if (time <= 1) {
          clearInterval(timerId);
          if (!quizCompleted) {
            handleSubmitQuiz();
          }
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    
    return () => clearInterval(timerId);
  }, [timeLeft, quizCompleted]);

  if (loading) {
    return (
      <div className="loading flex justify-center items-center min-h-screen bg-gray-100 text-gray-800">
        <div className="spinner mr-3 h-6 w-6 animate-spin rounded-full border-2 border-solid border-green-700 border-r-transparent"></div>
        Loading...
      </div>
    );
  }

  // Render quiz list with AI generator
  if (showQuizList) {
    return (
      <div className="quiz-container min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100 text-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-green-800">Quiz Application</h1>
        
        {!isLoggedIn && (
          <div className="login-prompt bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 mb-6 rounded-lg w-full max-w-lg">
            <p>Please log in to take quizzes</p>
            <button onClick={() => window.location.href = '/login'} className="login-btn mt-2 bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded">
              Log In
            </button>
          </div>
        )}
        
        {isLoggedIn && (
          <div className="mb-8 w-full max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Available Quizzes</h2>
              <button 
                onClick={() => setShowAIGenerator(!showAIGenerator)}
                className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <span className="mr-2">
                  {showAIGenerator ? "Hide AI Generator" : "Create AI Quiz"}
                </span>
                <span>✨</span>
              </button>
            </div>
            
            {showAIGenerator && (
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <AIQuizGenerator 
                  onQuizGenerated={handleAIQuizGenerated} 
                  setAllQuizzes={setAllQuizzes}
                />
              </div>
            )}
          </div>
        )}
        
        {recentAIQuizzes.length > 0 && (
          <div className="w-full max-w-6xl mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Recent AI-Generated Quizzes</h2>
            <div className="quiz-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentAIQuizzes.map(quiz => (
                <div 
                  key={quiz.id} 
                  className={`quiz-card bg-white p-4 sm:p-6 rounded-lg shadow-md border border-purple-200 relative hover:shadow-lg transition-shadow ${!isLoggedIn ? 'opacity-70' : ''}`}
                  onClick={() => handleSelectQuiz(quiz.id)}
                >
                  <div className="absolute top-2 right-2 bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                    AI-Generated
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-purple-800 mb-2">{quiz.title}</h2>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">{quiz.description}</p>
                  <div className="quiz-info flex justify-between text-sm text-gray-600">
                    <span>{quiz.questions.length} questions</span>
                    <span>{Math.floor((quiz.timeLimit || 600) / 60)} minutes</span>
                  </div>
                  {!isLoggedIn && <div className="lock-overlay absolute inset-0 bg-gray-200 bg-opacity-30 flex items-center justify-center rounded-lg"><i className="lock-icon text-4xl">🔒</i></div>}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="w-full max-w-6xl">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Standard Quizzes</h2>
          <div className="quiz-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quizDataWithTimeLimit.map(quiz => (
              <div 
                key={quiz.id} 
                className={`quiz-card bg-white p-4 sm:p-6 rounded-lg shadow-md border border-green-200 relative hover:shadow-lg transition-shadow ${!isLoggedIn ? 'opacity-70' : ''}`}
                onClick={() => handleSelectQuiz(quiz.id)}
              >
                <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-2">{quiz.title}</h2>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">{quiz.description}</p>
                <div className="quiz-info flex justify-between text-sm text-gray-600">
                  <span>{quiz.questions.length} questions</span>
                  <span>{Math.floor(quiz.timeLimit / 60)} minutes</span>
                </div>
                {!isLoggedIn && <div className="lock-overlay absolute inset-0 bg-gray-200 bg-opacity-30 flex items-center justify-center rounded-lg"><i className="lock-icon text-4xl">🔒</i></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render quiz completion screen
  if (quizCompleted) {
    return (
      <div className="quiz-completion min-h-screen flex flex-col items-center justify-center p-4 pt-8 pb-16 bg-gray-100 text-gray-800">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-green-800 mb-2">Quiz Completed!</h1>
          <h2 className="text-lg sm:text-xl text-center mb-6">{selectedQuiz.title}</h2>
          <div className="score-display bg-green-50 p-4 rounded-lg mb-8 text-center">
            <p className="text-lg sm:text-xl">Your score: <span className="font-bold">{score}</span> out of <span className="font-bold">{selectedQuiz.questions.length}</span></p>
            <p className="percentage text-xl sm:text-2xl font-bold text-green-700">({Math.round((score / selectedQuiz.questions.length) * 100)}%)</p>
          </div>
          
          <div className="answer-review">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Review Your Answers:</h3>
            {selectedQuiz.questions.map((question, index) => (
              <div key={index} className={`question-review p-3 sm:p-4 mb-4 rounded-lg ${userAnswers[index] === question.answer ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className="mb-2 text-sm sm:text-base"><strong>Question {index + 1}:</strong> {question.text}</p>
                <p className="ml-4 mb-1 text-sm sm:text-base">Your answer: <span className={userAnswers[index] === question.answer ? "font-bold text-green-700" : "font-bold text-red-700"}>{userAnswers[index]}</span></p>
                <p className="ml-4 mb-1 text-sm sm:text-base">Correct answer: <span className="font-bold text-green-700">{question.answer}</span></p>
                {question.explanation && <p className="explanation mt-2 p-2 bg-gray-50 rounded italic text-sm sm:text-base">{question.explanation}</p>}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <button className="bg-green-700 hover:bg-green-600 text-white py-2 px-6 rounded-lg shadow transition-colors" onClick={handleBackToList}>Back to Quiz List</button>
          </div>
        </div>
      </div>
    );
  }

  // Render active quiz with improved timer display and cancel button
  return (
    <div className="active-quiz min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="quiz-header mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-green-800 mb-2">{selectedQuiz.title}</h1>
          
          {/* Timer is now always displayed */}
          <div className="timer bg-green-100 text-green-800 p-2 rounded-lg text-center font-mono text-base sm:text-lg mb-4">
            Time Remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          
          <div className="progress-bar bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="progress bg-green-600 h-4 rounded-full" 
              style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="question-container bg-green-50 p-4 sm:p-6 rounded-lg mb-6">
          <h2 className="text-base sm:text-lg font-bold mb-2">Question {currentQuestion + 1} of {selectedQuiz.questions.length}</h2>
          <p className="question-text text-base sm:text-lg mb-4">{selectedQuiz.questions[currentQuestion].text}</p>
          
          <div className="options-container space-y-2 sm:space-y-3">
            {selectedQuiz.questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index}
                className={`option-btn w-full text-left p-3 rounded-lg border text-sm sm:text-base border-green-300 hover:bg-green-100 transition ${userAnswers[currentQuestion] === option ? "bg-green-600 text-white hover:bg-green-600" : "bg-white"}`}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="navigation">
          <div className="question-dots flex justify-center mb-4 flex-wrap">
            {selectedQuiz.questions.map((_, index) => (
              <span 
                key={index} 
                className={`dot w-6 h-6 sm:w-8 sm:h-8 m-1 rounded-full flex items-center justify-center cursor-pointer border ${
                  index === currentQuestion ? "bg-green-600 text-white border-green-600" : 
                  userAnswers[index] !== null ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"
                } text-xs sm:text-sm`}
                onClick={() => navigateToQuestion(index)}
              >
                {index + 1}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button 
              className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 sm:px-6 rounded-lg shadow transition-colors mb-2 sm:mb-0"
              onClick={handleCancelClick}
            >
              Cancel Quiz
            </button>
            <button 
              className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 sm:px-6 rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmitQuiz}
              disabled={userAnswers.some(answer => answer === null)}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 max-w-md w-full">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">Exit Quiz?</h3>
            <p className="mb-6 text-center text-sm sm:text-base">Do you want to exit the quiz or submit your answers?</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button 
                className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 sm:px-6 rounded-lg shadow transition-colors mb-2 sm:mb-0"
                onClick={handleExitWithoutSubmit}
              >
                Exit Without Submitting
              </button>
              <button 
                className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 sm:px-6 rounded-lg shadow transition-colors"
                onClick={handleSubmitFromCancel}
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;