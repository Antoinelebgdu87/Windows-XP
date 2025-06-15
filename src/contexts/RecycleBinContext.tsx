import React, { createContext, useContext, ReactNode } from "react";
import { useSaveData } from "./SaveDataContext";

export interface RecycleBinItem {
  id: string;
  name: string;
  type: "image" | "text" | "folder" | "video";
  size?: string;
  dateDeleted: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  originalPath?: string;
  thumbnail?: string;
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
  const { data, saveData } = useSaveData();

  const addItem = (newItem: Omit<RecycleBinItem, "id" | "dateDeleted">) => {
    const item: RecycleBinItem = {
      ...newItem,
      id: Date.now().toString(),
      dateDeleted:
        new Date().toLocaleDateString("fr-FR") +
        " " +
        new Date().toLocaleTimeString("fr-FR"),
    };

    const updatedRecycleBin = [item, ...data.recycleBin];
    saveData({ recycleBin: updatedRecycleBin });
    console.log("📁 Élément ajouté à la corbeille:", item.name);
  };

  const removeItem = (id: string) => {
    const updatedRecycleBin = data.recycleBin.filter((item) => item.id !== id);
    saveData({ recycleBin: updatedRecycleBin });
    console.log("🗑️ Élément supprimé de la corbeille");
  };

  const clearAll = () => {
    saveData({ recycleBin: [] });
    console.log("🧹 Corbeille vidée");
  };

  const restoreItem = (id: string) => {
    // Pour l'instant, on supprime juste de la corbeille
    // Dans une vraie app, on restaurerait vers l'emplacement original
    removeItem(id);
    console.log("↩️ Élément restauré");
  };

  return (
    <RecycleBinContext.Provider
      value={{
        items: data.recycleBin,
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
