import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import HomePage from "./components/HomePage";
import ChatBotPage from "./components/ChatBot"; // Import your ChatBotPage component

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 3 : 100));
    }, 25);

    if (count === 100) {
      clearInterval(interval);
      const timeout = setTimeout(() => setLoading(false), 500);

      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <Router>
      <div className="min-h-screen bg-stone-900">
        <AnimatePresence>
          {/* Spinner */}
          {loading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              <Spinner count={count} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {/* Routes */}
          {!loading && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chatbot" element={<ChatBotPage />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
};

export default App;
