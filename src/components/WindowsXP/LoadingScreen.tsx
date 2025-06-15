import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useXPSounds } from "../../hooks/useXPSounds";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { playStartupSound } = useXPSounds();

  const loadingSteps = [
    "Démarrage de Microsoft Windows XP...",
    "Chargement des pilotes de périphériques...",
    "Initialisation des services système...",
    "Configuration de l'interface utilisateur...",
    "Préparation de l'environnement de travail...",
  ];

  useEffect(() => {
    // Play startup sound when component mounts
    setTimeout(() => playStartupSound(), 500);

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
  }, [onLoadingComplete, playStartupSound]);

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
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <div className="text-white font-bold text-2xl font-serif">⊞</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold">Microsoft Windows XP</div>
            <div className="text-lg opacity-90">Édition Professionnelle</div>
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
