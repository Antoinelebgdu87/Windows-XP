import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Power,
  FileText,
  FolderOpen,
  Camera,
  Mail,
} from "lucide-react";

interface StartMenuProps {
  onClose: () => void;
  onAction: (action: string) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onAction }) => {
  const menuItems = [
    {
      id: "portfolio",
      icon: <User size={16} />,
      label: "À propos de moi",
      action: "open-portfolio",
      highlighted: true,
    },
    {
      id: "videos",
      icon: <Camera size={16} />,
      label: "Mes réalisations vidéo",
      action: "open-videos",
    },
    {
      id: "skills",
      icon: <FileText size={16} />,
      label: "Compétences techniques",
      action: "open-skills",
    },
    {
      id: "contact",
      icon: <Mail size={16} />,
      label: "Me contacter",
      action: "open-contact",
    },
    {
      id: "projects",
      icon: <FolderOpen size={16} />,
      label: "Documents récents",
      action: "open-projects",
    },
    { type: "separator" },
    {
      id: "settings",
      icon: <Settings size={16} />,
      label: "Panneau de configuration",
      action: "open-settings",
    },
    {
      id: "shutdown",
      icon: <Power size={16} />,
      label: "Arrêter l'ordinateur",
      action: "shutdown",
    },
  ];

  const handleItemClick = (action: string) => {
    onAction(action);
  };

  return (
    <>
      {/* Overlay to close menu when clicking outside */}
      <div className="fixed inset-0 z-999" onClick={onClose} />

      <motion.div
        className="xp-start-menu"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        {/* User Section */}
        <div className="xp-start-menu-header flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-2 border-white">
            <User size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm">Monteur Vidéo Pro</div>
            <div className="text-xs opacity-90">Windows XP Professional</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => {
            if (item.type === "separator") {
              return <div key={index} className="h-px bg-gray-300 mx-2 my-1" />;
            }

            return (
              <motion.div
                key={item.id}
                className={`xp-start-menu-item ${item.highlighted ? "bg-yellow-100" : ""}`}
                onClick={() => handleItemClick(item.action)}
                whileHover={{ backgroundColor: "#ddeeff" }}
                whileTap={{ backgroundColor: "#ccddee" }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`${item.highlighted ? "text-orange-600" : "text-gray-600"}`}
                  >
                    {item.icon}
                  </div>
                  <span
                    className={`${item.highlighted ? "font-semibold" : ""}`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.highlighted && (
                  <div className="ml-auto text-orange-500 text-xs">●</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* All Programs */}
        <div className="border-t border-gray-300 pt-2">
          <div className="xp-start-menu-item font-bold">
            <div className="flex items-center space-x-3">
              <div className="text-green-600">
                <FolderOpen size={16} />
              </div>
              <span>Tous les programmes</span>
            </div>
            <div className="ml-auto">▶</div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default StartMenu;
