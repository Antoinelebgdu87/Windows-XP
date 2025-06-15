import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";
import { useXPSounds } from "../../hooks/useXPSounds";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  isActive?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  className?: string;
}

const Window: React.FC<WindowProps> = ({
  title,
  children,
  initialPosition = { x: 100, y: 100 },
  width = 400,
  height = 300,
  isActive = true,
  onClose,
  onMinimize,
  onFocus,
  className = "",
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const { playWindowOpen, playWindowClose, playClickSound } = useXPSounds();

  // Play window open sound on mount
  useEffect(() => {
    playWindowOpen();
  }, [playWindowOpen]);

  const handleClose = () => {
    playWindowClose();
    if (onClose) {
      setTimeout(() => onClose(), 200); // Delay to let sound play
    }
  };

  const handleMinimize = () => {
    playClickSound();
    if (onMinimize) onMinimize();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (onFocus) onFocus();
    setIsDragging(true);

    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className={`xp-window fixed ${isActive ? "" : "inactive"} ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: width,
        height: height,
        zIndex: isActive ? 100 : 50,
      }}
      onClick={() => onFocus && onFocus()}
    >
      {/* Window Header */}
      <div
        className={`xp-window-header ${isActive ? "" : "inactive"} select-none`}
        onMouseDown={handleMouseDown}
      >
        <span className="xp-text text-white">{title}</span>

        {/* Window Controls */}
        <div className="xp-window-controls">
          {onMinimize && (
            <button
              className="xp-control-button"
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              title="Réduire"
            >
              <Minus size={8} />
            </button>
          )}
          <button
            className="xp-control-button"
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
            }}
            title="Agrandir"
          >
            <Square size={6} />
          </button>
          {onClose && (
            <button
              className="xp-control-button close"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              title="Fermer"
            >
              <X size={8} />
            </button>
          )}
        </div>
      </div>

      {/* Window Content */}
      <div
        className="xp-window-content xp-scrollbar overflow-auto"
        style={{ height: height - 26 }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
