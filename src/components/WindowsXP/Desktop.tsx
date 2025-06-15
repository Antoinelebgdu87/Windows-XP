import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "./Window";
import Taskbar from "./Taskbar";
import XPIcon from "./XPIcon";
import ContextMenu from "./ContextMenu";
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

// Window Content Components
const PortfolioContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-blue-800">
      Bienvenue dans mon Portfolio
    </h2>
    <div className="space-y-3">
      <p>
        <strong>Monteur Vidéo Professionnel</strong>
      </p>
      <p>
        Passionné par la création audiovisuelle, je transforme vos idées en
        histoires captivantes. Avec plusieurs années d'expérience dans le
        montage vidéo, je maîtrise les dernières technologies et techniques de
        post-production.
      </p>
      <div className="xp-panel">
        <h3 className="font-bold mb-2">Spécialisations :</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Montage publicitaire et commercial</li>
          <li>Clips musicaux et artistiques</li>
          <li>Documentaires et reportages</li>
          <li>Contenu pour réseaux sociaux</li>
          <li>Étalonnage et post-production</li>
        </ul>
      </div>
      <p className="text-sm italic">
        "Chaque projet est unique et mérite une approche créative
        personnalisée."
      </p>
    </div>
  </div>
);

const VideosContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-red-800">Mes Réalisations</h2>
    <div className="grid grid-cols-2 gap-4">
      {[
        { title: "Pub Nike Air Max", duration: "30s", year: "2024" },
        { title: "Clip - Artiste Local", duration: "3m45s", year: "2024" },
        { title: "Documentaire Nature", duration: "15min", year: "2023" },
        { title: "Série Web - Episode 1", duration: "8min", year: "2024" },
        { title: "Mariage Deluxe", duration: "4min", year: "2024" },
        { title: "Corporate Video", duration: "2min", year: "2024" },
      ].map((video, index) => (
        <div
          key={index}
          className="xp-panel text-sm cursor-pointer hover:bg-blue-50"
        >
          <div className="font-bold">{video.title}</div>
          <div className="text-gray-600">
            {video.duration} • {video.year}
          </div>
          <div className="mt-1 text-xs text-blue-600">📹 Cliquer pour voir</div>
        </div>
      ))}
    </div>
    <div className="xp-panel bg-yellow-50">
      <div className="text-sm">
        <strong>🎬 Portfolio complet disponible sur demande</strong>
        <br />
        Contactez-moi pour accéder à ma showreel et projets confidentiels.
      </div>
    </div>
  </div>
);

const SkillsContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-green-800">Compétences Techniques</h2>
    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-2">Logiciels de Montage</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Adobe Premiere Pro</span>
            <span className="text-green-600">Expert ■■■■■</span>
          </div>
          <div className="flex justify-between">
            <span>After Effects</span>
            <span className="text-green-600">Expert ■■■■■</span>
          </div>
          <div className="flex justify-between">
            <span>DaVinci Resolve</span>
            <span className="text-blue-600">Avancé ■■■■□</span>
          </div>
          <div className="flex justify-between">
            <span>Final Cut Pro</span>
            <span className="text-blue-600">Avancé ■■■■□</span>
          </div>
        </div>
      </div>

      <div className="xp-panel">
        <h3 className="font-bold mb-2">Compétences Créatives</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>• Storytelling</div>
          <div>• Color Grading</div>
          <div>• Motion Graphics</div>
          <div>• Sound Design</div>
          <div>• Effet Spéciaux</div>
          <div>• Montage Rythmé</div>
        </div>
      </div>

      <div className="xp-panel">
        <h3 className="font-bold mb-2">Formats & Codecs</h3>
        <div className="text-sm">
          4K, 8K, HDR, ProRes, H.264, H.265, RED, Cinema DNG
        </div>
      </div>
    </div>
  </div>
);

const ContactContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-yellow-800">
      Contact & Informations
    </h2>
    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-2">Coordonnées</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Mail size={14} />
            <span>contact@monteurvideo.fr</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📱</span>
            <span>+33 6 12 34 56 78</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📍</span>
            <span>Paris, France</span>
          </div>
        </div>
      </div>

      <div className="xp-panel">
        <h3 className="font-bold mb-2">Réseaux Sociaux</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>LinkedIn</span>
            <button className="xp-button text-xs">Visiter</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Instagram</span>
            <button className="xp-button text-xs">Suivre</button>
          </div>
          <div className="flex justify-between items-center">
            <span>YouTube</span>
            <button className="xp-button text-xs">S'abonner</button>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-blue-50">
        <h3 className="font-bold mb-2">Disponibilité</h3>
        <div className="text-sm">
          <div className="text-green-600 font-bold">
            ● Disponible pour nouveaux projets
          </div>
          <div className="mt-1">Temps de réponse : 24h maximum</div>
          <div>Devis gratuit sous 48h</div>
        </div>
      </div>

      <div className="text-center">
        <button className="xp-button px-6 py-2">Envoyer un message</button>
      </div>
    </div>
  </div>
);

export default Desktop;
