import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import CMDLoadingScreen from "../components/WindowsXP/CMDLoadingScreen";
import LoadingScreen from "../components/WindowsXP/LoadingScreen";
import Desktop from "../components/WindowsXP/Desktop";
import "../styles/windows-xp.css";

const Index = () => {
  const [showCMD, setShowCMD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);

  const handleCMDComplete = () => {
    setShowCMD(false);
    setIsLoading(true);
  };

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
        {showCMD && (
          <CMDLoadingScreen key="cmd" onLoadingComplete={handleCMDComplete} />
        )}
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
