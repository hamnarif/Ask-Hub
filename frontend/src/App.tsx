import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Spinner from "./components/Spinner";
import HomePage from "./components/HomePage";
import ChatBotPage from "./components/ChatBot";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.6, ease: "easeInOut" } },
};

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Required for AnimatePresence

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
    <div className="min-h-screen bg-stone-900">
      {/* Loading Spinner */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Spinner count={count} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Page Transitions */}
      <AnimatePresence mode="wait">
        {!loading && (
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/chatbot"
              element={
                <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                  <ChatBotPage />
                </motion.div>
              }
            />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
};


export default App;
