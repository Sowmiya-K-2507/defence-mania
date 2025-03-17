import { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/quiz");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover px-4" 
         style={{ backgroundImage: "url('/images/camo-bg.jpg')", backgroundColor: "#3a4c3a" }}>
      <div className="max-w-md w-full bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden border-2 border-green-800">
        <div className="bg-green-800 py-4">
          <h1 className="text-2xl font-bold text-center text-white">Login to Defence Mania</h1>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email Address</label>
            <input 
              id="email"
              type="email" 
              className="w-full px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">Password</label>
            <input 
              id="password"
              type="password" 
              className="w-full px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className={`w-full py-3 px-4 bg-green-800 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
          
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-700 hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;