import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Types pour les données sauvegardées
export interface VideoData {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  url: string;
  views: number;
  likes: number;
  date: string;
}

export interface RecycleBinItem {
  id: string;
  name: string;
  type: "image" | "text" | "video" | "folder";
  content?: string;
  thumbnail?: string;
  dateDeleted: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalVideos: number;
  totalLikes: number;
  monthlyViews: number[];
  topCategories: { name: string; count: number }[];
}

export interface ClientReview {
  id: string;
  clientName: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  adminNote?: string;
}

export interface AppSettings {
  autoSave: boolean;
  theme: "default" | "classic";
  notifications: boolean;
  syncInterval: number;
  profilePicture: string;
  displayName: string;
}

export interface SavedData {
  videos: VideoData[];
  recycleBin: RecycleBinItem[];
  analytics: AnalyticsData;
  reviews: ClientReview[];
  settings: AppSettings;
  lastSaved: string;
  version: string;
}

interface SaveDataContextType {
  data: SavedData;
  saveData: (newData: Partial<SavedData>) => void;
  loadData: () => void;
  resetData: () => void;
  isAutoSaveEnabled: boolean;
  toggleAutoSave: () => void;
  exportData: () => string;
  importData: (jsonData: string) => boolean;
}

const defaultData: SavedData = {
  videos: [
    {
      id: "1",
      title: "Logo Animation - Reveal Dynamique",
      description:
        "Animation de logo avec effets de particules et transitions fluides. Création complète en Motion Design avec After Effects.",
      category: "Motion Design",
      thumbnail:
        "https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      views: 15000,
      likes: 890,
      date: "2025-01-15",
    },
    {
      id: "2",
      title: "Roblox Gaming Montage - Epic Moments",
      description:
        "Compilation de mes meilleurs moments gaming sur Roblox avec transitions et effets visuels épiques.",
      category: "Gaming",
      thumbnail:
        "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      views: 42000,
      likes: 2100,
      date: "2025-01-10",
    },
    {
      id: "3",
      title: "Publicité Produit - Animation 3D",
      description:
        "Spot publicitaire avec modélisation 3D et rendu photoréaliste pour présentation produit.",
      category: "Commercial",
      thumbnail:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      views: 8500,
      likes: 450,
      date: "2025-01-05",
    },
  ],
  recycleBin: [
    {
      id: "1",
      name: "screenshot_brookhaven.png",
      type: "image",
      thumbnail:
        "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg",
      dateDeleted: "2025-01-20",
    },
    {
      id: "2",
      name: "admin_credentials.txt",
      type: "text",
      content:
        "Admin: Baka\nPassword: FakePassword123\nNote: These are fake credentials for demo purposes.",
      dateDeleted: "2025-01-18",
    },
    {
      id: "3",
      name: "old_intro_video.mp4",
      type: "video",
      thumbnail:
        "https://images.pexels.com/photos/2835436/pexels-photo-2835436.jpeg",
      dateDeleted: "2025-01-15",
    },
    {
      id: "4",
      name: "Templates",
      type: "folder",
      dateDeleted: "2025-01-12",
    },
  ],
  analytics: {
    totalViews: 1000000,
    totalVideos: 35,
    totalLikes: 45000,
    monthlyViews: [
      45000, 52000, 48000, 67000, 71000, 65000, 82000, 78000, 89000, 95000,
      88000, 92000,
    ],
    topCategories: [
      { name: "Gaming", count: 15 },
      { name: "Building", count: 8 },
      { name: "Horror", count: 6 },
      { name: "Tutorial", count: 4 },
      { name: "Comedy", count: 2 },
    ],
  },
  reviews: [
    {
      id: "1",
      clientName: "GameMaster_YT",
      email: "gamemaster.yt@gmail.com",
      rating: 5,
      comment:
        "Montage incroyable ! Lino a transformé mes clips Brookhaven en chef-d'œuvre. Résultat au-delà de mes attentes, transitions fluides et effets parfaits. Je recommande à 100% !",
      date: "2025-01-18",
      status: "approved",
      adminNote: "Client vérifié - Excellent retour",
    },
    {
      id: "2",
      clientName: "RobloxPro_2024",
      email: "robloxpro.2024@outlook.fr",
      rating: 5,
      comment:
        "Service rapide et professionnel. Mon montage Adopt Me a généré +50K vues grâce au travail de Lino. Un vrai expert du gaming content !",
      date: "2025-01-15",
      status: "approved",
      adminNote: "Résultats prouvés - Client premium",
    },
    {
      id: "3",
      clientName: "NoobGamer_FR",
      email: "noobgamer.fr@yahoo.com",
      rating: 4,
      comment:
        "Très bon travail sur mon montage Horror Games. Quelques petites retouches demandées mais résultat final excellent. Communication top !",
      date: "2025-01-12",
      status: "approved",
      adminNote: "Client fidèle - Retour constructif",
    },
  ],
  settings: {
    autoSave: true,
    theme: "default",
    notifications: true,
    syncInterval: 30000, // 30 secondes
    profilePicture:
      "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    displayName: "Linolvt",
  },
  lastSaved: new Date().toISOString(),
  version: "1.0.0",
};

