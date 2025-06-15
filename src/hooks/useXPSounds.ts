import { useCallback } from "react";

// Hook for Windows XP sound effects using Web Audio API
export const useXPSounds = () => {
  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine") => {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime,
        );
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + duration,
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.warn("Audio not supported in this browser");
      }
    },
    [],
  );

  const playStartupSound = useCallback(() => {
    // Windows XP startup sound simulation
    playTone(523.25, 0.2); // C5
    setTimeout(() => playTone(659.25, 0.2), 100); // E5
    setTimeout(() => playTone(783.99, 0.2), 200); // G5
    setTimeout(() => playTone(1046.5, 0.4), 300); // C6
  }, [playTone]);

  const playClickSound = useCallback(() => {
    playTone(800, 0.1, "square");
  }, [playTone]);

  const playWindowOpen = useCallback(() => {
    playTone(440, 0.2);
    setTimeout(() => playTone(554.37, 0.2), 100);
  }, [playTone]);

  const playWindowClose = useCallback(() => {
    playTone(554.37, 0.15);
    setTimeout(() => playTone(440, 0.15), 100);
  }, [playTone]);

  const playErrorSound = useCallback(() => {
    playTone(200, 0.3, "sawtooth");
  }, [playTone]);

  const playNotificationSound = useCallback(() => {
    playTone(800, 0.1);
    setTimeout(() => playTone(600, 0.1), 50);
    setTimeout(() => playTone(800, 0.2), 100);
  }, [playTone]);

  return {
    playStartupSound,
    playClickSound,
    playWindowOpen,
    playWindowClose,
    playErrorSound,
    playNotificationSound,
  };
};
