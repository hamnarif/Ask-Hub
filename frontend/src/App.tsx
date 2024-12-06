import React, { useState, useEffect } from "react";
import Spinner from "./components/Spinner";
import HomePage from "./components/HomePage";

const App: React.FC = () => {
  const [count, setCount] = useState(0); // Controls spinner loading percentage
  const [loading, setLoading] = useState(true); // Controls overall transition

  useEffect(() => {
    // Increment count every 50ms up to 100
    const interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 3 : 100));
    }, 25);

    // Transition to HomePage after Spinner finishes
    if (count === 100) {
      clearInterval(interval);
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 200); // Add slight delay for smoother transition

      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Spinner Component with Fade-Out */}
      <div
        className={`${
          loading ? "opacity-100 scale-100" : "opacity-0 scale-90"
        } transition-all duration-1000 absolute inset-0 flex items-center justify-center`}
      >
        <Spinner count={count} />
      </div>

      {/* HomePage Component with Fade-In */}
      <div
        className={`${
          loading ? "opacity-0 scale-90" : "opacity-100 scale-100"
        } transition-all duration-1000`}
      >
        <HomePage />
      </div>
    </div>
  );
};

export default App;
