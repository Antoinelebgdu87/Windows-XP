import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    "Démarrage de Windows XP...",
    "Chargement des pilotes système...",
    "Initialisation des services...",
    "Chargement du bureau...",
    "Préparation de votre portfolio...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 xp-loading flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Windows XP Logo */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-xl">XP</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">Microsoft Windows XP</div>
            <div className="text-sm opacity-80">Portfolio Edition</div>
          </div>
        </div>
      </div>

      {/* Loading Message */}
      <div className="mb-8 text-center">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-lg mb-2"
        >
          {loadingSteps[currentStep]}
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="w-80 mb-4">
        <div className="xp-loading-bar">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-white text-sm">{progress}% terminé</div>

      {/* Bottom Copyright */}
      <div className="absolute bottom-8 text-white text-xs opacity-60">
        Copyright © 2001-2024 Microsoft Corporation. Portfolio Version.
      </div>

      {/* Loading Animation Dots */}
      <div className="absolute bottom-16 flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
