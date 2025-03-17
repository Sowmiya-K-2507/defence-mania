import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/quiz" element={<Layout><Quiz /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;