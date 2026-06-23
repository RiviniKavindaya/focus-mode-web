import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing HTML5 audio playback
 * More reliable than Howler.js for basic ambient sounds
 */
export function useAmbientAudio(soundId, volume = 50) {
  const audioRef = useRef(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!soundId || soundId === 'none') {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    if (!isInitializedRef.current) {
      // Create audio element on first use
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
      isInitializedRef.current = true;
    }

    const audio = audioRef.current;

    // Map sound IDs to URLs
    const soundUrls = {
      rain: 'https://assets.mixkit.co/active_storage/sfx/2403/2403-preview.mp3',
      birds: 'https://assets.mixkit.co/active_storage/sfx/2428/2428-preview.mp3',
      noise: 'https://assets.mixkit.co/active_storage/sfx/2405/2405-preview.mp3',
      lofi: 'https://assets.mixkit.co/active_storage/sfx/2425/2425-preview.mp3',
    };

    const url = soundUrls[soundId];
    if (!url) return;

    // Only load if it's a different sound
    if (audio.src !== url) {
      audio.src = url;
    }

    // Attempt to play
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log(`Playing: ${soundId}`))
        .catch((error) => {
          console.warn(`Couldn't play ${soundId}:`, error);
          // Retry with user interaction
          setTimeout(() => audio.play().catch(e => console.error(e)), 100);
        });
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [soundId]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return audioRef;
}
