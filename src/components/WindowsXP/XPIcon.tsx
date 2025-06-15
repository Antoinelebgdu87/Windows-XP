import React from "react";
import { motion } from "framer-motion";

interface XPIconProps {
  icon: React.ReactNode;
  label: string;
  position: { x: number; y: number };
  onDoubleClick: () => void;
  isSelected?: boolean;
}

const XPIcon: React.FC<XPIconProps> = ({
  icon,
  label,
  position,
  onDoubleClick,
  isSelected = false,
}) => {
  return (
    <motion.div
      className={`absolute cursor-pointer select-none ${
        isSelected ? "bg-blue-500 bg-opacity-30 border border-blue-400" : ""
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: "120px",
        height: "100px",
      }}
      onDoubleClick={onDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center justify-center h-full p-2">
        <div className="mb-1">{icon}</div>
        <div
          className="text-white text-xs text-center leading-tight"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            fontSize: "12px",
            maxWidth: "116px",
            wordWrap: "break-word",
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default XPIcon;
