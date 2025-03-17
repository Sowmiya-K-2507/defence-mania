import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-500" : "text-gray-700";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Defence Mania</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium ${isActive('/')}`}>Home</Link>
            <Link to="/quiz" className={`font-medium ${isActive('/quiz')}`}>Quiz</Link>
            <Link to="/leaderboard" className={`font-medium ${isActive('/leaderboard')}`}>Leaderboard</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {user.email}</span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className={`font-medium ${isActive('/login')}`}>Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className={`font-medium ${isActive('/')}`}>Home</Link>
              <Link to="/quiz" className={`font-medium ${isActive('/quiz')}`}>Quiz</Link>
              <Link to="/leaderboard" className={`font-medium ${isActive('/leaderboard')}`}>Leaderboard</Link>
              
              {user ? (
                <>
                  <span className="text-gray-700">Hello, {user.email}</span>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`font-medium ${isActive('/login')}`}>Login</Link>
                  <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 w-min whitespace-nowrap">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;