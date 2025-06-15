import React from "react";
import { Star, Award, Clock, Users, ExternalLink, Play } from "lucide-react";
import { useSaveData } from "../../contexts/SaveDataContext";

export const PortfolioContent = () => (
  <div className="xp-text space-y-4">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xl font-bold">LVT</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-blue-800">Linolvt</h2>
        <p className="text-sm text-gray-600">Monteur Vidéo Roblox Spécialisé</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="xp-panel text-center">
        <div className="flex items-center justify-center mb-1">
          <Clock size={16} className="text-blue-600" />
        </div>
        <div className="font-bold text-lg">2</div>
        <div className="text-xs">Années d'expérience</div>
      </div>
      <div className="xp-panel text-center">
        <div className="flex items-center justify-center mb-1">
          <Users size={16} className="text-green-600" />
        </div>
        <div className="font-bold text-lg">+1M</div>
        <div className="text-xs">Vues générées</div>
      </div>
    </div>

    <div className="space-y-3">
      <p className="text-sm leading-relaxed">
        Créateur de contenu spécialisé dans l'univers Roblox avec plus d'1
        million de vues générées. En 2 ans d'expérience, j'ai développé une
        expertise unique dans le montage vidéo gaming, particulièrement sur la
        plateforme Roblox.
      </p>

      <div className="xp-panel">
        <h3 className="font-bold mb-2 flex items-center">
          <Award size={14} className="mr-2 text-yellow-600" />
          Mes spécialisations Roblox
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Gameplay & Tutoriels Roblox</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Montage gaming dynamique</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span>Contenu viral pour réseaux sociaux</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span>Storytelling gaming</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            <span>Effets visuels et transitions</span>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center mb-2">
          <Star size={14} className="text-yellow-500 mr-1" />
          <span className="font-bold text-sm">Ma spécialité</span>
        </div>
        <p className="text-sm italic">
          "Expert en montage vidéo Roblox, je crée du contenu viral qui engage
          et divertit. Avec +1M de vues générées, je maîtrise les codes qui
          fonctionnent dans l'univers gaming."
        </p>
      </div>

      <div className="text-center">
        <button className="xp-button px-4 py-2 font-bold">
          Découvrir mes réalisations
        </button>
      </div>
    </div>
  </div>
);

