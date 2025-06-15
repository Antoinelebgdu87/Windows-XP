import { useEffect, useRef } from "react";
import { useSaveData } from "../contexts/SaveDataContext";

interface UseAutoSaveOptions {
  delay?: number; // Délai en millisecondes avant la sauvegarde
  enabled?: boolean; // Activer/désactiver l'auto-save
}

export const useAutoSave = (data: any, options: UseAutoSaveOptions = {}) => {
  const { saveData, isAutoSaveEnabled } = useSaveData();
  const { delay = 2000, enabled = true } = options;
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastDataRef = useRef(data);

  useEffect(() => {
    // Si l'auto-save est désactivé globalement ou localement, on arrête
    if (!isAutoSaveEnabled || !enabled) return;

    // Si les données n'ont pas changé, on ne fait rien
    if (JSON.stringify(data) === JSON.stringify(lastDataRef.current)) return;

    // Annuler le timeout précédent s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Programmer la sauvegarde après le délai
    timeoutRef.current = setTimeout(() => {
      saveData(data);
      lastDataRef.current = data;
      console.log("🔄 Auto-sauvegarde effectuée");
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, saveData, delay, enabled, isAutoSaveEnabled]);

  // Sauvegarde manuelle immédiate
  const saveNow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    saveData(data);
    lastDataRef.current = data;
    console.log("💾 Sauvegarde manuelle effectuée");
  };

  return { saveNow };
};

export default useAutoSave;
