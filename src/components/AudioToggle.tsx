import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, SkipForward, Sliders } from 'lucide-react';
import { backgroundMusic, TRACKS } from '../services/backgroundMusic';
import { soundEffects } from '../services/soundEffects';

export const AudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const unsubscribe = backgroundMusic.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
      setCurrentTrack(state.trackIndex);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play(true);
      soundEffects.setMuted(false);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    backgroundMusic.setVolume(newVol);
    if (newVol > 0) {
      soundEffects.setMuted(false);
    }
  };

  const handleNextTrack = () => {
    backgroundMusic.nextTrack();
  };

  return (
    <div className={`fixed top-4 right-4 z-40 flex flex-col items-end ${className}`}>
      {/* Main Floating Pill Button */}
      <div className="flex items-center gap-1.5 p-1 rounded-full border border-[#C6A15B]/50 bg-[#0B211B]/90 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        {/* Play / Pause Toggle Button */}
        <button
          onClick={handleTogglePlay}
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123B30] hover:bg-[#1a4f41] text-[#E6C781] hover:text-[#FFF] border border-[#C6A15B]/40 active:scale-95 transition-all text-xs font-serif shadow-sm group"
          aria-label={isPlaying ? 'Pause background music' : 'Play Islamic housewarming background music'}
          title={isPlaying ? 'Pause Islamic background music' : 'Play serene Islamic background music (Medium sound)'}
        >
          {isPlaying ? (
            <>
              {/* Animated Antique Gold Sound Waves */}
              <div className="flex items-end gap-[2px] h-3.5 w-3.5 px-0.5" aria-hidden="true">
                <span className="w-1 bg-[#E6C781] rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-full" />
                <span className="w-1 bg-[#C6A15B] rounded-full animate-[bounce_0.8s_ease-in-out_0.2s_infinite] h-2/3" />
                <span className="w-1 bg-[#FFF4D9] rounded-full animate-[bounce_0.8s_ease-in-out_0.4s_infinite] h-4/5" />
              </div>
              <span className="font-semibold tracking-wider text-[11px] uppercase">
                Music Playing
              </span>
            </>
          ) : (
            <>
              <Music className="w-3.5 h-3.5 text-[#C6A15B] group-hover:rotate-12 transition-transform" />
              <span className="tracking-wider text-[11px] uppercase font-medium">
                Play Music
              </span>
            </>
          )}
        </button>

        {/* Volume & Settings Toggle Dropdown Button */}
        <button
          onClick={() => setShowControls((prev) => !prev)}
          type="button"
          className={`p-1.5 rounded-full border border-transparent text-[#E6C781]/80 hover:text-white hover:bg-[#123B30] transition-colors ${
            showControls ? 'bg-[#123B30] text-[#FFF] border-[#C6A15B]/50' : ''
          }`}
          aria-label="Sound settings"
          title="Sound volume and track settings"
        >
          {volume === 0 || !isPlaying ? (
            <VolumeX className="w-4 h-4 text-[#C6A15B]/70" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#E6C781]" />
          )}
        </button>
      </div>

      {/* Expanded Sound & Volume Panel */}
      {showControls && (
        <div className="mt-2 w-64 p-3.5 rounded-xl border border-[#C6A15B] bg-[#0B211B]/95 backdrop-blur-lg shadow-[0_12px_32px_rgba(0,0,0,0.7)] text-left animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-[#C6A15B]/30 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#E6C781]">
                Islamic Ambiance
              </span>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#123B30] text-[#C6A15B] border border-[#C6A15B]/30">
              Medium Sound
            </span>
          </div>

          {/* Current Track Info */}
          <div className="mb-3 bg-[#081813] p-2 rounded-lg border border-[#C6A15B]/20 flex items-center justify-between">
            <div className="overflow-hidden pr-2">
              <p className="font-serif text-xs text-[#FFF5DF] truncate font-semibold">
                {TRACKS[currentTrack]?.title}
              </p>
              <p className="text-[10px] text-[#E6C781]/70 truncate font-serif italic">
                {TRACKS[currentTrack]?.subtitle}
              </p>
            </div>
            <button
              onClick={handleNextTrack}
              type="button"
              className="p-1 rounded hover:bg-[#123B30] text-[#C6A15B] hover:text-[#FFF] transition-colors"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Preset Controls */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] text-[#E6C781]/80 font-serif">
              <span>Volume</span>
              <span className="font-mono text-[10px] text-[#FFF]">{Math.round(volume * 100)}%</span>
            </div>

            {/* Quick volume buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleVolumeChange(0.18)}
                className={`py-1 px-1.5 text-[10px] rounded border font-serif transition-colors ${
                  volume > 0 && volume < 0.28
                    ? 'bg-[#C6A15B] text-[#0B211B] font-bold border-[#C6A15B]'
                    : 'bg-[#123B30] text-[#E6C781] border-[#C6A15B]/30 hover:border-[#C6A15B]'
                }`}
              >
                Soft (20%)
              </button>
              <button
                type="button"
                onClick={() => handleVolumeChange(0.35)}
                className={`py-1 px-1.5 text-[10px] rounded border font-serif transition-colors ${
                  volume >= 0.28 && volume <= 0.45
                    ? 'bg-[#C6A15B] text-[#0B211B] font-bold border-[#C6A15B]'
                    : 'bg-[#123B30] text-[#E6C781] border-[#C6A15B]/30 hover:border-[#C6A15B]'
                }`}
              >
                Medium (35%)
              </button>
              <button
                type="button"
                onClick={() => handleVolumeChange(0.6)}
                className={`py-1 px-1.5 text-[10px] rounded border font-serif transition-colors ${
                  volume > 0.45
                    ? 'bg-[#C6A15B] text-[#0B211B] font-bold border-[#C6A15B]'
                    : 'bg-[#123B30] text-[#E6C781] border-[#C6A15B]/30 hover:border-[#C6A15B]'
                }`}
              >
                Full (60%)
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#123B30] rounded-lg appearance-none cursor-pointer accent-[#C6A15B] mt-2"
              aria-label="Adjust volume slider"
            />
          </div>

          <div className="mt-2.5 pt-2 border-t border-[#C6A15B]/20 text-center">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="text-[11px] font-serif uppercase tracking-wider text-[#E6C781] hover:text-white flex items-center justify-center gap-1.5 mx-auto"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-[#C6A15B]" />
                  <span>Pause Music</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#C6A15B]" />
                  <span>Start Ambiance</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
