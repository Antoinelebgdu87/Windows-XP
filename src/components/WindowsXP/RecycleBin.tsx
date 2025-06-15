import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image, Folder, X, Video, Plus, Upload } from "lucide-react";
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
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFile, setNewFile] = useState<Partial<RecycleBinItem>>({
    name: "",
    type: "image",
    size: "",
    content: "",
    originalPath: "C:\\Users\\Monteur\\Images",
    imageUrl: "",
  });

  const {
    items: recycleBinItems,
    addItem,
    removeItem,
    restoreItem,
    clearAll,
  } = useRecycleBin();

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
    if (content.includes("Admin") && content.includes("Bakadu36")) {
      // Rickroll !
      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0", "_blank");
      return;
    }
    setViewingItem({
      ...recycleBinItems.find((item) => item.content === content)!,
    });
  };

  const handleRestore = () => {
    if (selectedItem) {
      restoreItem(selectedItem);
      setSelectedItem(null);
    }
  };

  const handleDelete = () => {
    if (selectedItem && confirm("Supprimer définitivement ce fichier ?")) {
      removeItem(selectedItem);
      setSelectedItem(null);
    }
  };

  const handleClearAll = () => {
    if (confirm("Vider complètement la corbeille ?")) {
      clearAll();
      setSelectedItem(null);
    }
  };

  const handleAddFile = () => {
    if (!newFile.name || !newFile.size) return;

    const file: Omit<RecycleBinItem, "id" | "dateDeleted"> = {
      name: newFile.name,
      type: (newFile.type as RecycleBinItem["type"]) || "image",
      size: newFile.size,
      content: newFile.content || "",
      originalPath: newFile.originalPath || "C:\\Users\\Monteur\\Images",
      imageUrl: newFile.type === "image" ? newFile.imageUrl : undefined,
      videoUrl: newFile.type === "video" ? newFile.videoUrl : undefined,
    };

    addItem(file);
    setNewFile({
      name: "",
      type: "image",
      size: "",
      content: "",
      originalPath: "C:\\Users\\Monteur\\Images",
      imageUrl: "",
    });
    setShowAddModal(false);
  };

  // Quelques URLs d'images populaires comme suggestions
  const sampleImages = [
    {
      name: "paysage.jpg",
      url: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg",
      size: "3.2 Mo",
    },
    {
      name: "city.jpg",
      url: "https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg",
      size: "2.8 Mo",
    },
    {
      name: "nature.jpg",
      url: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg",
      size: "4.1 Mo",
    },
    {
      name: "sunset.jpg",
      url: "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg",
      size: "3.5 Mo",
    },
  ];

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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="xp-button text-xs px-3 py-1 bg-green-100 flex items-center space-x-1"
          >
            <Plus size={12} />
            <span>Ajouter</span>
          </button>
          <div className="text-xs text-gray-600">
            {recycleBinItems.length} élément(s)
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="xp-panel p-2 text-xs">
        <div className="flex space-x-4">
          <button
            className={`xp-button text-xs px-3 py-1 ${!selectedItem ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleRestore}
            disabled={!selectedItem}
          >
            Restaurer
          </button>
          <button
            className={`xp-button text-xs px-3 py-1 ${!selectedItem ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleDelete}
            disabled={!selectedItem}
          >
            Supprimer définitivement
          </button>
          <button
            className={`xp-button text-xs px-3 py-1 ${recycleBinItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleClearAll}
            disabled={recycleBinItems.length === 0}
          >
            Vider la corbeille
          </button>
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
              <p className="mb-4">La corbeille est vide</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="xp-button px-4 py-2 bg-blue-100"
              >
                Ajouter des fichiers
              </button>
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
        💡 Sélectionnez un fichier et utilisez les boutons ci-dessus •
        Double-cliquez pour ouvrir
      </div>

      {/* Add File Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl w-full max-w-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 className="font-bold flex items-center">
                  <Upload size={20} className="mr-2" />
                  Ajouter un fichier à la corbeille
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block font-bold mb-2">
                    Type de fichier
                  </label>
                  <select
                    value={newFile.type}
                    onChange={(e) =>
                      setNewFile({
                        ...newFile,
                        type: e.target.value as RecycleBinItem["type"],
                      })
                    }
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="image">🖼️ Image</option>
                    <option value="text">📄 Document texte</option>
                    <option value="video">🎬 Vidéo</option>
                    <option value="folder">📁 Dossier</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">
                      Nom du fichier *
                    </label>
                    <input
                      type="text"
                      value={newFile.name}
                      onChange={(e) =>
                        setNewFile({ ...newFile, name: e.target.value })
                      }
                      className="w-full p-2 border rounded text-sm"
                      placeholder="mon_fichier.jpg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Taille *</label>
                    <input
                      type="text"
                      value={newFile.size}
                      onChange={(e) =>
                        setNewFile({ ...newFile, size: e.target.value })
                      }
                      className="w-full p-2 border rounded text-sm"
                      placeholder="2.5 Mo"
                    />
                  </div>
                </div>

                {newFile.type === "image" && (
                  <>
                    <div>
                      <label className="block font-bold mb-1">
                        URL de l'image *
                      </label>
                      <input
                        type="url"
                        value={newFile.imageUrl}
                        onChange={(e) =>
                          setNewFile({ ...newFile, imageUrl: e.target.value })
                        }
                        className="w-full p-2 border rounded text-sm"
                        placeholder="https://images.pexels.com/..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-2">
                        Ou choisir parmi ces images :
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {sampleImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setNewFile({
                                ...newFile,
                                name: img.name,
                                imageUrl: img.url,
                                size: img.size,
                              });
                            }}
                            className="p-2 border rounded hover:bg-blue-50 text-left text-xs"
                          >
                            <div className="font-medium">{img.name}</div>
                            <div className="text-gray-600">{img.size}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {newFile.type === "text" && (
                  <div>
                    <label className="block font-bold mb-1">
                      Contenu du fichier
                    </label>
                    <textarea
                      value={newFile.content}
                      onChange={(e) =>
                        setNewFile({ ...newFile, content: e.target.value })
                      }
                      className="w-full p-2 border rounded text-sm h-24"
                      placeholder="Contenu du document..."
                    />
                  </div>
                )}

                {newFile.type === "video" && (
                  <div>
                    <label className="block font-bold mb-1">
                      URL de la vidéo
                    </label>
                    <input
                      type="url"
                      value={newFile.videoUrl}
                      onChange={(e) =>
                        setNewFile({ ...newFile, videoUrl: e.target.value })
                      }
                      className="w-full p-2 border rounded text-sm"
                      placeholder="https://..."
                    />
                  </div>
                )}

                <div>
                  <label className="block font-bold mb-1">
                    Emplacement original
                  </label>
                  <input
                    type="text"
                    value={newFile.originalPath}
                    onChange={(e) =>
                      setNewFile({ ...newFile, originalPath: e.target.value })
                    }
                    className="w-full p-2 border rounded text-sm"
                    placeholder="C:\Users\Monteur\Images"
                  />
                </div>
              </div>

              <div className="p-4 border-t flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="xp-button px-4 py-2"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddFile}
                  className="xp-button px-4 py-2 bg-blue-100"
                  disabled={!newFile.name || !newFile.size}
                >
                  Ajouter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecycleBin;
