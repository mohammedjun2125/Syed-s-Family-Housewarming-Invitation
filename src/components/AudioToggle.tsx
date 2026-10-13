import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

export const AudioToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [muted, setMuted] = useState(soundEffects.isMuted());

  const handleToggle = () => {
    const newMuted = soundEffects.toggleMute();
    setMuted(newMuted);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`fixed top-4 right-4 z-40 p-2.5 min-w-[44px] min-h-[44px] rounded-full border border-[#C6A15B]/40 bg-[#0B211B]/80 text-[#E6C781] hover:text-[#FFF] hover:border-[#E6C781] hover:bg-[#123B30] active:scale-95 transition-all shadow-lg backdrop-blur-md flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#C6A15B] ${className}`}
      aria-label={muted ? 'Enable sound effects' : 'Mute sound effects'}
      title={muted ? 'Unmute subtle sounds' : 'Mute sounds'}
    >
      {muted ? (
        <VolumeX className="w-5 h-5 text-[#C6A15B]/70" />
      ) : (
        <Volume2 className="w-5 h-5 text-[#E6C781] animate-pulse" />
      )}
      <span className="text-[11px] font-medium tracking-wider uppercase pr-1 hidden sm:inline">
        {muted ? 'Sound Off' : 'Sound On'}
      </span>
    </button>
  );
};
