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
  MessageCircle,
  Star,
  Check,
  AlertCircle,
} from "lucide-react";
import {
  useRecycleBin,
  RecycleBinItem,
} from "../../contexts/RecycleBinContext";
import { useSaveData, VideoData } from "../../contexts/SaveDataContext";
import { useAutoSave } from "../../hooks/useAutoSave";
import ReviewModerationTools from "./ReviewModerationTools";

interface AdminPanelProps {
  onClose: () => void;
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
  const {
    items: recycleBinItems,
    addItem,
    removeItem,
    clearAll,
  } = useRecycleBin();

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

  const [isAddingFile, setIsAddingFile] = useState(false);
  const [newFile, setNewFile] = useState({
    name: "",
    type: "text" as RecycleBinItem["type"],
    size: "",
    content: "",
    originalPath: "",
    imageUrl: "",
    videoUrl: "",
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
      type: newFile.type,
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
      imageUrl: "",
      videoUrl: "",
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

  const getFileIcon = (type: RecycleBinItem["type"]) => {
    switch (type) {
      case "image":
        return <Image size={16} className="text-blue-600" />;
      case "video":
        return <Video size={16} className="text-red-600" />;
      case "folder":
        return <Folder size={16} className="text-yellow-600" />;
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
          { id: "reviews", label: "Avis Clients", icon: MessageCircle },
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
                      <th className="text-left p-3">Vues</th>
                      <th className="text-left p-3">Likes</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.videos.map((video) => (
                      <tr key={video.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">{video.title}</div>
                            <div className="text-gray-600 text-xs truncate max-w-xs">
                              {video.description}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                            {video.category}
                          </span>
                        </td>
                        <td className="p-3 font-medium">
                          {video.views.toLocaleString()}
                        </td>
                        <td className="p-3 font-medium">
                          {video.likes.toLocaleString()}
                        </td>
                        <td className="p-3 text-xs text-gray-600">
                          {video.date}
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEditVideo(video)}
                              className="xp-button p-1 bg-blue-100 hover:bg-blue-200"
                              title="Modifier"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteVideo(video.id)}
                              className="xp-button p-1 bg-red-100 hover:bg-red-200"
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

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Gestion des Avis Clients</h3>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">
                  Auto-sauvegarde:{" "}
                  {isAutoSaveEnabled ? "🟢 Activée" : "🔴 Désactivée"}
                </div>
                <button
                  onClick={() => {
                    if (confirm("Supprimer tous les avis en attente ?")) {
                      const updatedReviews = data.reviews.filter(
                        (r) => r.status !== "pending",
                      );
                      saveData({ reviews: updatedReviews });
                      console.log("🧹 Avis en attente supprimés");
                    }
                  }}
                  className="xp-button px-3 py-1 text-sm bg-orange-100"
                  disabled={
                    data.reviews.filter((r) => r.status === "pending")
                      .length === 0
                  }
                >
                  Supprimer En Attente
                </button>
                <button
                  onClick={() => {
                    if (confirm("Supprimer tous les avis rejetés ?")) {
                      const updatedReviews = data.reviews.filter(
                        (r) => r.status !== "rejected",
                      );
                      saveData({ reviews: updatedReviews });
                      console.log("🗑️ Avis rejetés supprimés");
                    }
                  }}
                  className="xp-button px-3 py-1 text-sm bg-red-100"
                  disabled={
                    data.reviews.filter((r) => r.status === "rejected")
                      .length === 0
                  }
                >
                  Nettoyer Rejetés
                </button>
                <button
                  onClick={toggleAutoSave}
                  className="xp-button px-3 py-1 text-sm"
                >
                  {isAutoSaveEnabled ? "Désactiver" : "Activer"} Auto-save
                </button>
              </div>
            </div>

            {/* Anti-Spam Tools */}
            <ReviewModerationTools
              reviews={data.reviews}
              onUpdateReviews={(updatedReviews) =>
                saveData({ reviews: updatedReviews })
              }
            />

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {data.reviews.filter((r) => r.status === "approved").length}
                </div>
                <div className="text-xs text-gray-600">Approuvés</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {data.reviews.filter((r) => r.status === "pending").length}
                </div>
                <div className="text-xs text-gray-600">En attente</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {data.reviews.filter((r) => r.status === "rejected").length}
                </div>
                <div className="text-xs text-gray-600">Rejetés</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {data.reviews.length > 0
                    ? (
                        data.reviews
                          .filter((r) => r.status === "approved")
                          .reduce((sum, r) => sum + r.rating, 0) /
                        Math.max(
                          data.reviews.filter((r) => r.status === "approved")
                            .length,
                          1,
                        )
                      ).toFixed(1)
                    : "0.0"}
                </div>
                <div className="text-xs text-gray-600">Note moyenne</div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="xp-panel">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Client</th>
                      <th className="text-left p-3">Note</th>
                      <th className="text-left p-3">Commentaire</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Statut</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.reviews.map((review) => (
                      <tr key={review.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <div className="font-medium">
                              {review.clientName}
                            </div>
                            <div className="text-gray-600 text-xs">
                              {review.email}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={
                                  star <= review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="ml-1 text-sm">
                              ({review.rating})
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="max-w-xs truncate">
                            {review.comment}
                          </div>
                        </td>
                        <td className="p-3 text-xs text-gray-600">
                          {new Date(review.date).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              review.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : review.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {review.status === "approved"
                              ? "Approuvé"
                              : review.status === "pending"
                                ? "En attente"
                                : "Rejeté"}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-1">
                            {review.status === "pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    const updatedReviews = data.reviews.map(
                                      (r) =>
                                        r.id === review.id
                                          ? {
                                              ...r,
                                              status: "approved" as const,
                                            }
                                          : r,
                                    );
                                    saveData({ reviews: updatedReviews });
                                    console.log(
                                      "✅ Avis approuvé:",
                                      review.clientName,
                                    );
                                  }}
                                  className="xp-button p-1 bg-green-100 hover:bg-green-200"
                                  title="Approuver"
                                >
                                  <Check size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    const updatedReviews = data.reviews.map(
                                      (r) =>
                                        r.id === review.id
                                          ? {
                                              ...r,
                                              status: "rejected" as const,
                                            }
                                          : r,
                                    );
                                    saveData({ reviews: updatedReviews });
                                    console.log(
                                      "❌ Avis rejeté:",
                                      review.clientName,
                                    );
                                  }}
                                  className="xp-button p-1 bg-red-100 hover:bg-red-200"
                                  title="Rejeter"
                                >
                                  <X size={14} />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => {
                                if (
                                  confirm("Supprimer définitivement cet avis ?")
                                ) {
                                  const updatedReviews = data.reviews.filter(
                                    (r) => r.id !== review.id,
                                  );
                                  saveData({ reviews: updatedReviews });
                                  console.log(
                                    "🗑️ Avis supprimé:",
                                    review.clientName,
                                  );
                                }
                              }}
                              className="xp-button p-1 bg-gray-100 hover:bg-gray-200"
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

        {activeTab === "settings" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Paramètres & Sauvegarde</h3>

            {/* Profil */}
            <div className="xp-panel p-4">
              <h4 className="font-semibold mb-4">Profil Public</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-200">
                  <img
                    src={data.settings.profilePicture}
                    alt={data.settings.displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1";
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium">{data.settings.displayName}</p>
                  <p className="text-sm text-gray-600">
                    Monteur Vidéo Professionnel
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Visible dans la fenêtre Avis Clients
                  </p>
                </div>
              </div>
              <p className="text-sm text-blue-600">
                💡 Pour modifier le profil, utilisez l'onglet "Mon Profil" dans
                la fenêtre Avis
              </p>
            </div>

            {/* Statistiques de sauvegarde */}
            <div className="xp-panel p-4">
              <h4 className="font-semibold mb-4">État des Données</h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {data.videos.length}
                  </div>
                  <div className="text-xs text-gray-600">Vidéos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {data.reviews.length}
                  </div>
                  <div className="text-xs text-gray-600">Avis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {data.recycleBin.length}
                  </div>
                  <div className="text-xs text-gray-600">
                    Fichiers Corbeille
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                ✅ Toutes les données sont automatiquement sauvegardées
              </div>
            </div>

            {/* Gestion des données */}
            <div className="xp-panel p-4">
              <h4 className="font-semibold mb-4">Gestion des Données</h4>
              <div className="flex gap-4">
                <button
                  onClick={handleExportData}
                  className="xp-button px-4 py-2 bg-blue-100 flex items-center gap-2"
                >
                  <Download size={16} />
                  Exporter Sauvegarde
                </button>
                <label className="xp-button px-4 py-2 bg-green-100 flex items-center gap-2 cursor-pointer">
                  <Upload size={16} />
                  Importer Sauvegarde
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={toggleAutoSave}
                  className={`xp-button px-4 py-2 flex items-center gap-2 ${
                    isAutoSaveEnabled ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  <RefreshCw size={16} />
                  Auto-save: {isAutoSaveEnabled ? "ON" : "OFF"}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Dernière sauvegarde:{" "}
                {new Date(data.lastSaved).toLocaleString("fr-FR")}
              </p>
            </div>

            {/* Actions de maintenance */}
            <div className="xp-panel p-4">
              <h4 className="font-semibold mb-4">Maintenance</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Réinitialiser toutes les données aux valeurs par défaut ?",
                      )
                    ) {
                      // Reset logic could be implemented here
                      alert("Fonction de reset à implémenter si nécessaire");
                    }
                  }}
                  className="xp-button px-4 py-2 bg-red-100 text-red-800"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => {
                    const stats = {
                      videos: data.videos.length,
                      reviews: data.reviews.length,
                      approved: data.reviews.filter(
                        (r) => r.status === "approved",
                      ).length,
                      pending: data.reviews.filter(
                        (r) => r.status === "pending",
                      ).length,
                      recycleBin: data.recycleBin.length,
                      lastSaved: data.lastSaved,
                    };
                    alert(
                      `📊 Rapport Système:\n\n` +
                        `Vidéos: ${stats.videos}\n` +
                        `Avis totaux: ${stats.reviews}\n` +
                        `Avis approuvés: ${stats.approved}\n` +
                        `En attente: ${stats.pending}\n` +
                        `Fichiers corbeille: ${stats.recycleBin}\n` +
                        `Dernière sauvegarde: ${new Date(stats.lastSaved).toLocaleString("fr-FR")}`,
                    );
                  }}
                  className="xp-button px-4 py-2 bg-gray-100"
                >
                  Rapport Système
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
