/**
 * Web Audio API based sound synthesizer for the invitation book
 * Creates tactile, realistic paper turns, subtle whooshes, and warm antique chimes
 * Zero external audio downloads, 100% offline capable, muted by default.
 */

let audioCtx: AudioContext | null = null;
let isMuted = true; // Section 12: "Audio must be muted by default and completely optional"

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundEffects = {
  isMuted: () => isMuted,
  setMuted: (muted: boolean) => {
    isMuted = muted;
    if (!muted) {
      getAudioContext();
    }
  },
  toggleMute: () => {
    isMuted = !isMuted;
    if (!isMuted) {
      getAudioContext();
      soundEffects.playChime();
    }
    return isMuted;
  },

  /**
   * Sound of leather book creak and smooth parchment unfolding
   */
  playBookOpen: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Gentle low paper/leather slide
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(180, now + 0.35);
    filter.Q.setValueAtTime(1.8, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);

    // 2. Warm harmonic resonant shimmer (antique gold glow)
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (harmonious chord)
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.08 + idx * 0.03);

      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(0.018 / (idx + 1), now + 0.12 + idx * 0.03);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9 + idx * 0.1);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now + 0.08 + idx * 0.03);
      osc.stop(now + 1.2);
    });
  },

  /**
   * Sound of closing the book
   */
  playBookClose: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  },

  /**
   * Soft affirmative chime
   */
  playChime: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  },
};
