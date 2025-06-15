import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image, Folder, X, Video } from "lucide-react";
import {
  useRecycleBin,
  RecycleBinItem,
} from "../../contexts/RecycleBinContext";

interface RecycleBinProps {
  onClose: () => void;
}

const RecycleBin: React.FC<RecycleBinProps> = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewingItem, setViewingItem] = useState<RecycleBinItem | null>(null);

  const { items: recycleBinItems } = useRecycleBin();

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
      case "video":
        return <Video size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const handleTextFileOpen = (content: string) => {
    // Vérifier si ce sont les identifiants admin factices
    if (content.includes("Admin12") && content.includes("Baka32")) {
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
                  {viewingItem.originalPath && (
                    <p>Emplacement: {viewingItem.originalPath}</p>
                  )}
                </div>
              </div>
            ) : viewingItem.type === "video" ? (
              <div className="text-center">
                {viewingItem.videoUrl ? (
                  <video
                    src={viewingItem.videoUrl}
                    controls
                    className="max-w-full max-h-[60vh] mx-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="bg-gray-200 p-8 rounded-lg">
                    <Video size={64} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Aperçu vidéo non disponible</p>
                  </div>
                )}
                <div className="mt-3 text-sm text-gray-600">
                  <p>Nom: {viewingItem.name}</p>
                  <p>Taille: {viewingItem.size}</p>
                  <p>Supprimé le: {viewingItem.dateDeleted}</p>
                  {viewingItem.originalPath && (
                    <p>Emplacement: {viewingItem.originalPath}</p>
                  )}
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

      {/* Info Panel - Lecture seule */}
      <div className="xp-panel p-3 text-xs bg-yellow-50 border-yellow-200">
        <div className="flex items-center space-x-2">
          <div className="text-yellow-700">ℹ️</div>
          <div>
            <strong>Mode lecture seule</strong> - Pour gérer la corbeille
            (ajouter, supprimer, vider), utilisez le panneau d'administration.
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="xp-panel flex-1 overflow-auto p-2">
        {recycleBinItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <Image size={32} className="text-gray-400" />
              </div>
              <p className="mb-2">La corbeille est vide</p>
              <p className="text-xs text-gray-400">
                Utilisez le panneau d'administration pour ajouter des fichiers
              </p>
            </div>
          </div>
        ) : (
          <>
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
                    selectedItem === item.id
                      ? "bg-blue-100 border-blue-300"
                      : ""
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
                        : item.type === "video"
                          ? "Fichier vidéo"
                          : "Dossier"}
                  </div>
                  <div>{item.dateDeleted}</div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Status Bar */}
      <div className="xp-panel p-2 text-xs bg-gray-100">
        <div className="flex justify-between">
          <span>
            {selectedItem
              ? `1 élément sélectionné`
              : `${recycleBinItems.length} éléments`}
          </span>
          <span>
            Espace utilisé: {Math.round(recycleBinItems.length * 2.3 * 10) / 10}{" "}
            Mo
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-gray-600 italic">
        💡 Double-cliquez sur un élément pour l'ouvrir • Gestion complète
        disponible dans le panneau d'administration
      </div>
    </div>
  );
};

export default RecycleBin;
