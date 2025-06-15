import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
  Upload,
  Shield,
  Video,
  FileText,
  Image,
  Folder,
  Download,
  RefreshCw,
} from "lucide-react";
import {
  useRecycleBin,
  RecycleBinItem,
} from "../../contexts/RecycleBinContext";
import { useSaveData, VideoData } from "../../contexts/SaveDataContext";
import { useAutoSave } from "../../hooks/useAutoSave";

interface AdminPanelProps {
  onClose: () => void;
}

interface VideoProject {
  id: string;
  title: string;
  duration: string;
  year: string;
  category: string;
  description: string;
  status: "published" | "draft" | "archived";
  views: number;
  lastModified: string;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const {
    data,
    saveData,
    exportData,
    importData,
    isAutoSaveEnabled,
    toggleAutoSave,
  } = useSaveData();

  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "videos" | "analytics" | "reviews" | "recycle" | "settings"
  >("videos");

  const [newVideo, setNewVideo] = useState<Partial<VideoData>>({
    title: "",
    description: "",
    category: "Gaming",
    thumbnail: "",
    url: "",
    views: 0,
    likes: 0,
    date: new Date().toISOString().split("T")[0],
  });

  // Auto-save hook pour sauvegarder automatiquement les changements
  const { saveNow } = useAutoSave(data.videos);

  useEffect(() => {
    console.log(`📊 Admin Panel: ${data.videos.length} vidéos chargées`);
  }, [data.videos]);

  // Gestion de la corbeille
  const {
    items: recycleBinItems,
    addItem,
    removeItem,
    clearAll,
  } = useRecycleBin();
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [newFile, setNewFile] = useState<Partial<RecycleBinItem>>({
    name: "",
    type: "text",
    size: "",
    content: "",
    originalPath: "",
  });

  const handleCreateVideo = () => {
    if (!newVideo.title || !newVideo.description) return;

    const video: VideoData = {
      id: Date.now().toString(),
      title: newVideo.title || "",
      description: newVideo.description || "",
      category: newVideo.category || "Gaming",
      thumbnail:
        newVideo.thumbnail ||
        "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg",
      url: newVideo.url || "",
      views: newVideo.views || 0,
      likes: newVideo.likes || 0,
      date: newVideo.date || new Date().toISOString().split("T")[0],
    };

    const updatedVideos = [...data.videos, video];
    saveData({ videos: updatedVideos });

    setNewVideo({
      title: "",
      description: "",
      category: "Gaming",
      thumbnail: "",
      url: "",
      views: 0,
      likes: 0,
      date: new Date().toISOString().split("T")[0],
    });
    setIsCreating(false);
    console.log("🎬 Nouvelle vidéo créée:", video.title);
  };

  const handleEditVideo = (video: VideoData) => {
    setEditingVideo({ ...video });
  };

