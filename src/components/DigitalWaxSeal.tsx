import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';
import confetti from 'canvas-confetti';

interface DigitalWaxSealProps {
  className?: string;
}

export const DigitalWaxSeal: React.FC<DigitalWaxSealProps> = ({ className = '' }) => {
  const [isBroken, setIsBroken] = useState(false);
  const [flourishActive, setFlourishActive] = useState(false);

  const handleToggleSeal = () => {
    if (!isBroken) {
      // Unseal
      soundEffects.playChime();
      setIsBroken(true);
      setFlourishActive(true);

      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#E6C781', '#C6A15B', '#FFF5DF', '#123B30'],
          disableForReducedMotion: true,
        });
      } catch {
        // Confetti optional
      }

      setTimeout(() => setFlourishActive(false), 1200);
    } else {
      // Re-seal
      soundEffects.playClick();
      setIsBroken(false);
    }
  };

  return (
    <div className={`w-full max-w-lg mx-auto text-center my-8 ${className}`}>
      {/* Interactive Wax Seal Trigger Button */}
      <div className="relative inline-block">
        <button
          onClick={handleToggleSeal}
          type="button"
          aria-expanded={isBroken}
          aria-label={isBroken ? 'Close thank you note and re-seal' : 'Break wax seal to reveal thank you message'}
          className="group relative cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {/* Subtle Golden Glow / Aura Behind Seal */}
          <div
            className={`absolute inset-0 rounded-full blur-xl transition-all duration-700 pointer-events-none ${
              isBroken
                ? 'bg-[#E6C781]/40 scale-125'
                : 'bg-[#C6A15B]/20 group-hover:bg-[#E6C781]/35 group-hover:scale-110'
            }`}
          />

          {/* 3D Realistic Digital Wax Seal Disc */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto select-none">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:rotate-6"
            >
              {/* Outer irregular melted wax puddle shape */}
              <defs>
                <radialGradient id="waxBaseGrad" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#8A1C14" />
                  <stop offset="45%" stopColor="#69130D" />
                  <stop offset="85%" stopColor="#450A05" />
                  <stop offset="100%" stopColor="#2A0402" />
                </radialGradient>
                <radialGradient id="waxBevelGrad" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#BA2E22" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#69130D" stopOpacity="0" />
                  <stop offset="100%" stopColor="#1E0302" stopOpacity="0.9" />
                </radialGradient>
                <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF8E7" />
                  <stop offset="40%" stopColor="#E6C781" />
                  <stop offset="80%" stopColor="#C6A15B" />
                  <stop offset="100%" stopColor="#8F6B2C" />
                </linearGradient>
                <filter id="waxInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* Natural Organic Wax Melt Silhouette */}
              <path
                d="M50 4 C65 3 76 10 86 20 C96 30 98 44 95 58 C92 72 84 84 72 92 C60 100 42 98 28 93 C14 88 5 76 3 62 C1 48 6 34 16 22 C26 10 35 5 50 4 Z"
                fill="url(#waxBaseGrad)"
                stroke="#BA2E22"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />
              <path
                d="M50 4 C65 3 76 10 86 20 C96 30 98 44 95 58 C92 72 84 84 72 92 C60 100 42 98 28 93 C14 88 5 76 3 62 C1 48 6 34 16 22 C26 10 35 5 50 4 Z"
                fill="url(#waxBevelGrad)"
              />

              {/* Inner Raised Stamped Bezel */}
              <circle
                cx="50"
                cy="50"
                r="34"
                fill="url(#waxBaseGrad)"
                stroke="#450A05"
                strokeWidth="2.5"
                filter="url(#waxInnerShadow)"
              />
              <circle
                cx="50"
                cy="50"
                r="31"
                fill="none"
                stroke="url(#sealGoldGrad)"
                strokeWidth="1.2"
                strokeDasharray="2 1.5"
                opacity="0.85"
              />

              {/* Stamped Insignia: Elegant Arabic Calligraphy / Syed Royal Crest */}
              <g id="seal-crest" transform="translate(0, 0)">
                {/* 8-pointed gold star rim */}
                <polygon
                  points="50,26 52,32 58,34 52,36 50,42 48,36 42,34 48,32"
                  fill="url(#sealGoldGrad)"
                  opacity="0.85"
                />
                {/* Arabic Calligraphic "س" (Seen) & "آل سيد" Monogram Motif */}
                <text
                  x="50"
                  y="59"
                  textAnchor="middle"
                  fontFamily="'Amiri', 'Noto Nastaliq Urdu', serif"
                  fontSize="28"
                  fontWeight="bold"
                  fill="url(#sealGoldGrad)"
                  className="select-none filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                >
                  س
                </text>
                <text
                  x="50"
                  y="71"
                  textAnchor="middle"
                  fontFamily="'Cormorant Garamond', Georgia, serif"
                  fontSize="7.5"
                  fontWeight="bold"
                  letterSpacing="1.5"
                  fill="url(#sealGoldGrad)"
                  className="uppercase select-none opacity-90"
                >
                  SYED
                </text>
              </g>

              {/* Crack line animation when unsealed */}
              {isBroken && (
                <path
                  d="M50 14 L48 30 L52 46 L47 62 L51 86"
                  stroke="#FFD700"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.9"
                  className="animate-in fade-in duration-300"
                />
              )}
            </svg>

            {/* Pulsing Hint Badge */}
            {!isBroken && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6C781] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C6A15B]" />
              </span>
            )}
          </div>

          {/* Interactive Tag beneath seal */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C6A15B]/50 bg-[#0B211B]/90 text-[#E6C781] text-[10px] sm:text-xs uppercase font-serif tracking-widest font-semibold shadow-sm group-hover:border-[#E6C781] group-hover:bg-[#123B30] transition-colors">
              <Sparkles className="w-3 h-3 text-[#C6A15B]" />
              <span>{isBroken ? 'Sealed Note Opened • Tap to Re-seal' : 'Digital Wax Seal • Tap to Open'}</span>
            </span>
          </div>
        </button>
      </div>

      {/* REVEALED THANK YOU MESSAGE WITH FLOURISH ANIMATION */}
      {isBroken && (
        <div
          className={`mt-6 relative z-20 transition-all duration-700 ease-out transform ${
            flourishActive ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Flourish Light Aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-[#E6C781]/20 to-transparent blur-xl pointer-events-none" />

          {/* Vintage Ivory Parchment Thank-You Note */}
          <div className="relative rounded-2xl p-6 sm:p-8 bg-[#FAF5EB] text-[#222] border-2 border-[#C6A15B] shadow-[0_16px_45px_rgba(0,0,0,0.65),_0_0_25px_rgba(198,161,91,0.25)] overflow-hidden text-center">
            {/* Double Ornamental Gold Borders */}
            <div className="absolute inset-2 sm:inset-3 border border-[#C6A15B]/45 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-[#C6A15B]/25 border-dashed rounded-lg pointer-events-none" />

            {/* Corner Arabesque Accents */}
            <div className="absolute top-2.5 left-2.5 text-[#C6A15B] text-sm pointer-events-none select-none">❖</div>
            <div className="absolute top-2.5 right-2.5 text-[#C6A15B] text-sm pointer-events-none select-none">❖</div>
            <div className="absolute bottom-2.5 left-2.5 text-[#C6A15B] text-sm pointer-events-none select-none">❖</div>
            <div className="absolute bottom-2.5 right-2.5 text-[#C6A15B] text-sm pointer-events-none select-none">❖</div>

            {/* Sacred Arabic Du'a of Gratitude: Jazakumullahu Khairan */}
            <div className="relative z-10 pt-2 pb-1">
              <p className="font-amiri text-2xl sm:text-3xl text-[#123B30] font-bold tracking-wide">
                جَزَاكُمُ ٱللَّٰهُ خَيْرًا
              </p>
              <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#8F6B2C] font-semibold mt-1">
                Jazakumullahu Khairan
              </p>
              <p className="text-[10px] sm:text-xs text-[#523B19] italic font-serif opacity-80">
                "May Allah reward you abundantly with goodness"
              </p>
            </div>

            {/* Decorative Gold Divider */}
            <div className="my-3 flex items-center justify-center gap-2 relative z-10 text-[#C6A15B]">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent" />
              <Heart className="w-3.5 h-3.5 fill-[#C6A15B]/20 text-[#C6A15B]" />
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent" />
            </div>

            {/* Thank You Note Body */}
            <div className="space-y-3 relative z-10 px-2 sm:px-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#0B211B] uppercase">
                A Heartfelt Thank You
              </h3>

              <p className="font-serif text-sm sm:text-base text-[#1E3A32] leading-relaxed italic">
                "We extend our deepest gratitude to you for sharing in the joy and blessing of our new home.
                Your warm presence, loving wishes, and precious duas are the most cherished gift to our family."
              </p>

              <p className="font-serif text-xs sm:text-sm text-[#523B19] leading-relaxed">
                May Almighty Allah illuminate your life and homes with everlasting peace, divine protection, radiant health, and boundless barakah.
              </p>
            </div>

            {/* Signature Block */}
            <div className="mt-5 pt-3 border-t border-[#C6A15B]/30 relative z-10">
              <p className="text-[11px] uppercase tracking-widest font-serif text-[#7A561E] font-medium">
                With endless gratitude &amp; duas,
              </p>
              <p className="font-serif text-xl sm:text-2xl font-extrabold text-[#123B30] tracking-[0.16em] uppercase mt-1">
                THE SYED FAMILY
              </p>
            </div>

            {/* Subtle Re-fold button */}
            <div className="mt-4 pt-1 relative z-10">
              <button
                type="button"
                onClick={handleToggleSeal}
                className="text-[11px] font-serif uppercase tracking-wider text-[#8F6B2C] hover:text-[#123B30] underline underline-offset-4 transition-colors"
              >
                Re-seal Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
