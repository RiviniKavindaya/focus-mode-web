import { Howl } from 'howler';

// Using reliable CDN audio sources with proper CORS headers
const SOUND_URLS = {
  rain: [
    'https://assets.mixkit.co/active_storage/sfx/2403/2403-preview.mp3',
    'https://cdn.pixabay.com/download/audio/2021/08/04/audio_1808fbf5e5.mp3',
  ],
  birds: [
    'https://assets.mixkit.co/active_storage/sfx/2428/2428-preview.mp3',
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_4180aff4a7.mp3',
  ],
  noise: [
    'https://assets.mixkit.co/active_storage/sfx/2405/2405-preview.mp3',
    'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0e33eb141f.mp3',
  ],
  lofi: [
    'https://assets.mixkit.co/active_storage/sfx/2425/2425-preview.mp3',
  ],
};

class SoundService {
  constructor() {
    this.sounds = {};
    this.currentSound = null;
    this.initializeSounds();
  }

  initializeSounds() {
    Object.entries(SOUND_URLS).forEach(([soundId, urls]) => {
      this.sounds[soundId] = new Howl({
        src: urls,
        loop: true,
        volume: 0.5,
        preload: 'metadata',
        autoplay: false,
        onloaderror: (id, error) => {
          console.error(`Error loading ${soundId}:`, error);
        },
        onload: () => {
          console.log(`${soundId} loaded successfully`);
        },
      });
    });
  }

  play(soundId) {
    // Stop current sound if different
    if (this.currentSound && this.currentSound !== soundId) {
      this.stop(this.currentSound);
    }

    if (soundId === 'none') {
      this.currentSound = null;
      return;
    }

    const sound = this.sounds[soundId];
    if (sound) {
      try {
        if (!sound.playing()) {
          sound.play();
          this.currentSound = soundId;
          console.log(`Playing ${soundId}`);
        }
      } catch (e) {
        console.error(`Error playing ${soundId}:`, e);
      }
    }
  }

  pause() {
    if (this.currentSound) {
      const sound = this.sounds[this.currentSound];
      if (sound) {
        sound.pause();
      }
    }
  }

  resume() {
    if (this.currentSound) {
      const sound = this.sounds[this.currentSound];
      if (sound) {
        sound.play();
      }
    }
  }

  stop(soundId = null) {
    const id = soundId || this.currentSound;
    if (id && this.sounds[id]) {
      this.sounds[id].stop();
    }
    if (!soundId) {
      this.currentSound = null;
    }
  }

  setVolume(soundId, volume) {
    // Volume is 0-100, Howler uses 0-1
    const normalizedVolume = Math.max(0, Math.min(1, volume / 100));
    
    // Set volume for all sounds to keep them in sync
    Object.values(this.sounds).forEach(sound => {
      sound.volume(normalizedVolume);
    });
  }

  stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.stop();
    });
    this.currentSound = null;
  }
}

export const soundService = new SoundService();
