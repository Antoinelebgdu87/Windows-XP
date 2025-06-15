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
    "C:\\>cd C:\\Users\\MonteurVideo\\Portfolio",
    "",
    "C:\\Users\\MonteurVideo\\Portfolio>dir",
    " Le volume dans le lecteur C n'a pas de nom.",
    " Répertoire de C:\\Users\\MonteurVideo\\Portfolio",
    "",
    "25/12/2024  14:30    <REP>          .",
    "25/12/2024  14:30    <REP>          ..",
    "25/12/2024  14:25         2,048     about_me.exe",
    "25/12/2024  14:25         4,096     premiere_pro.exe",
    "25/12/2024  14:25         1,024     competences.exe",
    "25/12/2024  14:25         3,072     contact.exe",
    "25/12/2024  14:20        12,288     showreel.mp4",
    "25/12/2024  14:15         8,192     portfolio.xp",
    "               6 fichier(s)       30,720 octets",
    "               2 Rép(s)  42,949,672,960 octets libres",
    "",
    "C:\\Users\\MonteurVideo\\Portfolio>portfolio.xp",
    "",
    "Démarrage du Portfolio Professionnel...",
    "Chargement de l'environnement Windows XP...",
    "Initialisation des composants graphiques...",
    "Préparation de l'interface utilisateur...",
    "Activation du mode Portfolio...",
    "",
    "Portfolio prêt. Démarrage de Windows XP...",
    "",
  ];

  // Effet de frappe de machine à écrire
  useEffect(() => {
    if (currentLineIndex >= cmdLines.length) {
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete();
      }, 700);
      return;
    }

    const currentLine = cmdLines[currentLineIndex];

    if (currentChar <= currentLine.length) {
      const timer = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            // S'assurer que le tableau a la bonne taille
            while (newLines.length <= currentLineIndex) {
              newLines.push("");
            }
            newLines[currentLineIndex] = currentLine.substring(0, currentChar);
            return newLines;
          });
          setCurrentChar((prev) => prev + 1);
        },
        currentLine === "" ? 15 : Math.random() * 25 + 10,
      ); // Vitesse variable pour réalisme (3x plus rapide)

      return () => clearTimeout(timer);
    } else {
      // Ligne terminée, passer à la suivante
      setTimeout(
        () => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentChar(0);
        },
        currentLine.includes("portfolio.xp") ? 300 : 70,
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

  // Sons désactivés - plus de bruit pendant le chargement

  const getLineColor = (line: string | undefined): string => {
    if (!line) return "#00ff00";

    if (line.includes("C:\\") && line.includes(">")) return "#00ff00";
    if (line.includes(".exe")) return "#ffff00";
    if (line.includes("<REP>")) return "#00ffff";
    if (line.includes("fichier(s)") || line.includes("octets"))
      return "#ffff00";
    if (line.includes("Démarrage") || line.includes("Chargement"))
      return "#ffffff";

    return "#00ff00";
  };

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

      {/* Header système */}
      <div className="border-b border-green-800 p-2 bg-black bg-opacity-50">
        <div className="text-green-300 text-xs">
          Microsoft Windows XP [Build 2600] - Invite de commandes
        </div>
      </div>

      {/* Contenu CMD */}
      <div className="p-4 flex-1 overflow-hidden">
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className="whitespace-pre"
            style={{
              color: getLineColor(line),
            }}
          >
            {line || ""}
            {index === currentLineIndex && showCursor && (
              <span className="bg-green-400 text-black animate-pulse">_</span>
            )}
          </div>
        ))}

        {/* Curseur à la fin si toutes les lignes sont affichées */}
        {isComplete && showCursor && (
          <span className="bg-green-400 text-black animate-pulse">_</span>
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

      {/* Informations système et bouton Skip */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-4">
        <div className="text-green-600 text-xs">
          {isComplete ? "Système prêt" : "Initialisation..."}
        </div>
        {!isComplete && (
          <button
            onClick={() => {
              setIsComplete(true);
              onLoadingComplete();
            }}
            className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold border border-green-500 transition-colors"
          >
            SKIP ⏭️
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CMDLoadingScreen;
