import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "./Window";
import Taskbar from "./Taskbar";
import XPIcon from "./XPIcon";
import ContextMenu from "./ContextMenu";
import {
  PortfolioContent,
  VideosContent,
  SkillsContent,
  ContactContent,
} from "./PortfolioContent";
import {
  User,
  Camera,
  FileText,
  Mail,
  FolderOpen,
  Monitor,
  Trash2,
} from "lucide-react";

interface DesktopIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  action: string;
}

interface OpenWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  width: number;
  height: number;
}

const Desktop: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    show: boolean;
    position: { x: number; y: number };
  }>({ show: false, position: { x: 0, y: 0 } });

  const desktopIcons: DesktopIcon[] = [
    {
      id: "portfolio",
      label: "Mon Portfolio",
      icon: <User size={32} className="text-blue-600" />,
      position: { x: 50, y: 50 },
      action: "open-portfolio",
    },
    {
      id: "videos",
      label: "Réalisations Vidéo",
      icon: <Camera size={32} className="text-red-600" />,
      position: { x: 50, y: 150 },
      action: "open-videos",
    },
    {
      id: "skills",
      label: "Compétences",
      icon: <FileText size={32} className="text-green-600" />,
      position: { x: 50, y: 250 },
      action: "open-skills",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail size={32} className="text-yellow-600" />,
      position: { x: 50, y: 350 },
      action: "open-contact",
    },
    {
      id: "computer",
      label: "Poste de travail",
      icon: <Monitor size={32} className="text-gray-600" />,
      position: { x: 50, y: 450 },
      action: "open-computer",
    },
    {
      id: "recycle",
      label: "Corbeille",
      icon: <Trash2 size={32} className="text-gray-500" />,
      position: { x: 50, y: 550 },
      action: "open-recycle",
    },
  ];

  const openWindow = (
    windowConfig: Omit<OpenWindow, "id"> & { id?: string },
  ) => {
    const id = windowConfig.id || Date.now().toString();
    const newWindow: OpenWindow = {
      ...windowConfig,
      id,
    };

    setOpenWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(id);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== windowId));
    setActiveWindowId((prev) => (prev === windowId ? null : prev));
  };

  const focusWindow = (windowId: string) => {
    setActiveWindowId(windowId);
  };

  const handleIconDoubleClick = (action: string) => {
    switch (action) {
      case "open-portfolio":
        openWindow({
          title: "À propos - Portfolio",
          content: <PortfolioContent />,
          position: { x: 200, y: 100 },
          width: 500,
          height: 400,
        });
        break;
      case "open-videos":
        openWindow({
          title: "Mes Réalisations Vidéo",
          content: <VideosContent />,
          position: { x: 250, y: 120 },
          width: 600,
          height: 450,
        });
        break;
      case "open-skills":
        openWindow({
          title: "Compétences Techniques",
          content: <SkillsContent />,
          position: { x: 300, y: 140 },
          width: 450,
          height: 350,
        });
        break;
      case "open-contact":
        openWindow({
          title: "Contact & Informations",
          content: <ContactContent />,
          position: { x: 350, y: 160 },
          width: 400,
          height: 300,
        });
        break;
      default:
        console.log("Action:", action);
    }
  };

  const handleStartMenuAction = (action: string) => {
    handleIconDoubleClick(action);
  };

  const taskbarButtons = openWindows.map((window) => ({
    id: window.id,
    title: window.title,
    isActive: activeWindowId === window.id,
    onClick: () => focusWindow(window.id),
  }));

  const handleDesktopClick = (e: React.MouseEvent) => {
    setSelectedIconId(null);
    setContextMenu({ show: false, position: { x: 0, y: 0 } });
  };

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const handleContextMenuAction = (action: string) => {
    console.log("Context menu action:", action);
    // Handle context menu actions here
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/14383012/pexels-photo-14383012.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
    >
      {/* Desktop Icons */}
      <div className="relative h-full">
        {desktopIcons.map((icon) => (
          <XPIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            position={icon.position}
            onDoubleClick={() => handleIconDoubleClick(icon.action)}
            isSelected={selectedIconId === icon.id}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {openWindows.map((window) => (
          <Window
            key={window.id}
            title={window.title}
            initialPosition={window.position}
            width={window.width}
            height={window.height}
            isActive={activeWindowId === window.id}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
          >
            {window.content}
          </Window>
        ))}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.show && (
          <ContextMenu
            position={contextMenu.position}
            onClose={() =>
              setContextMenu({ show: false, position: { x: 0, y: 0 } })
            }
            onAction={handleContextMenuAction}
          />
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        taskbarButtons={taskbarButtons}
        onStartMenuAction={handleStartMenuAction}
      />
    </div>
  );
};

export default Desktop;
