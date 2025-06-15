import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "../components/WindowsXP/LoadingScreen";
import Desktop from "../components/WindowsXP/Desktop";
import "../styles/windows-xp.css";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showDesktop, setShowDesktop] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to show transition
    setTimeout(() => {
      setShowDesktop(true);
    }, 500);
  };

  // Prevent scrolling when the portfolio is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden xp-font">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="loading"
            onLoadingComplete={handleLoadingComplete}
          />
        )}
        {showDesktop && <Desktop key="desktop" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
