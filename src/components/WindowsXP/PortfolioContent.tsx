import React from "react";
import { Star, Award, Clock, Users } from "lucide-react";

export const PortfolioContent = () => (
  <div className="xp-text space-y-4">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xl font-bold">LVT</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-blue-800">lino.lvt</h2>
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
        Créateur de contenu spécialisé dans l'univers Roblox avec plus d'1 million de vues
        générées. En 2 ans d'expérience, j'ai développé une expertise unique dans le montage
        vidéo gaming, particulièrement sur la plateforme Roblox.
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

export const VideosContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-red-800 flex items-center">
      <span className="mr-2">🎮</span>
      Portfolio Roblox
    </h2>

    <div className="xp-panel bg-green-50">
      <div className="text-sm flex items-center">
        <span className="mr-2">🔥</span>
        <strong>+1 Million de vues générées :</strong>
        <button className="xp-button ml-2 text-xs">Voir showreel</button>
      </div>
    </div>

    <div className="space-y-3">
      {[
        {
          title: "Roblox Brookhaven RP - Best Moments",
          duration: "8m12s",
          year: "2024",
          category: "Gaming",
          color: "bg-green-100",
          description: "Compilation virale - 250K vues",
          views: "250K"
        },
        {
          title: "Adopt Me Trading Tips & Tricks",
          duration: "5m34s",
          year: "2024",
          category: "Tutorial",
          color: "bg-blue-100",
          description: "Guide complet pour traders débutants",
          views: "180K"
        },
        {
          title: "Roblox Horror Games Marathon",
          duration: "12m45s",
          year: "2024",
          category: "Horror",
          color: "bg-red-100",
          description: "Compilation frissons garantis",
          views: "320K"
        },
        {
          title: "Building Challenge Mega Build",
          duration: "6m18s",
          year: "2024",
          category: "Building",
          color: "bg-purple-100",
          description: "Construction créative en accéléré",
          views: "190K"
        },
        {
          title: "Roblox Funny Moments #15",
          duration: "4m56s",
          year: "2024",
          category: "Comedy",
          color: "bg-yellow-100",
          description: "Compilation rires et fails épiques",
          views: "275K"
        },
        {
          title: "New Roblox Games to Try",
          duration: "7m23s",
          year: "2024",
          category: "Review",
          color: "bg-orange-100",
          description: "Test et avis sur les nouveautés",
          views: "165K"
        },
      ].map((video, index) => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-red-800 flex items-center">
      <span className="mr-2">🎬</span>
      Portfolio Vidéo
    </h2>

    <div className="xp-panel bg-yellow-50">
      <div className="text-sm flex items-center">
        <span className="mr-2">💡</span>
        <strong>Showreel disponible :</strong>
        <button className="xp-button ml-2 text-xs">Visionner (3min)</button>
      </div>
    </div>

    <div className="space-y-3">
      {[
        {
          title: "Campagne Nike Air Max 2024",
          duration: "30s",
          year: "2024",
          category: "Publicité",
          color: "bg-red-100",
          description: "Montage dynamique avec effets spéciaux",
        },
        {
          title: "Clip - Artist Émergent",
          duration: "3m45s",
          year: "2024",
          category: "Musical",
          color: "bg-purple-100",
          description: "Direction artistique et montage créatif",
        },
        {
          title: "Documentaire 'Nature Urbaine'",
          duration: "15min",
          year: "2023",
          category: "Documentaire",
          color: "bg-green-100",
          description: "Narration immersive et étalonnage naturel",
        },
        {
          title: "Série Web 'Tech Stories'",
          duration: "8min",
          year: "2024",
          category: "Corporate",
          color: "bg-blue-100",
          description: "Montage informatif et motion graphics",
        },
        {
          title: "Mariage Premium",
          duration: "4min",
          year: "2024",
          category: "Événementiel",
          color: "bg-pink-100",
          description: "Storytelling émotionnel et cinématique",
        },
        {
          title: "Teaser Produit Innovation",
          duration: "1m30s",
          year: "2024",
          category: "Commercial",
          color: "bg-orange-100",
          description: "Montage percutant et animations 3D",
        },
      ].map((video, index) => (
        <div
          key={index}
          className={`xp-panel ${video.color} cursor-pointer hover:shadow-md transition-shadow`}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="font-bold text-sm">{video.title}</div>
            <div className="text-xs bg-white px-2 py-1 rounded">
              {video.category}
            </div>
          </div>
          <div className="text-xs text-gray-600 mb-2">{video.description}</div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {video.duration} • {video.views} vues
            </div>
            <button className="xp-button text-xs">▶ Voir</button>
          </div>
        </div>
      ))}
    </div>

    <div className="xp-panel bg-gradient-to-r from-blue-50 to-green-50">
      <div className="text-sm text-center">
        <strong>🎯 Projets sur mesure</strong>
        <br />
        <span className="text-xs">
          Vous avez un projet spécifique ? Contactez-moi pour un devis
          personnalisé.
        </span>
      </div>
    </div>
  </div>
);

export const SkillsContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-green-800 flex items-center">
      <span className="mr-2">🎮</span>
      Expertise Gaming Roblox
    </h2>

    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-3 text-blue-700">🎨 Logiciels de Montage Gaming</h3>
        <div className="space-y-2">
          {[
            { name: "Adobe Premiere Pro", level: 90, color: "bg-purple-500" },
            { name: "After Effects", level: 85, color: "bg-blue-500" },
            { name: "OBS Studio", level: 95, color: "bg-green-500" },
            { name: "Photoshop", level: 80, color: "bg-red-500" },
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
      <div className="grid grid-cols-2 gap-3">
        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-green-700">🎯 Gaming Expertise</h3>
          <div className="text-xs space-y-1">
            <div>• Gameplay Roblox</div>
            <div>• Montage viral</div>
            <div>• Transitions dynamiques</div>
            <div>• Sound Design gaming</div>
            <div>• Thumbnails attractives</div>
            <div>• Contenu engageant</div>
          </div>
        </div>

        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-orange-700">🔧 Spécialités Roblox</h3>
          <div className="text-xs space-y-1">
            <div>• Capture gameplay HD</div>
            <div>• Montage rythme rapide</div>
            <div>• Effets visuels gaming</div>
            <div>• Optimisation YouTube</div>
            <div>• Audience jeune</div>
            <div>• Tendances Roblox</div>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="font-bold mb-2">🏆 Résultats & Achievements</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>+1 Million de vues générées</span>
            <span className="text-green-600 text-xs">✓ 2024</span>
          </div>
          <div className="flex justify-between">
            <span>2 ans d'expérience Roblox</span>
            <span className="text-green-600 text-xs">✓ 2022-2024</span>
          </div>
          <div className="flex justify-between">
            <span>Spécialiste contenu viral</span>
            <span className="text-green-600 text-xs">✓ Expert</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-xs text-gray-600 mb-2">
          Mise à jour des compétences en continu
        </div>
        <button className="xp-button px-4 py-1 text-xs">
          Voir mes certifications
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
        <span className="font-bold text-green-700">Disponible pour nouveaux projets Roblox</span>
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
                onClick={() => window.open('https://x.com/LinolvtPro', '_blank')}
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
          Ou appelez directement pour discuter de votre projet
        </div>
      </div>
    </div>
  </div>
);