  const handleSaveEdit = () => {
    if (!editingVideo) return;

    const updatedVideos = data.videos.map((v) =>
      v.id === editingVideo.id ? editingVideo : v,
    );
    saveData({ videos: updatedVideos });
    setEditingVideo(null);
    console.log("✏️ Vidéo modifiée:", editingVideo.title);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
      const updatedVideos = data.videos.filter((v) => v.id !== id);
      saveData({ videos: updatedVideos });
      console.log("🗑️ Vidéo supprimée");
    }
  };

  const handleExportData = () => {
    const dataStr = exportData();
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `linolvt_portfolio_backup_${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    console.log("📦 Sauvegarde exportée");
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (importData(content)) {
        alert("Sauvegarde importée avec succès !");
      } else {
        alert("Erreur lors de l'importation de la sauvegarde.");
      }
    };
    reader.readAsText(file);
  };

  const handleAddFile = () => {
    if (!newFile.name || !newFile.size) return;

    const file: Omit<RecycleBinItem, "id" | "dateDeleted"> = {
      name: newFile.name,
      type: (newFile.type as RecycleBinItem["type"]) || "text",
      size: newFile.size,
      content: newFile.content || "",
      originalPath: newFile.originalPath || "C:\\Temp",
      imageUrl: newFile.type === "image" ? newFile.imageUrl : undefined,
      videoUrl: newFile.type === "video" ? newFile.videoUrl : undefined,
    };

    addItem(file);
    setNewFile({
      name: "",
      type: "text",
      size: "",
      content: "",
      originalPath: "",
    });
    setIsAddingFile(false);
  };

  const handleDeleteFromRecycle = (id: string) => {
    if (confirm("Supprimer définitivement ce fichier de la corbeille ?")) {
      removeItem(id);
    }
  };

  const handleClearRecycleBin = () => {
    if (confirm("Vider complètement la corbeille ?")) {
      clearAll();
    }
  };

  const getStatusColor = (status: VideoProject["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: VideoProject["status"]) => {
    switch (status) {
      case "published":
        return "Publié";
      case "draft":
        return "Brouillon";
      case "archived":
        return "Archivé";
      default:
        return "Inconnu";
    }
  };

  const getFileIcon = (type: string) => {
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

  return (
    <div className="xp-text h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield size={24} />
          <div>
            <h2 className="text-lg font-bold">Panneau d'Administration</h2>
            <p className="text-sm opacity-90">Gestion du Portfolio Vidéo</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <div>Connecté: admin12</div>
          <div className="opacity-75">Accès: Administrateur</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-100 border-b flex">
        {[
          { id: "videos", label: "Vidéos", icon: Video },
          { id: "analytics", label: "Statistiques", icon: Eye },
          { id: "recycle", label: "Corbeille", icon: Trash2 },
          { id: "settings", label: "Paramètres", icon: Shield },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 flex items-center space-x-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-blue-500 bg-white text-blue-600"
                : "border-transparent hover:bg-gray-200"
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "videos" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Gestion des Vidéos</h3>
              <button
                onClick={() => setIsCreating(true)}
                className="xp-button px-4 py-2 bg-green-100 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Nouvelle Vidéo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.videos.length}
                </div>
                <div className="text-xs text-gray-600">Publiées</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {data.videos.filter((v) => v.date).length}
                </div>
                <div className="text-xs text-gray-600">Créations</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {data.videos.reduce((acc, v) => acc + v.views, 0)}
                </div>
                <div className="text-xs text-gray-600">Vues totales</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {data.videos.reduce((acc, v) => acc + v.likes, 0)}
                </div>
                <div className="text-xs text-gray-600">Likes totaux</div>
              </div>
            </div>

            {/* Video List */}
            <div className="xp-panel">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Titre</th>
                      <th className="text-left p-3">Catégorie</th>
                      <th className="text-left p-3">Durée</th>
                      <th className="text-left p-3">Statut</th>
                      <th className="text-left p-3">Vues</th>
                      <th className="text-left p-3">Modifié</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.videos.map((video) => (
                      <tr key={video.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{video.title}</div>
                            <div className="text-gray-600 text-xs">
                              {video.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {video.category}
                          </span>
                        </td>
                        <td className="p-3">{video.duration}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${getStatusColor(video.status)}`}
                          >
                            {getStatusLabel(video.status)}
                          </span>
                        </td>
                        <td className="p-3">{video.views.toLocaleString()}</td>
                        <td className="p-3 text-gray-600">
                          {video.lastModified}
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditVideo(video)}
                              className="text-blue-600 hover:bg-blue-100 p-1 rounded"
                              title="Modifier"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-red-600 hover:bg-red-100 p-1 rounded"
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Statistiques</h3>
            <div className="xp-panel p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">Vues par catégorie</h4>
                  {[
                    "Gaming",
                    "Tutorial",
                    "Comedy",
                    "Horror",
                    "Building",
                    "Review",
                  ].map((cat) => {
                    const categoryVideos = data.videos.filter(
                      (v) => v.category === cat,
                    );
                    const totalViews = categoryVideos.reduce(
                      (acc, v) => acc + v.views,
                      0,
                    );
                    return (
                      <div key={cat} className="flex justify-between mb-2">
                        <span>{cat}</span>
                        <span className="font-bold">{totalViews}</span>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h4 className="font-bold mb-3">Vidéos les plus vues</h4>
                  {data.videos
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 3)
                    .map((video) => (
                      <div key={video.id} className="flex justify-between mb-2">
                        <span className="truncate mr-2">{video.title}</span>
                        <span className="font-bold">{video.views}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "recycle" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Gestion de la Corbeille</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsAddingFile(true)}
                  className="xp-button px-4 py-2 bg-green-100 flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Ajouter un fichier</span>
                </button>
                <button
                  onClick={handleClearRecycleBin}
                  className="xp-button px-4 py-2 bg-red-100 flex items-center space-x-2"
                  disabled={recycleBinItems.length === 0}
                >
                  <Trash2 size={16} />
                  <span>Vider la corbeille</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {
                    recycleBinItems.filter((item) => item.type === "image")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-600">Images</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    recycleBinItems.filter((item) => item.type === "text")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-600">Documents</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {
                    recycleBinItems.filter((item) => item.type === "video")
                      .length
                  }
                </div>
                <div className="text-xs text-gray-600">Vidéos</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {recycleBinItems.length}
                </div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
            </div>

            {/* File List */}
            <div className="xp-panel">
              {recycleBinItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Trash2 size={48} className="mx-auto mb-4 opacity-50" />
                  <p>La corbeille est vide</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left p-3">Nom</th>
                        <th className="text-left p-3">Type</th>
                        <th className="text-left p-3">Taille</th>
                        <th className="text-left p-3">Emplacement original</th>
                        <th className="text-left p-3">Date suppression</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recycleBinItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              {getFileIcon(item.type)}
                              <span>{item.name}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="capitalize">
                              {item.type === "image"
                                ? "Image"
                                : item.type === "text"
                                  ? "Document"
                                  : item.type === "video"
                                    ? "Vidéo"
                                    : "Autre"}
                            </span>
                          </td>
                          <td className="p-3">{item.size}</td>
                          <td className="p-3 text-gray-600">
                            {item.originalPath || "Inconnu"}
                          </td>
                          <td className="p-3 text-gray-600">
                            {item.dateDeleted}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleDeleteFromRecycle(item.id)}
                              className="text-red-600 hover:bg-red-100 p-1 rounded"
                              title="Supprimer définitivement"
                            >
                              <X size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Paramètres</h3>
            <div className="xp-panel p-4 space-y-4">
              <div>
                <label className="block font-bold mb-2">Nom du Portfolio</label>
                <input
                  type="text"
                  defaultValue="lino.lvt - Portfolio Roblox"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Email de Contact</label>
                <input
                  type="email"
                  defaultValue="linolvt.pro@gmail.com"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Description</label>
                <textarea
                  defaultValue="Monteur vidéo spécialisé Roblox - +1M vues générées - 2 ans d'expérience"
                  className="w-full p-2 border rounded h-20"
                />
              </div>
              <button className="xp-button px-4 py-2 bg-blue-100">
                Sauvegarder les paramètres
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(isCreating || editingVideo || isAddingFile) && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[300]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                <h3 className="font-bold">
                  {isAddingFile
                    ? "Ajouter un fichier à la corbeille"
                    : isCreating
                      ? "Nouvelle Vidéo"
                      : "Modifier la Vidéo"}
                </h3>
              </div>

              <div className="p-4 space-y-4">
                {isAddingFile ? (
                  <>
                    <div>
                      <label className="block font-bold mb-1">
                        Nom du fichier *
                      </label>
                      <input
                        type="text"
                        value={newFile.name || ""}
                        onChange={(e) =>
                          setNewFile({ ...newFile, name: e.target.value })
                        }
                        className="w-full p-2 border rounded text-sm"
                        placeholder="exemple.txt"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">
                          Type de fichier
                        </label>
                        <select
                          value={newFile.type || "text"}
                          onChange={(e) =>
                            setNewFile({
                              ...newFile,
                              type: e.target.value as RecycleBinItem["type"],
                            })
                          }
                          className="w-full p-2 border rounded text-sm"
                        >
                          <option value="text">Document texte</option>
                          <option value="image">Image</option>
                          <option value="video">Vidéo</option>
                          <option value="folder">Dossier</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Taille *</label>
                        <input
                          type="text"
                          value={newFile.size || ""}
                          onChange={(e) =>
                            setNewFile({ ...newFile, size: e.target.value })
                          }
                          className="w-full p-2 border rounded text-sm"
                          placeholder="2.5 Mo"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">
                        Emplacement original
                      </label>
                      <input
                        type="text"
                        value={newFile.originalPath || ""}
                        onChange={(e) =>
                          setNewFile({
                            ...newFile,
                            originalPath: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded text-sm"
                        placeholder="C:\Users\Monteur\Documents"
                      />
                    </div>

                    {newFile.type === "text" && (
                      <div>
                        <label className="block font-bold mb-1">
                          Contenu du fichier
                        </label>
                        <textarea
                          value={newFile.content || ""}
                          onChange={(e) =>
                            setNewFile({ ...newFile, content: e.target.value })
                          }
                          className="w-full p-2 border rounded text-sm h-24"
                          placeholder="Contenu du document..."
                        />
                      </div>
                    )}

                    {newFile.type === "image" && (
                      <div>
                        <label className="block font-bold mb-1">
                          URL de l'image
                        </label>
                        <input
                          type="url"
                          value={newFile.imageUrl || ""}
                          onChange={(e) =>
                            setNewFile({ ...newFile, imageUrl: e.target.value })
                          }
                          className="w-full p-2 border rounded text-sm"
                          placeholder="https://..."
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
                          value={newFile.videoUrl || ""}
                          onChange={(e) =>
                            setNewFile({ ...newFile, videoUrl: e.target.value })
                          }
                          className="w-full p-2 border rounded text-sm"
                          placeholder="https://..."
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block font-bold mb-1">Titre *</label>
                      <input
                        type="text"
                        value={
                          isCreating
                            ? newVideo.title || ""
                            : editingVideo?.title || ""
                        }
                        onChange={(e) =>
                          isCreating
                            ? setNewVideo({
                                ...newVideo,
                                title: e.target.value,
                              })
                            : setEditingVideo({
                                ...editingVideo!,
                                title: e.target.value,
                              })
                        }
                        className="w-full p-2 border rounded text-sm"
                        placeholder="Titre de la vidéo"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1">Durée *</label>
                        <input
                          type="text"
                          value={
                            isCreating
                              ? newVideo.duration || ""
                              : editingVideo?.duration || ""
                          }
                          onChange={(e) =>
                            isCreating
                              ? setNewVideo({
                                  ...newVideo,
                                  duration: e.target.value,
                                })
                              : setEditingVideo({
                                  ...editingVideo!,
                                  duration: e.target.value,
                                })
                          }
                          className="w-full p-2 border rounded text-sm"
                          placeholder="2m30s"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">Année</label>
                        <input
                          type="text"
                          value={
                            isCreating
                              ? newVideo.year || ""
                              : editingVideo?.year || ""
                          }
                          onChange={(e) =>
                            isCreating
                              ? setNewVideo({
                                  ...newVideo,
                                  year: e.target.value,
                                })
                              : setEditingVideo({
                                  ...editingVideo!,
                                  year: e.target.value,
                                })
                          }
                          className="w-full p-2 border rounded text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Catégorie</label>
                      <select
                        value={
                          isCreating
                            ? newVideo.category || "Commercial"
                            : editingVideo?.category || "Commercial"
                        }
                        onChange={(e) =>
                          isCreating
                            ? setNewVideo({
                                ...newVideo,
                                category: e.target.value,
                              })
                            : setEditingVideo({
                                ...editingVideo!,
                                category: e.target.value,
                              })
                        }
                        className="w-full p-2 border rounded text-sm"
                      >
                        <option value="Gaming">Gaming</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        <option value="Building">Building</option>
                        <option value="Review">Review</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">
                        Description
                      </label>
                      <textarea
                        value={
                          isCreating
                            ? newVideo.description || ""
                            : editingVideo?.description || ""
                        }
                        onChange={(e) =>
                          isCreating
                            ? setNewVideo({
                                ...newVideo,
                                description: e.target.value,
                              })
                            : setEditingVideo({
                                ...editingVideo!,
                                description: e.target.value,
                              })
                        }
                        className="w-full p-2 border rounded text-sm h-20"
                        placeholder="Description de la vidéo..."
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Statut</label>
                      <select
                        value={
                          isCreating
                            ? newVideo.status || "draft"
                            : editingVideo?.status || "draft"
                        }
                        onChange={(e) =>
                          isCreating
                            ? setNewVideo({
                                ...newVideo,
                                status: e.target
                                  .value as VideoProject["status"],
                              })
                            : setEditingVideo({
                                ...editingVideo!,
                                status: e.target
                                  .value as VideoProject["status"],
                              })
                        }
                        className="w-full p-2 border rounded text-sm"
                      >
                        <option value="draft">Brouillon</option>
                        <option value="published">Publié</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 border-t flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingVideo(null);
                    setIsAddingFile(false);
                  }}
                  className="xp-button px-4 py-2"
                >
                  Annuler
                </button>
                <button
                  onClick={
                    isAddingFile
                      ? handleAddFile
                      : isCreating
                        ? handleCreateVideo
                        : handleSaveEdit
                  }
                  className="xp-button px-4 py-2 bg-blue-100"
                  disabled={
                    isAddingFile
                      ? !newFile.name || !newFile.size
                      : isCreating || editingVideo
                        ? !(
                            (isCreating
                              ? newVideo.title
                              : editingVideo?.title) &&
                            (isCreating
                              ? newVideo.duration
                              : editingVideo?.duration)
                          )
                        : false
                  }
                >
                  {isAddingFile
                    ? "Ajouter"
                    : isCreating
                      ? "Créer"
                      : "Sauvegarder"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
