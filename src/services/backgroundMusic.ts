/**
 * Ambient Islamic Housewarming Background Music Service
 * Single curated peaceful track: "Serene Housewarming Nasheed"
 * Default volume set to 15% for soft spiritual ambiance.
 */

type MusicStateListener = (state: {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}) => void;

export const DEFAULT_TRACK = {
  title: 'Serene Housewarming Nasheed',
  subtitle: 'Peaceful Spiritual Background Melody',
  src: '/audio/islamic_housewarming_ambient.mp3',
};

class BackgroundMusicService {
  private audio: HTMLAudioElement | null = null;
  // User requested default volume: 15% (0.15)
  private defaultVolume = 0.15;
  private volume = 0.15;
  private isMuted = false;
  private isPlaying = false;
  private hasUserInteracted = false;
  private listeners: Set<MusicStateListener> = new Set();
  private fadeInterval: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
      this.setupGlobalInteractionListener();
    }
  }

  private initAudio() {
    try {
      this.audio = new Audio();
      this.audio.preload = 'auto';
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.src = DEFAULT_TRACK.src;
    } catch {
      // Audio element error fallback
    }
  }

  private setupGlobalInteractionListener() {
    const handleFirstInteraction = () => {
      if (this.hasUserInteracted) return;
      this.hasUserInteracted = true;

      // Automatically start background music at 15% volume if not muted
      if (!this.isMuted && !this.isPlaying) {
        this.play(true);
      }

      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
  }

  private notify() {
    const state = {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
    this.listeners.forEach((listener) => listener(state));
  }

  public subscribe(listener: MusicStateListener): () => void {
    this.listeners.add(listener);
    listener({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  public async play(fadeIn = true): Promise<boolean> {
    if (!this.audio) return false;
    this.hasUserInteracted = true;
    this.isMuted = false;

    if (fadeIn) {
      this.audio.volume = 0.03;
    } else {
      this.audio.volume = this.defaultVolume;
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.volume = this.defaultVolume;
      this.notify();

      if (fadeIn) {
        this.fadeIn(this.defaultVolume);
      }
      return true;
    } catch {
      this.isPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause(): void {
    if (!this.audio) return;
    this.clearFade();
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggleMute(): boolean {
    if (!this.audio) return false;

    if (this.isPlaying && !this.isMuted) {
      // Mute
      this.isMuted = true;
      this.audio.muted = true;
      this.pause();
    } else {
      // Unmute & play at 15%
      this.isMuted = false;
      this.audio.muted = false;
      this.volume = this.defaultVolume;
      this.audio.volume = this.defaultVolume;
      this.play(true);
    }
    this.notify();
    return this.isMuted;
  }

  private fadeIn(targetVolume: number) {
    this.clearFade();
    let current = 0.03;
    const step = 0.02;
    this.fadeInterval = window.setInterval(() => {
      current += step;
      if (current >= targetVolume) {
        current = targetVolume;
        this.clearFade();
      }
      if (this.audio) {
        this.audio.volume = current;
      }
    }, 120);
  }

  private clearFade() {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
  }
}

export const backgroundMusic = new BackgroundMusicService();
