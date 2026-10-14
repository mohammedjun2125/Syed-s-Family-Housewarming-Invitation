/**
 * Ambient Islamic Housewarming Background Music Service
 * Provides gentle, medium-volume spiritual ambiance (Ney / Nasheed / Acoustic Oud & Duff)
 * Includes smooth fade-in, volume control, track selection, and graceful fallback.
 */

type MusicStateListener = (state: {
  isPlaying: boolean;
  volume: number;
  trackIndex: number;
  trackName: string;
  isMuted: boolean;
}) => void;

export interface Track {
  title: string;
  subtitle: string;
  src: string;
}

export const TRACKS: Track[] = [
  {
    title: 'Serene Housewarming Nasheed',
    subtitle: 'Peaceful Spiritual Blessing',
    src: '/audio/islamic_housewarming_ambient.mp3',
  },
  {
    title: 'Barakah Home Melody',
    subtitle: 'Acoustic Ambiance & Ney Flute',
    src: '/audio/islamic_housewarming_barakah.mp3',
  },
];

class BackgroundMusicService {
  private audio: HTMLAudioElement | null = null;
  private currentTrackIndex = 0;
  // "not to loud medium in sound" -> 0.35 medium volume
  private volume = 0.35;
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
      this.audio.src = TRACKS[this.currentTrackIndex].src;

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('error', () => {
        // Fallback to second track if first fails
        if (this.currentTrackIndex === 0) {
          this.switchTrack(1);
        }
      });
    } catch {
      // Audio element not supported
    }
  }

  private setupGlobalInteractionListener() {
    const handleFirstInteraction = () => {
      if (this.hasUserInteracted) return;
      this.hasUserInteracted = true;

      // Automatically start background music at medium volume if not explicitly muted
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
      volume: this.volume,
      trackIndex: this.currentTrackIndex,
      trackName: TRACKS[this.currentTrackIndex]?.title || 'Islamic Melody',
      isMuted: this.isMuted,
    };
    this.listeners.forEach((listener) => listener(state));
  }

  public subscribe(listener: MusicStateListener): () => void {
    this.listeners.add(listener);
    // Initial call
    listener({
      isPlaying: this.isPlaying,
      volume: this.volume,
      trackIndex: this.currentTrackIndex,
      trackName: TRACKS[this.currentTrackIndex]?.title || 'Islamic Melody',
      isMuted: this.isMuted,
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
      this.audio.volume = 0.05;
    } else {
      this.audio.volume = this.volume;
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();

      if (fadeIn) {
        this.fadeIn(this.volume);
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

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(true);
      return true;
    }
  }

  public toggleMute(): boolean {
    if (!this.audio) return false;
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.audio.volume = 0;
      this.pause();
    } else {
      this.setVolume(this.volume > 0 ? this.volume : 0.35);
      this.play(true);
    }
    this.notify();
    return this.isMuted;
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    if (this.volume > 0 && this.isMuted) {
      this.isMuted = false;
    }
    this.notify();
  }

  public switchTrack(index: number): void {
    if (index < 0 || index >= TRACKS.length || !this.audio) return;
    this.currentTrackIndex = index;
    const wasPlaying = this.isPlaying;
    this.audio.src = TRACKS[index].src;
    this.audio.load();
    if (wasPlaying) {
      this.play(true);
    } else {
      this.notify();
    }
  }

  public nextTrack(): void {
    const nextIndex = (this.currentTrackIndex + 1) % TRACKS.length;
    this.switchTrack(nextIndex);
  }

  private fadeIn(targetVolume: number) {
    this.clearFade();
    let current = 0.05;
    const step = 0.03;
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
      volume: this.volume,
      trackIndex: this.currentTrackIndex,
      track: TRACKS[this.currentTrackIndex],
      isMuted: this.isMuted,
    };
  }
}

export const backgroundMusic = new BackgroundMusicService();
