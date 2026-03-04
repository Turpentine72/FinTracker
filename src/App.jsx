import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Import all pages
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import Expense from "./pages/Expense";
import New from "./pages/New";
import Upgrade from "./pages/Upgrade";
import Settings from "./pages/Settings";

function App() {
  const [darkMode, setDarkMode] = useState(false); // Default to false for SSR

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    const initialDarkMode = saved !== null 
      ? JSON.parse(saved) 
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(initialDarkMode);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage setDarkMode={setDarkMode} darkMode={darkMode} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/expense" element={<Expense darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/new" element={<New darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/upgrade" element={<Upgrade darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;