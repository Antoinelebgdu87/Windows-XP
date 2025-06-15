import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CMDLoadingScreenProps {
  onLoadingComplete: () => void;
}

const CMDLoadingScreen: React.FC<CMDLoadingScreenProps> = ({
  onLoadingComplete,
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const cmdLines = [
    "Microsoft Windows XP [Version 5.1.2600]",
    "(C) Copyright 1985-2024 Microsoft Corp.",
    "",
    "C:\\>cd Portfolio",
    "",
    "C:\\Portfolio>dir",
    " Volume in drive C has no label.",
    " Directory of C:\\Portfolio",
    "",
    "25/12/2024  14:30    <DIR>          .",
    "25/12/2024  14:30    <DIR>          ..",
    "25/12/2024  14:25         2,048     about.exe",
    "25/12/2024  14:25         4,096     videos.exe",
    "25/12/2024  14:25         1,024     skills.exe",
    "25/12/2024  14:25         3,072     contact.exe",
    "               4 File(s)     10,240 bytes",
    "               2 Dir(s)  42,949,672,960 bytes free",
    "",
    "C:\\Portfolio>start windows_xp.exe",
    "",
    "Lancement de Windows XP Portfolio Edition...",
    "Initialisation de l'environnement graphique...",
    "Chargement des pilotes vidéo...",
    "Démarrage de l'interface utilisateur...",
    "",
    "Windows XP est prêt.",
    "",
  ];

  // Effet de frappe de machine à écrire
  useEffect(() => {
    if (currentLineIndex >= cmdLines.length) {
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 2000);
      return;
    }

    const currentLine = cmdLines[currentLineIndex];

    if (currentChar <= currentLine.length) {
      const timer = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            newLines[currentLineIndex] = currentLine.substring(0, currentChar);
            return newLines;
          });
          setCurrentChar((prev) => prev + 1);
        },
        currentLine === "" ? 50 : Math.random() * 80 + 30,
      ); // Vitesse variable pour réalisme

      return () => clearTimeout(timer);
    } else {
      // Ligne terminée, passer à la suivante
      setTimeout(
        () => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentChar(0);
        },
        currentLine.includes("start windows_xp.exe") ? 1000 : 200,
      );
    }
  }, [currentLineIndex, currentChar, cmdLines, onLoadingComplete]);

  // Curseur clignotant
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Sons de frappe (simulés)
  useEffect(() => {
    if (currentChar > 0 && currentLineIndex < cmdLines.length) {
      // Son de frappe de clavier
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(
        800 + Math.random() * 200,
        audioContext.currentTime,
      );
      oscillator.type = "square";

      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1,
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  }, [currentChar, currentLineIndex]);

  return (
    <motion.div
      className="fixed inset-0 bg-black text-green-400 font-mono overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: '"Courier New", "Lucida Console", monospace',
        fontSize: "14px",
        lineHeight: "1.4",
      }}
    >
      {/* Effet de scanlines pour écran CRT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          )`,
        }}
      />

      {/* Contenu CMD */}
      <div className="p-4 h-full flex flex-col">
        {displayedLines.map((line, index) => (
          <div key={index} className="whitespace-pre">
            {line}
            {index === currentLineIndex && showCursor && (
              <span className="bg-green-400 text-black">_</span>
            )}
          </div>
        ))}

        {/* Curseur à la fin si toutes les lignes sont affichées */}
        {isComplete && showCursor && (
          <span className="bg-green-400 text-black">_</span>
        )}
      </div>

      {/* Effet de lumière CRT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 40%,
            rgba(0, 0, 0, 0.3) 100%
          )`,
        }}
      />

      {/* Effet de scintillement */}
      <motion.div
        className="absolute inset-0 bg-green-400 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.02, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 1,
        }}
      />

      {/* Informations système en bas */}
      <div className="absolute bottom-4 right-4 text-green-600 text-xs">
        {isComplete ? "Système prêt" : "Initialisation..."}
      </div>
    </motion.div>
  );
};

export default CMDLoadingScreen;
