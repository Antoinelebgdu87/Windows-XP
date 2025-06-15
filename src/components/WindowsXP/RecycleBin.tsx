import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image, Folder, X } from "lucide-react";

interface RecycleBinProps {
  onClose: () => void;
}

interface RecycleBinItem {
  id: string;
  name: string;
  type: "image" | "text" | "folder";
  size: string;
  dateDeleted: string;
  content?: string;
  imageUrl?: string;
}

const RecycleBin: React.FC<RecycleBinProps> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewingItem, setViewingItem] = useState<RecycleBinItem | null>(null);

  const recycleBinItems: RecycleBinItem[] = [
    {
      id: "img1",
      name: "image1.jpg",
      type: "image",
      size: "2.4 Mo",
      dateDeleted: "25/12/2024 14:20",
      imageUrl:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
    },
    {
      id: "img2",
      name: "image2.jpg",
      type: "image",
      size: "1.8 Mo",
      dateDeleted: "25/12/2024 14:19",
      imageUrl:
        "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg",
    },
    {
      id: "img3",
      name: "image3.jpg",
      type: "image",
      size: "3.1 Mo",
      dateDeleted: "25/12/2024 14:18",
      imageUrl:
        "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg",
    },
    {
      id: "img4",
      name: "image4.jpg",
      type: "image",
      size: "2.7 Mo",
      dateDeleted: "25/12/2024 14:17",
      imageUrl:
        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg",
    },
    {
      id: "admin-txt",
      name: "admin_credentials.txt",
      type: "text",
      size: "125 octets",
      dateDeleted: "25/12/2024 13:45",
      content: `IDENTIFIANTS ADMINISTRATEUR
=============================

Username: Admin
Password: Bakadu36

ATTENTION: Ne pas partager ces informations !
Accès réservé au personnel autorisé uniquement.

Dernière mise à jour: 25/12/2024
Système: Windows XP Professional`,
    },
  ];

  const handleItemClick = (item: RecycleBinItem) => {
    setSelectedItem(item.id);
  };

  const handleItemDoubleClick = (item: RecycleBinItem) => {
    setViewingItem(item);
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image size={16} className="text-blue-600" />;
      case "text":
        return <FileText size={16} className="text-gray-600" />;
      case "folder":
        return <Folder size={16} className="text-yellow-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const handleTextFileOpen = (content: string) => {
    // Vérifier si ce sont les identifiants admin factices
    if (content.includes("Admin") && content.includes("Bakadu36")) {
      // Rickroll !
      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank");
      return;
    }
    setViewingItem({
      ...recycleBinItems.find((item) => item.content === content)!,
    });
  };

  if (viewingItem) {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-2xl max-w-4xl max-h-[80vh] overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {getItemIcon(viewingItem.type)}
              <span className="font-bold">{viewingItem.name}</span>
            </div>
            <button
              onClick={() => setViewingItem(null)}
              className="hover:bg-blue-800 p-1 rounded"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {viewingItem.type === "image" ? (
              <div className="text-center">
                <img
                  src={viewingItem.imageUrl}
                  alt={viewingItem.name}
                  className="max-w-full max-h-[60vh] object-contain mx-auto rounded-lg shadow-lg"
                />
                <div className="mt-3 text-sm text-gray-600">
                  <p>Nom: {viewingItem.name}</p>
                  <p>Taille: {viewingItem.size}</p>
                  <p>Supprimé le: {viewingItem.dateDeleted}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                  {viewingItem.content}
                </pre>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-3 flex justify-end space-x-2">
            <button
              onClick={() => setViewingItem(null)}
              className="xp-button px-4 py-2"
            >
              Fermer
            </button>
            {viewingItem.type === "text" &&
              viewingItem.content?.includes("Admin") && (
                <button
                  onClick={() => handleTextFileOpen(viewingItem.content!)}
                  className="xp-button px-4 py-2 bg-blue-100"
                >
                  Se connecter
                </button>
              )}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="xp-text space-y-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <span className="mr-2">🗑️</span>
          Corbeille
        </h3>
        <div className="text-xs text-gray-600">
          {recycleBinItems.length} élément(s)
        </div>
      </div>

      {/* Toolbar */}
      <div className="xp-panel p-2 text-xs">
        <div className="flex space-x-4">
          <button className="xp-button text-xs px-3 py-1">Restaurer</button>
          <button className="xp-button text-xs px-3 py-1">
            Supprimer définitivement
          </button>
          <button className="xp-button text-xs px-3 py-1">
            Vider la corbeille
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="xp-panel flex-1 overflow-auto p-2">
        {/* Header row */}
        <div className="grid grid-cols-4 gap-2 bg-gray-200 p-2 text-xs font-bold border-b">
          <div>Nom</div>
          <div>Taille</div>
          <div>Type</div>
          <div>Date de suppression</div>
        </div>

        {/* Items */}
        <div className="space-y-1">
          {recycleBinItems.map((item) => (
            <motion.div
              key={item.id}
              className={`grid grid-cols-4 gap-2 p-2 text-xs cursor-pointer border-b hover:bg-blue-50 ${
                selectedItem === item.id ? "bg-blue-100 border-blue-300" : ""
              }`}
              onClick={() => handleItemClick(item)}
              onDoubleClick={() => handleItemDoubleClick(item)}
              whileHover={{ backgroundColor: "#f0f8ff" }}
            >
              <div className="flex items-center space-x-2">
                {getItemIcon(item.type)}
                <span>{item.name}</span>
              </div>
              <div>{item.size}</div>
              <div className="capitalize">
                {item.type === "image"
                  ? "Image JPEG"
                  : item.type === "text"
                    ? "Document texte"
                    : "Dossier"}
              </div>
              <div>{item.dateDeleted}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-panel p-2 text-xs bg-gray-100">
        <div className="flex justify-between">
          <span>
            {selectedItem
              ? `1 élément sélectionné`
              : `${recycleBinItems.length} éléments`}
          </span>
          <span>Espace libéré: 8.2 Mo</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-600 italic">
        💡 Double-cliquez sur un élément pour l'ouvrir
      </div>
    </div>
  );
};

export default RecycleBin;
