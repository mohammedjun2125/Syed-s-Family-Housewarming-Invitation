import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { backgroundMusic } from '../services/backgroundMusic';
import { soundEffects } from '../services/soundEffects';

export const AudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = backgroundMusic.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleMute = () => {
    const muted = backgroundMusic.toggleMute();
    soundEffects.setMuted(muted);
  };

  const active = isPlaying && !isMuted;

  return (
    <div className={`fixed top-4 right-4 z-40 ${className}`}>
      {/* Clean Single Mute / Unmute Button */}
      <button
        onClick={handleToggleMute}
        type="button"
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]/50 ${
          active
            ? 'bg-[#123B30]/90 border-[#E6C781] text-[#FFF4D9] shadow-[0_0_18px_rgba(230,199,129,0.35)]'
            : 'bg-[#0B211B]/85 border-[#C6A15B]/40 text-[#C6A15B]/80 hover:text-[#E6C781] hover:border-[#C6A15B]'
        }`}
        aria-label={active ? 'Mute background music' : 'Unmute background music'}
        title={active ? 'Mute background music' : 'Unmute background music (15% volume)'}
      >
        {active ? (
          <>
            <Volume2 className="w-4 h-4 text-[#E6C781]" />
            {/* Subtle animated sound wave bars */}
            <div className="flex items-end gap-[2px] h-3 w-3 px-0.5" aria-hidden="true">
              <span className="w-0.5 bg-[#E6C781] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-full" />
              <span className="w-0.5 bg-[#C6A15B] rounded-full animate-[pulse_1s_ease-in-out_0.25s_infinite] h-2/3" />
              <span className="w-0.5 bg-[#FFF4D9] rounded-full animate-[pulse_1s_ease-in-out_0.5s_infinite] h-4/5" />
            </div>
            <span className="font-serif text-[11px] uppercase tracking-wider font-semibold text-[#E6C781]">
              Sound On
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#C6A15B]/80" />
            <span className="font-serif text-[11px] uppercase tracking-wider text-[#C6A15B]/80 font-medium">
              Muted
            </span>
          </>
        )}
      </button>
    </div>
  );
};
