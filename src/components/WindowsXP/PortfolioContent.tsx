import React from "react";
import { Star, Award, Clock, Users } from "lucide-react";

export const PortfolioContent = () => (
  <div className="xp-text space-y-4">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white text-2xl font-bold">MV</span>
      </div>
      <div>
        <h2 className="text-xl font-bold text-blue-800">Monteur Vidéo Professionnel</h2>
        <p className="text-sm text-gray-600">Créateur de contenus audiovisuels</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="xp-panel text-center">
        <div className="flex items-center justify-center mb-1">
          <Clock size={16} className="text-blue-600" />
        </div>
        <div className="font-bold text-lg">5+</div>
        <div className="text-xs">Années d'expérience</div>
      </div>
      <div className="xp-panel text-center">
        <div className="flex items-center justify-center mb-1">
          <Users size={16} className="text-green-600" />
        </div>
        <div className="font-bold text-lg">150+</div>
        <div className="text-xs">Projets réalisés</div>
      </div>
    </div>

    <div className="space-y-3">
      <p className="text-sm leading-relaxed">
        Passionné par la création audiovisuelle depuis plus de 5 ans, je transforme vos idées 
        en histoires captivantes. Ma spécialité ? Donner vie à vos projets avec créativité 
        et précision technique.
      </p>

      <div className="xp-panel">
        <h3 className="font-bold mb-2 flex items-center">
          <Award size={14} className="mr-2 text-yellow-600" />
          Mes spécialisations
        </h3>
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>Montage publicitaire et commercial</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>Clips musicaux et artistiques</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span>Documentaires et reportages</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span>Contenu pour réseaux sociaux</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            <span>Étalonnage et post-production</span>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center mb-2">
          <Star size={14} className="text-yellow-500 mr-1" />
          <span className="font-bold text-sm">Ma philosophie</span>
        </div>
        <p className="text-sm italic">
          "Chaque projet est unique et mérite une approche créative personnalisée. 
          Mon objectif est de dépasser vos attentes en alliant technique de pointe 
          et vision artistique."
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
          description: "Montage dynamique avec effets spéciaux"
        },
        { 
          title: "Clip - Artist Émergent", 
          duration: "3m45s", 
          year: "2024",
          category: "Musical",
          color: "bg-purple-100",
          description: "Direction artistique et montage créatif"
        },
        { 
          title: "Documentaire 'Nature Urbaine'", 
          duration: "15min", 
          year: "2023",
          category: "Documentaire",
          color: "bg-green-100",
          description: "Narration immersive et étalonnage naturel"
        },
        { 
          title: "Série Web 'Tech Stories'", 
          duration: "8min", 
          year: "2024",
          category: "Corporate",
          color: "bg-blue-100",
          description: "Montage informatif et motion graphics"
        },
        { 
          title: "Mariage Premium", 
          duration: "4min", 
          year: "2024",
          category: "Événementiel",
          color: "bg-pink-100",
          description: "Storytelling émotionnel et cinématique"
        },
        { 
          title: "Teaser Produit Innovation", 
          duration: "1m30s", 
          year: "2024",
          category: "Commercial",
          color: "bg-orange-100",
          description: "Montage percutant et animations 3D"
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
          <div className="text-xs text-gray-600 mb-2">
            {video.description}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {video.duration} • {video.year}
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
          Vous avez un projet spécifique ? Contactez-moi pour un devis personnalisé.
        </span>
      </div>
    </div>
  </div>
);

export const SkillsContent = () => (
  <div className="xp-text space-y-4">
    <h2 className="text-lg font-bold text-green-800 flex items-center">
      <span className="mr-2">⚡</span>
      Expertise Technique
    </h2>
    
    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-3 text-blue-700">🎨 Logiciels de Montage</h3>
        <div className="space-y-2">
          {[
            { name: "Adobe Premiere Pro", level: 95, color: "bg-purple-500" },
            { name: "After Effects", level: 90, color: "bg-blue-500" },
            { name: "DaVinci Resolve", level: 85, color: "bg-red-500" },
            { name: "Final Cut Pro", level: 80, color: "bg-gray-500" },
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
          <h3 className="font-bold mb-2 text-green-700">🎯 Spécialisations</h3>
          <div className="text-xs space-y-1">
            <div>• Storytelling visuel</div>
            <div>• Étalonnage couleur</div>
            <div>• Motion Graphics</div>
            <div>• Sound Design</div>
            <div>• Multicam</div>
            <div>• Workflow 4K/8K</div>
          </div>
        </div>

        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-orange-700">🔧 Technologies</h3>
          <div className="text-xs space-y-1">
            <div>• Formats : ProRes, RED, RAW</div>
            <div>• HDR & Dolby Vision</div>
            <div>• Proxy Workflows</div>
            <div>• Cloud Collaboration</div>
            <div>• AI Enhancement</div>
            <div>• VR/360° Editing</div>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-green-50 to-blue-50">
        <h3 className="font-bold mb-2">🏆 Certifications & Formations</h3>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Adobe Certified Expert (ACE)</span>
            <span className="text-green-600 text-xs">✓ 2024</span>
          </div>
          <div className="flex justify-between">
            <span>DaVinci Resolve Certified</span>
            <span className="text-green-600 text-xs">✓ 2023</span>
          </div>
          <div className="flex justify-between">
            <span>Apple Pro Video Certification</span>
            <span className="text-green-600 text-xs">✓ 2023</span>
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
        <span className="font-bold text-green-700">Disponible pour nouveaux projets</span>
      </div>
    </div>

    <div className="space-y-3">
      <div className="xp-panel">
        <h3 className="font-bold mb-2 text-blue-700">📧 Coordonnées</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>contact@monteurvideo.pro</span>
            </div>
            <button className="xp-button text-xs">Copier</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>+33 6 12 34 56 78</span>
            </div>
            <button className="xp-button text-xs">Appeler</button>
          </div>
          <div className="flex items-center space-x-2">
            <span>📍</span>
            <span>Paris & Île-de-France</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🌐</span>
            <span>Interventions France entière</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-purple-700">🌐 Réseaux</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span>LinkedIn Pro</span>
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

        <div className="xp-panel">
          <h3 className="font-bold mb-2 text-orange-700">⏱️ Réactivité</h3>
          <div className="text-sm space-y-1">
            <div>📩 Réponse : <strong>< 2h</strong></div>
            <div>📋 Devis : <strong>24h</strong></div>
            <div>🚀 Début projet : <strong>48h</strong></div>
            <div>⚡ Urgence : <strong>Sur demande</strong></div>
          </div>
        </div>
      </div>

      <div className="xp-panel bg-gradient-to-r from-yellow-50 to-orange-50">
        <h3 className="font-bold mb-2">💰 Tarification</h3>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Montage simple</span>
            <span className="font-bold">À partir de 200€/jour</span>
          </div>
          <div className="flex justify-between">
            <span>Projet complet</span>
            <span className="font-bold">Devis personnalisé</span>
          </div>
          <div className="text-xs text-gray-600 text-center mt-2">
            Première consultation gratuite • Devis sans engagement
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