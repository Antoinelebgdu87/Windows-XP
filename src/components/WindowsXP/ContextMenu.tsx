import React from "react";
import { motion } from "framer-motion";
import { Refresh, Settings, FolderOpen, Trash2 } from "lucide-react";

interface ContextMenuProps {
  position: { x: number; y: number };
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  onClose,
  onAction,
}) => {
  const menuItems = [
    { id: "refresh", label: "Actualiser", icon: <Refresh size={14} /> },
    { type: "separator" },
    {
      id: "new-folder",
      label: "Nouveau dossier",
      icon: <FolderOpen size={14} />,
    },
    { type: "separator" },
    { id: "properties", label: "Propriétés", icon: <Settings size={14} /> },
  ];

  const handleItemClick = (action: string) => {
    onAction(action);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-998" onClick={onClose} />
      <motion.div
        className="xp-window fixed z-999"
        style={{
          left: position.x,
          top: position.y,
          width: "150px",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.1 }}
      >
        <div className="py-1">
          {menuItems.map((item, index) => {
            if (item.type === "separator") {
              return <div key={index} className="h-px bg-gray-300 mx-2 my-1" />;
            }

            return (
              <div
                key={item.id}
                className="px-3 py-1 cursor-pointer hover:bg-blue-100 flex items-center space-x-2 text-sm"
                onClick={() => handleItemClick(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default ContextMenu;