const SaveDataContext = createContext<SaveDataContextType | undefined>(
  undefined,
);

export const useSaveData = () => {
  const context = useContext(SaveDataContext);
  if (!context) {
    throw new Error("useSaveData must be used within a SaveDataProvider");
  }
  return context;
};

interface SaveDataProviderProps {
  children: ReactNode;
}

export const SaveDataProvider: React.FC<SaveDataProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<SavedData>(defaultData);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    loadData();
  }, []);

  // Auto-save toutes les 30 secondes si activé
  useEffect(() => {
    if (!isAutoSaveEnabled) return;

    const interval = setInterval(() => {
      saveToLocalStorage(data);
    }, data.settings.syncInterval);

    return () => clearInterval(interval);
  }, [data, isAutoSaveEnabled]);

  const saveToLocalStorage = (dataToSave: SavedData) => {
    try {
      const updatedData = {
        ...dataToSave,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(
        "linolvt_portfolio_data",
        JSON.stringify(updatedData),
      );
      console.log("✅ Données sauvegardées automatiquement");
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde:", error);
    }
  };

  const saveData = (newData: Partial<SavedData>) => {
    const updatedData = {
      ...data,
      ...newData,
      lastSaved: new Date().toISOString(),
    };
    setData(updatedData);

    // Sauvegarde immédiate
    saveToLocalStorage(updatedData);
  };

  const loadData = () => {
    try {
      const savedData = localStorage.getItem("linolvt_portfolio_data");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setData({ ...defaultData, ...parsed });
        console.log("✅ Données chargées depuis la sauvegarde");
      } else {
        // Première utilisation, sauvegarder les données par défaut
        saveToLocalStorage(defaultData);
        console.log("✅ Données par défaut initialisées");
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement:", error);
      setData(defaultData);
    }
  };

  const resetData = () => {
    setData(defaultData);
    saveToLocalStorage(defaultData);
    console.log("🔄 Données réinitialisées");
  };

  const toggleAutoSave = () => {
    const newAutoSave = !isAutoSaveEnabled;
    setIsAutoSaveEnabled(newAutoSave);
    saveData({
      settings: {
        ...data.settings,
        autoSave: newAutoSave,
      },
    });
    console.log(
      newAutoSave
        ? "✅ Auto-sauvegarde activée"
        : "⏸️ Auto-sauvegarde désactivée",
    );
  };

  const exportData = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const importedData = JSON.parse(jsonData);
      // Validation basique
      if (
        importedData.videos &&
        importedData.recycleBin &&
        importedData.analytics
      ) {
        const mergedData = { ...defaultData, ...importedData };
        setData(mergedData);
        saveToLocalStorage(mergedData);
        console.log("✅ Données importées avec succès");
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Erreur lors de l'importation:", error);
      return false;
    }
  };

  const contextValue: SaveDataContextType = {
    data,
    saveData,
    loadData,
    resetData,
    isAutoSaveEnabled,
    toggleAutoSave,
    exportData,
    importData,
  };

  return (
    <SaveDataContext.Provider value={contextValue}>
      {children}
    </SaveDataContext.Provider>
  );
};

export default SaveDataContext;
