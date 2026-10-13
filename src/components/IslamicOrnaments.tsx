import React from 'react';

/**
 * Royal Islamic Calligraphic Seal & Monogram
 * Features minimal Arabic sacred calligraphy in antique gold medallion
 */
export const RoyalIslamicEmblem: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 76 }) => (
  <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
    >
      <defs>
        <radialGradient id="emblemGoldGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF7E0" />
          <stop offset="40%" stopColor="#E6C781" />
          <stop offset="75%" stopColor="#C6A15B" />
          <stop offset="100%" stopColor="#785317" />
        </radialGradient>
        <linearGradient id="ringGold" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="25%" stopColor="#C6A15B" />
          <stop offset="50%" stopColor="#E6C781" />
          <stop offset="75%" stopColor="#A88133" />
          <stop offset="100%" stopColor="#FFE8B5" />
        </linearGradient>
      </defs>

      {/* Outer scalloped 12-point floral medallion */}
      <circle cx="60" cy="60" r="54" fill="#0B211B" stroke="url(#ringGold)" strokeWidth="2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ringGold)" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Decorative Beaded Ring */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const cx = 60 + 46 * Math.cos(rad);
        const cy = 60 + 46 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="1.3" fill="url(#emblemGoldGrad)" />;
      })}

      {/* Inner Ornamental Octagon */}
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="6"
        fill="none"
        stroke="url(#ringGold)"
        strokeWidth="1.2"
        opacity="0.8"
      />
      <rect
        x="24"
        y="24"
        width="72"
        height="72"
        rx="6"
        fill="none"
        stroke="url(#ringGold)"
        strokeWidth="1.2"
        opacity="0.8"
        transform="rotate(45 60 60)"
      />

      {/* Inner Central Sunburst / Medallion Center */}
      <circle cx="60" cy="60" r="32" fill="#123B30" stroke="url(#ringGold)" strokeWidth="1.5" />

      {/* Minimal Arabic Calligraphy in Center: مَا شَاءَ ٱللَّٰهُ */}
      <text
        x="60"
        y="62"
        textAnchor="middle"
        dominantBaseline="central"
        fill="url(#emblemGoldGrad)"
        fontFamily="'Amiri', serif"
        fontSize="18"
        fontWeight="bold"
        className="tracking-normal select-none"
      >
        مَا شَاءَ ٱللَّٰهُ
      </text>
    </svg>
  </div>
);

/**
 * Corner arabesque flourish with responsive sizing and absolute placement safety
 */
