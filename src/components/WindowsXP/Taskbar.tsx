import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StartMenu from "./StartMenu";
import { useXPSounds } from "../../hooks/useXPSounds";

interface TaskbarButton {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

interface TaskbarProps {
  taskbarButtons: TaskbarButton[];
  onStartMenuAction: (action: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  taskbarButtons,
  onStartMenuAction,
}) => {
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { playClickSound } = useXPSounds();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="xp-taskbar">
        {/* Start Button */}
        <button
          className="xp-start-button"
          onClick={() => {
            playClickSound();
            setShowStartMenu(!showStartMenu);
          }}
        >
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">⊞</span>
            </div>
            <span>Démarrer</span>
          </div>
        </button>

        {/* Quick Launch Area */}
        <div className="flex items-center space-x-1 border-r border-gray-400 pr-2 mr-2">
          <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center cursor-pointer hover:bg-blue-600">
            <span className="text-white text-xs">🌐</span>
          </div>
          <div className="w-6 h-6 bg-yellow-500 rounded-sm flex items-center justify-center cursor-pointer hover:bg-yellow-600">
            <span className="text-white text-xs">📁</span>
          </div>
        </div>

        {/* Task Buttons */}
        <div className="flex items-center space-x-1 flex-1">
          {taskbarButtons.map((button) => (
            <motion.button
              key={button.id}
              className={`px-3 py-1 border rounded text-xs max-w-40 truncate ${
                button.isActive
                  ? "bg-blue-100 border-blue-300 shadow-inner"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
              onClick={button.onClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {button.title}
            </motion.button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-2 border-l border-gray-400 pl-2 ml-2">
          {/* Language Indicator */}
          <div className="text-white text-xs px-1 cursor-pointer hover:bg-blue-600 rounded">
            FR
          </div>

          {/* Volume Icon */}
          <div className="text-white text-xs cursor-pointer hover:bg-blue-600 rounded px-1">
            🔊
          </div>

          {/* Clock */}
          <div className="text-white text-xs text-right cursor-pointer hover:bg-blue-600 rounded px-2 py-1">
            <div className="font-mono">{formatTime(currentTime)}</div>
            <div className="text-xs opacity-80">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Start Menu */}
      <AnimatePresence>
        {showStartMenu && (
          <StartMenu
            onClose={() => setShowStartMenu(false)}
            onAction={(action) => {
              onStartMenuAction(action);
              setShowStartMenu(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Taskbar;
