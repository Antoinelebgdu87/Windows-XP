import React, { createContext, useContext, useState, ReactNode } from "react";

export interface RecycleBinItem {
  id: string;
  name: string;
  type: "image" | "text" | "folder" | "video";
  size: string;
  dateDeleted: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  originalPath?: string;
}

interface RecycleBinContextType {
  items: RecycleBinItem[];
  addItem: (item: Omit<RecycleBinItem, "id" | "dateDeleted">) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  restoreItem: (id: string) => void;
}

const RecycleBinContext = createContext<RecycleBinContextType | undefined>(
  undefined,
);

export const useRecycleBin = () => {
  const context = useContext(RecycleBinContext);
  if (!context) {
    throw new Error("useRecycleBin must be used within a RecycleBinProvider");
  }
  return context;
};

interface RecycleBinProviderProps {
  children: ReactNode;
}

export const RecycleBinProvider: React.FC<RecycleBinProviderProps> = ({
  children,
}) => {
  const [items, setItems] = useState<RecycleBinItem[]>([
    {
      id: "img1",
      name: "image1.jpg",
      type: "image",
      size: "2.4 Mo",
      dateDeleted: "25/12/2024 14:20",
      originalPath: "C:\\Users\\Monteur\\Images",
      imageUrl:
        "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
    },
    {
      id: "img2",
      name: "image2.jpg",
      type: "image",
      size: "1.8 Mo",
      dateDeleted: "25/12/2024 14:19",
      originalPath: "C:\\Users\\Monteur\\Images",
      imageUrl:
        "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg",
    },
    {
      id: "img3",
      name: "image3.jpg",
      type: "image",
      size: "3.1 Mo",
      dateDeleted: "25/12/2024 14:18",
      originalPath: "C:\\Users\\Monteur\\Images",
      imageUrl:
        "https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg",
    },
    {
      id: "img4",
      name: "image4.jpg",
      type: "image",
      size: "2.7 Mo",
      dateDeleted: "25/12/2024 14:17",
      originalPath: "C:\\Users\\Monteur\\Images",
      imageUrl:
        "https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg",
    },
    {
      id: "admin-txt",
      name: "admin_credentials.txt",
      type: "text",
      size: "125 octets",
      dateDeleted: "25/12/2024 13:45",
      originalPath: "C:\\Windows\\System32",
      content: `IDENTIFIANTS ADMINISTRATEUR
=============================

Username: Admin
Password: Bakadu36

ATTENTION: Ne pas partager ces informations !
Accès réservé au personnel autorisé uniquement.

Dernière mise à jour: 25/12/2024
Système: Windows XP Professional`,
    },
  ]);

  const addItem = (newItem: Omit<RecycleBinItem, "id" | "dateDeleted">) => {
    const item: RecycleBinItem = {
      ...newItem,
      id: Date.now().toString(),
      dateDeleted:
        new Date().toLocaleDateString("fr-FR") +
        " " +
        new Date().toLocaleTimeString("fr-FR"),
    };
    setItems((prev) => [item, ...prev]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  const restoreItem = (id: string) => {
    // Pour l'instant, on supprime juste de la corbeille
    // Dans une vraie app, on restaurerait vers l'emplacement original
    removeItem(id);
  };

  return (
    <RecycleBinContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearAll,
        restoreItem,
      }}
    >
      {children}
    </RecycleBinContext.Provider>
  );
};