export const CornerOrnament: React.FC<{ className?: string; position?: 'tl' | 'tr' | 'bl' | 'br' }> = ({
  className = '',
  position = 'tl',
}) => {
  const rotationMap = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  };

  return (
    <div className={`pointer-events-none select-none z-0 ${rotationMap[position]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#C6A15B] opacity-80"
      >
        <path
          d="M4 4 H46 C38 14, 28 22, 22 30 C18 38, 16 46, 16 60 C12 52, 8 42, 4 40 Z"
          fill="url(#cornerGoldGrad)"
        />
        <path
          d="M8 8 H38 C30 15, 22 22, 18 29 C14 36, 12 44, 12 54"
          stroke="url(#cornerGoldGradLight)"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="14" cy="14" r="2.8" fill="url(#cornerGoldGradLight)" />
        <circle cx="24" cy="10" r="1.6" fill="url(#cornerGoldGradLight)" />
        <circle cx="10" cy="24" r="1.6" fill="url(#cornerGoldGradLight)" />
        <defs>
          <linearGradient id="cornerGoldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E6C781" />
            <stop offset="60%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#7A561E" />
          </linearGradient>
          <linearGradient id="cornerGoldGradLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="60%" stopColor="#E6C781" />
            <stop offset="100%" stopColor="#C6A15B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

/**
 * Authentic Royal Divider
 */
export const OrnateDivider: React.FC<{
  className?: string;
  width?: string;
}> = ({ className = '', width = 'w-48 sm:w-64' }) => (
  <div className={`flex items-center justify-center gap-2 mx-auto my-3 ${width} ${className}`}>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B] to-[#C6A15B]/80" />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#C6A15B]">
      <rect x="10" y="10" width="4" height="4" transform="rotate(45 12 12)" fill="#E6C781" />
      <circle cx="6" cy="12" r="1.2" fill="#C6A15B" />
      <circle cx="18" cy="12" r="1.2" fill="#C6A15B" />
    </svg>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C6A15B] to-[#C6A15B]/80" />
  </div>
);

/**
 * Antique Hanging Lantern with warm gentle flicker
 */
export const AntiqueLantern: React.FC<{ className?: string; side?: 'left' | 'right' }> = ({
  className = '',
  side = 'left',
}) => (
  <div
    className={`absolute pointer-events-none z-10 flex flex-col items-center animate-lantern-sway select-none ${className}`}
    style={{ transformOrigin: 'top center' }}
  >
    <div className="w-[1.5px] h-14 bg-gradient-to-b from-[#C6A15B]/20 via-[#C6A15B]/70 to-[#E6C781]" />
    <div className="w-3.5 h-3.5 -mt-0.5 rounded-full border border-[#C6A15B] bg-transparent" />
    <div className="w-8 h-4 -mt-1 bg-gradient-to-b from-[#8F6B2C] to-[#C6A15B] rounded-t-full shadow-md" />
    <div className="relative w-7 h-10 border border-[#C6A15B]/70 bg-gradient-to-b from-[#E6C781]/30 via-[#FFE194]/50 to-[#C6A15B]/20 backdrop-blur-[1px] shadow-[0_0_18px_rgba(230,199,129,0.55)] flex items-center justify-center overflow-hidden">
      <div className="w-2.5 h-5 bg-gradient-to-t from-[#FF9E00] via-[#FFE484] to-white rounded-full blur-[0.5px] animate-pulse shadow-[0_0_14px_#FFB703]" />
      <div className="absolute inset-0 border-x border-[#C6A15B]/40 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#C6A15B]/40 pointer-events-none" />
    </div>
    <div className="w-8 h-3 bg-gradient-to-t from-[#7A561E] to-[#C6A15B] rounded-b-sm shadow-md" />
    <div className="w-1.5 h-2.5 bg-[#E6C781] rounded-b-full shadow-[0_0_6px_#E6C781]" />

    <div
      className={`absolute top-12 ${
        side === 'left' ? '-left-6' : '-right-6'
      } w-36 h-36 rounded-full bg-gradient-to-r from-[#E6C781]/15 to-transparent blur-2xl pointer-events-none`}
    />
  </div>
);

/**
 * Live Background Rotating Islamic Geometric Girih Mandala
 */
export const LiveIslamicGirihBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-20">
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] sm:w-[900px] sm:h-[900px] animate-spin-extremely-slow"
      style={{ animationDuration: '140s' }}
    >
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="200" cy="200" r="190" stroke="#C6A15B" strokeWidth="0.8" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="150" stroke="#E6C781" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="100" stroke="#C6A15B" strokeWidth="0.6" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="60" stroke="#E6C781" strokeWidth="0.8" />

        {Array.from({ length: 12 }).map((_, i) => {
          const rotation = i * 30;
          return (
            <g key={i} transform={`rotate(${rotation} 200 200)`}>
              <polygon
                points="200,10 215,80 200,150 185,80"
                stroke="#C6A15B"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                d="M200 40 Q240 120 200 200 Q160 120 200 40"
                stroke="#E6C781"
                strokeWidth="0.6"
                fill="none"
              />
              <circle cx="200" cy="15" r="2.5" fill="#C6A15B" />
            </g>
          );
        })}
      </svg>
    </div>

    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-b from-[#C6A15B]/15 via-[#123B30]/10 to-transparent blur-3xl pointer-events-none" />
  </div>
);
