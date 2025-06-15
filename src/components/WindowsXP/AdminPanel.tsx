import React, { useState } from "react";
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
} from "lucide-react";

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
  const [videos, setVideos] = useState<VideoProject[]>([
    {
      id: "1",
      title: "Campagne Nike Air Max 2024",
      duration: "30s",
      year: "2024",
      category: "Publicité",
      description: "Montage dynamique avec effets spéciaux",
      status: "published",
      views: 1547,
      lastModified: "25/12/2024",
    },
    {
      id: "2",
      title: "Clip - Artist Émergent",
      duration: "3m45s",
      year: "2024",
      category: "Musical",
      description: "Direction artistique et montage créatif",
      status: "published",
      views: 2341,
      lastModified: "24/12/2024",
    },
    {
      id: "3",
      title: "Documentaire 'Nature Urbaine'",
      duration: "15min",
      year: "2023",
      category: "Documentaire",
      description: "Narration immersive et étalonnage naturel",
      status: "published",
      views: 892,
      lastModified: "23/12/2024",
    },
    {
      id: "4",
      title: "Projet Secret Client X",
      duration: "2m15s",
      year: "2024",
      category: "Commercial",
      description: "En cours de finalisation",
      status: "draft",
      views: 0,
      lastModified: "22/12/2024",
    },
  ]);

  const [editingVideo, setEditingVideo] = useState<VideoProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "videos" | "analytics" | "settings"
  >("videos");

  const [newVideo, setNewVideo] = useState<Partial<VideoProject>>({
    title: "",
    duration: "",
    year: "2024",
    category: "Commercial",
    description: "",
    status: "draft",
  });

  const handleCreateVideo = () => {
    if (!newVideo.title || !newVideo.duration) return;

    const video: VideoProject = {
      id: Date.now().toString(),
      title: newVideo.title,
      duration: newVideo.duration,
      year: newVideo.year || "2024",
      category: newVideo.category || "Commercial",
      description: newVideo.description || "",
      status: (newVideo.status as VideoProject["status"]) || "draft",
      views: 0,
      lastModified: new Date().toLocaleDateString("fr-FR"),
    };

    setVideos([...videos, video]);
    setNewVideo({
      title: "",
      duration: "",
      year: "2024",
      category: "Commercial",
      description: "",
      status: "draft",
    });
    setIsCreating(false);
  };

  const handleEditVideo = (video: VideoProject) => {
    setEditingVideo({ ...video });
  };

  const handleSaveEdit = () => {
    if (!editingVideo) return;

    setVideos(
      videos.map((v) =>
        v.id === editingVideo.id
          ? {
              ...editingVideo,
              lastModified: new Date().toLocaleDateString("fr-FR"),
            }
          : v,
      ),
    );
    setEditingVideo(null);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
      setVideos(videos.filter((v) => v.id !== id));
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
                  {videos.filter((v) => v.status === "published").length}
                </div>
                <div className="text-xs text-gray-600">Publiées</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {videos.filter((v) => v.status === "draft").length}
                </div>
                <div className="text-xs text-gray-600">Brouillons</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {videos.reduce((acc, v) => acc + v.views, 0)}
                </div>
                <div className="text-xs text-gray-600">Vues totales</div>
              </div>
              <div className="xp-panel p-3 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {videos.length}
                </div>
                <div className="text-xs text-gray-600">Total vidéos</div>
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
                    {videos.map((video) => (
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
                  {["Publicité", "Musical", "Documentaire", "Commercial"].map(
                    (cat) => {
                      const categoryVideos = videos.filter(
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
                    },
                  )}
                </div>
                <div>
                  <h4 className="font-bold mb-3">Vidéos les plus vues</h4>
                  {videos
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

        {activeTab === "settings" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Paramètres</h3>
            <div className="xp-panel p-4 space-y-4">
              <div>
                <label className="block font-bold mb-2">Nom du Portfolio</label>
                <input
                  type="text"
                  defaultValue="Portfolio Monteur Vidéo Professionnel"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Email de Contact</label>
                <input
                  type="email"
                  defaultValue="contact@monteurvideo.pro"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Description</label>
                <textarea
                  defaultValue="Portfolio professionnel de montage vidéo"
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
        {(isCreating || editingVideo) && (
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
                  {isCreating ? "Nouvelle Vidéo" : "Modifier la Vidéo"}
                </h3>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block font-bold mb-1">Titre *</label>
                  <input
                    type="text"
                    value={isCreating ? newVideo.title : editingVideo?.title}
                    onChange={(e) =>
                      isCreating
                        ? setNewVideo({ ...newVideo, title: e.target.value })
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
                        isCreating ? newVideo.duration : editingVideo?.duration
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
                      value={isCreating ? newVideo.year : editingVideo?.year}
                      onChange={(e) =>
                        isCreating
                          ? setNewVideo({ ...newVideo, year: e.target.value })
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
                      isCreating ? newVideo.category : editingVideo?.category
                    }
                    onChange={(e) =>
                      isCreating
                        ? setNewVideo({ ...newVideo, category: e.target.value })
                        : setEditingVideo({
                            ...editingVideo!,
                            category: e.target.value,
                          })
                    }
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Publicité">Publicité</option>
                    <option value="Musical">Musical</option>
                    <option value="Documentaire">Documentaire</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Description</label>
                  <textarea
                    value={
                      isCreating
                        ? newVideo.description
                        : editingVideo?.description
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
                    value={isCreating ? newVideo.status : editingVideo?.status}
                    onChange={(e) =>
                      isCreating
                        ? setNewVideo({
                            ...newVideo,
                            status: e.target.value as VideoProject["status"],
                          })
                        : setEditingVideo({
                            ...editingVideo!,
                            status: e.target.value as VideoProject["status"],
                          })
                    }
                    className="w-full p-2 border rounded text-sm"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                    <option value="archived">Archivé</option>
                  </select>
                </div>
              </div>

              <div className="p-4 border-t flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingVideo(null);
                  }}
                  className="xp-button px-4 py-2"
                >
                  Annuler
                </button>
                <button
                  onClick={isCreating ? handleCreateVideo : handleSaveEdit}
                  className="xp-button px-4 py-2 bg-blue-100"
                >
                  {isCreating ? "Créer" : "Sauvegarder"}
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