export const VideosContent = () => {
  const { data } = useSaveData();

  const handleVideoClick = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Motion Design": "bg-purple-100 text-purple-800",
      Gaming: "bg-green-100 text-green-800",
      "Montage Vidéo": "bg-blue-100 text-blue-800",
      Animation: "bg-pink-100 text-pink-800",
      Tutorial: "bg-yellow-100 text-yellow-800",
      Commercial: "bg-gray-100 text-gray-800",
      "Music Video": "bg-red-100 text-red-800",
      VFX: "bg-indigo-100 text-indigo-800",
      Documentary: "bg-orange-100 text-orange-800",
      "Social Media": "bg-cyan-100 text-cyan-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="xp-text space-y-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-blue-800">Mes Créations</h2>
        <div className="text-sm text-gray-600">
          {data.videos.length} vidéo{data.videos.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="xp-panel text-center p-2">
          <div className="text-lg font-bold text-green-600">
            {data.videos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Vues Totales</div>
        </div>
        <div className="xp-panel text-center p-2">
          <div className="text-lg font-bold text-red-600">
            {data.videos.reduce((sum, v) => sum + v.likes, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Likes</div>
        </div>
        <div className="xp-panel text-center p-2">
          <div className="text-lg font-bold text-purple-600">
            {new Set(data.videos.map((v) => v.category)).size}
          </div>
          <div className="text-xs text-gray-600">Catégories</div>
        </div>
      </div>

      {/* Videos List */}
      {data.videos.length === 0 ? (
        <div className="text-center py-8">
          <Play size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">Aucune vidéo pour le moment</p>
          <p className="text-xs text-gray-400">
            Les vidéos seront ajoutées via le panneau d'administration
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.videos
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((video) => (
              <div
                key={video.id}
                className="xp-panel cursor-pointer hover:shadow-md transition-all hover:bg-blue-50"
                onClick={() => handleVideoClick(video.url)}
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  {video.thumbnail && (
                    <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm text-blue-800 truncate pr-2">
                        {video.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs flex-shrink-0 ${getCategoryColor(video.category)}`}
                      >
                        {video.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>👁️ {video.views.toLocaleString()}</span>
                        <span>❤️ {video.likes.toLocaleString()}</span>
                        <span>
                          📅 {new Date(video.date).toLocaleDateString("fr-FR")}
                        </span>
                      </div>

                      {video.url && (
                        <button
                          className="xp-button text-xs flex items-center gap-1 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVideoClick(video.url);
                          }}
                        >
                          <ExternalLink size={12} />
                          Voir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="xp-panel bg-gradient-to-r from-blue-50 to-purple-50 mt-6">
        <div className="text-center p-2">
          <div className="text-sm font-bold text-blue-800 mb-1">
            🎬 Besoin d'une création sur mesure ?
          </div>
          <div className="text-xs text-gray-600">
            Motion design, montage vidéo, animation - Contactez-moi pour
            discuter de votre projet !
          </div>
        </div>
      </div>
    </div>
  );
};

export const VideosContent = () => {
  const { data } = useSaveData();

  const handleVideoClick = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Motion Design": "bg-purple-100 text-purple-800",
      Gaming: "bg-green-100 text-green-800",
      "Montage Vidéo": "bg-blue-100 text-blue-800",
      Animation: "bg-pink-100 text-pink-800",
      Tutorial: "bg-yellow-100 text-yellow-800",
      Commercial: "bg-gray-100 text-gray-800",
      "Music Video": "bg-red-100 text-red-800",
      VFX: "bg-indigo-100 text-indigo-800",
      Documentary: "bg-orange-100 text-orange-800",
      "Social Media": "bg-cyan-100 text-cyan-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="xp-text space-y-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-blue-800">Mes Créations</h2>
        <div className="text-sm text-gray-600">
          {data.videos.length} vidéo{data.videos.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="xp-panel text-center p-2">
          <div className="text-lg font-bold text-green-600">
            {data.videos.reduce((sum, v) => sum + v.views, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Vues Totales</div>
        </div>
        <div className="xp-panel text-center p-2">
          <div className="text-lg font-bold text-red-600">
            {data.videos.reduce((sum, v) => sum + v.likes, 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Likes</div>
        </div>
        <div className="xp-panel text-center p-2">
          <div className="text-lg font-bold text-purple-600">
            {new Set(data.videos.map((v) => v.category)).size}
          </div>
          <div className="text-xs text-gray-600">Catégories</div>
        </div>
      </div>

      {/* Videos List */}
      {data.videos.length === 0 ? (
        <div className="text-center py-8">
          <Play size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">Aucune vidéo pour le moment</p>
          <p className="text-xs text-gray-400">
            Les vidéos seront ajoutées via le panneau d'administration
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.videos
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((video) => (
              <div
                key={video.id}
                className="xp-panel cursor-pointer hover:shadow-md transition-all hover:bg-blue-50"
                onClick={() => handleVideoClick(video.url)}
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  {video.thumbnail && (
                    <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-sm text-blue-800 truncate pr-2">
                        {video.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded text-xs flex-shrink-0 ${getCategoryColor(video.category)}`}
                      >
                        {video.category}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>👁️ {video.views.toLocaleString()}</span>
                        <span>❤️ {video.likes.toLocaleString()}</span>
                        <span>
                          📅 {new Date(video.date).toLocaleDateString("fr-FR")}
                        </span>
                      </div>

                      {video.url && (
                        <button
                          className="xp-button text-xs flex items-center gap-1 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVideoClick(video.url);
                          }}
                        >
                          <ExternalLink size={12} />
                          Voir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="xp-panel bg-gradient-to-r from-blue-50 to-purple-50 mt-6">
        <div className="text-center p-2">
          <div className="text-sm font-bold text-blue-800 mb-1">
            🎬 Besoin d'une création sur mesure ?
          </div>
          <div className="text-xs text-gray-600">
            Motion design, montage vidéo, animation - Contactez-moi pour
            discuter de votre projet !
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkillsContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-green-800 flex items-center">
      <span className="mr-2">🎮</span>
      Expertise Gaming Roblox
    </h2>

    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-3 text-blue-700">
          🎨 Logiciels de Montage Gaming
        </h3>
        <div className="space-y-2">
          {[
            { name: "Adobe Premiere Pro", level: 90, color: "bg-purple-500" },
            { name: "After Effects", level: 85, color: "bg-blue-500" },
          ].map((skill, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span className="text-xs font-bold">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className={`h-2 rounded ${skill.color}`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="font-bold mb-2">🏆 Résultats & Achievements</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>+1 Million de vues générées</span>
            <span className="text-green-600 text-xs">✓ 2025</span>
          </div>
          <div className="flex justify-between">
            <span>2 ans d'expérience Roblox</span>
            <span className="text-green-600 text-xs">✓ 2023-2025</span>
          </div>
          <div className="flex justify-between">
            <span>Spécialiste contenu viral</span>
            <span className="text-green-600 text-xs">✓ Expert</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-600 mb-2">
          Spécialisé dans l'univers Roblox depuis 2022
        </div>
        <button className="xp-button px-4 py-1 text-xs">
          Voir mes résultats
        </button>
      </div>
    </div>
  </div>
);

export const ContactContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-yellow-800 flex items-center">
      <span className="mr-2">📞</span>
      Contact & Collaboration
    </h2>

    <div className="xp-panel bg-green-50">
      <div className="flex items-center justify-center mb-3">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span className="font-bold text-green-700">
          Disponible pour nouveaux projets Roblox
        </span>
      </div>
    </div>

    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-2 text-blue-700">📧 Coordonnées</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>linolvt.pro@gmail.com</span>
            </div>
            <button className="xp-button text-xs">Copier</button>
          </div>
          <div className="flex items-center space-x-2">
            <span>🎮</span>
            <span>Spécialiste Roblox Gaming</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📊</span>
            <span>+1M vues générées</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⏱️</span>
            <span>2 ans d'expérience</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-purple-700">🌐 Réseaux</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>X (Twitter)</span>
              <button
                className="xp-button text-xs"
                onClick={() =>
                  window.open("https://x.com/LinolvtPro", "_blank")
                }
              >
                Suivre
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>@LinolvtPro</span>
              <button className="xp-button text-xs">Voir profil</button>
            </div>
            <div className="flex justify-between items-center">
              <span>Roblox Gaming</span>
              <button className="xp-button text-xs">Contenu</button>
            </div>
          </div>
        </div>

        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-orange-700">⏱️ Réactivité</h3>
          <div className="text-sm space-y-1">
            <div>
              📩 Réponse : <strong>&lt; 2h</strong>
            </div>
            <div>
              📋 Devis : <strong>24h</strong>
            </div>
            <div>
              🚀 Début projet : <strong>48h</strong>
            </div>
            <div>
              ⚡ Urgence : <strong>Sur demande</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="font-bold mb-2">💰 Services Roblox</h3>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Montage Gaming</span>
            <span className="font-bold">Prix sur demande</span>
          </div>
          <div className="flex justify-between">
            <span>Contenu viral</span>
            <span className="font-bold">Expertise +1M vues</span>
          </div>
          <div className="text-xs text-gray-600 text-center mt-2">
            Portfolio Roblox • Résultats prouvés • Contact direct
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <button className="xp-button px-6 py-2 font-bold bg-blue-100">
          📧 Envoyer un message
        </button>
        <div className="text-xs text-gray-600">
          Ou contactez-moi directement pour discuter de votre projet Roblox
        </div>
      </div>
    </div>
  </div>
);
