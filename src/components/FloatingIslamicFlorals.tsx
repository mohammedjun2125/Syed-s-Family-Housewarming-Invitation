import React, { useMemo } from 'react';

/**
 * Animated Floating Floral Elements (Islamic Geometry Inspired)
 * Drifts slowly, gently rotating across the background to enhance
 * the premium, ethereal atmosphere of the invitation.
 */

// Floral Pattern 1: 8-Fold Khatam Arabesque Rosette
const IslamicFloralRosette: React.FC<{ size: number; color?: string }> = ({
  size,
  color = '#C6A15B',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_8px_rgba(230,199,129,0.3)]"
  >
    {/* 8-Petal Symmetrical Blossom */}
    <g stroke={color} strokeWidth="1.2" fill={`${color}12`} strokeLinejoin="round">
      {/* Central 8-pointed star */}
      <polygon points="50,38 53,47 62,50 53,53 50,62 47,53 38,50 47,47" fill={`${color}25`} />
      {/* 8 Rounded Arabesque Petals */}
      <path d="M50 38 C42 22 58 22 50 38" />
      <path d="M50 62 C42 78 58 78 50 62" />
      <path d="M38 50 C22 42 22 58 38 50" />
      <path d="M62 50 C78 42 78 58 62 50" />
      {/* Diagonal Petals */}
      <path d="M41.5 41.5 C29 29 41 21 41.5 41.5" />
      <path d="M58.5 58.5 C71 71 59 79 58.5 58.5" />
      <path d="M58.5 41.5 C71 29 79 41 58.5 41.5" />
      <path d="M41.5 58.5 C29 71 21 59 41.5 58.5" />
      {/* Outer delicate ring & stamen dots */}
      <circle cx="50" cy="50" r="3.5" fill={color} />
      <circle cx="50" cy="22" r="1.5" fill={color} opacity="0.8" />
      <circle cx="50" cy="78" r="1.5" fill={color} opacity="0.8" />
      <circle cx="22" cy="50" r="1.5" fill={color} opacity="0.8" />
      <circle cx="78" cy="50" r="1.5" fill={color} opacity="0.8" />
    </g>
  </svg>
);

// Floral Pattern 2: Damascus Geometric Blossom Star
const IslamicGeometricBlossom: React.FC<{ size: number; color?: string }> = ({
  size,
  color = '#E6C781',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[0_0_6px_rgba(198,161,91,0.25)]"
  >
    <g stroke={color} strokeWidth="1" fill={`${color}0A`}>
      {/* Overlapping Squares forming 8-star */}
      <rect x="30" y="30" width="40" height="40" rx="3" />
      <rect x="30" y="30" width="40" height="40" rx="3" transform="rotate(45 50 50)" />
      {/* Arabesque Leaf Foliage Tips */}
      <path d="M50 16 Q56 26 50 30 Q44 26 50 16 Z" fill={`${color}20`} />
      <path d="M50 84 Q56 74 50 70 Q44 74 50 84 Z" fill={`${color}20`} />
      <path d="M16 50 Q26 56 30 50 Q26 44 16 50 Z" fill={`${color}20`} />
      <path d="M84 50 Q74 56 70 50 Q74 44 84 50 Z" fill={`${color}20`} />
      {/* Central jewel */}
      <circle cx="50" cy="50" r="5" strokeWidth="1.2" fill={`${color}30`} />
      <circle cx="50" cy="50" r="1.5" fill="#FFFDF8" />
    </g>
  </svg>
);

// Floral Pattern 3: Ethereal Floating Arabesque Petal
const IslamicFloralPetal: React.FC<{ size: number; color?: string }> = ({
  size,
  color = '#FAF5EB',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke={color} strokeWidth="0.9" fill={`${color}10`}>
      {/* Teardrop palmette / floral leaf with gold vein */}
      <path d="M30 6 C44 20 42 42 30 54 C18 42 16 20 30 6 Z" />
      <path d="M30 16 L30 46" strokeWidth="0.8" opacity="0.7" />
      <path d="M30 25 Q36 29 40 33" strokeWidth="0.7" opacity="0.5" />
      <path d="M30 25 Q24 29 20 33" strokeWidth="0.7" opacity="0.5" />
      <circle cx="30" cy="8" r="1.5" fill={color} opacity="0.7" />
    </g>
  </svg>
);

interface FloatingFloralItem {
  id: number;
  type: 1 | 2 | 3;
  size: number;
  leftPercent: number;
  delaySec: number;
  durationSec: number;
  animClass: string;
  opacity: number;
}

export const FloatingIslamicFlorals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const florals = useMemo<FloatingFloralItem[]>(() => {
    // Generate deterministic yet natural floating positions
    const items: FloatingFloralItem[] = [];
    const seed = [
      { left: 6, size: 42, dur: 32, delay: 0, type: 1, anim: 1, op: 0.22 },
      { left: 18, size: 28, dur: 40, delay: 6, type: 3, anim: 2, op: 0.20 },
      { left: 32, size: 54, dur: 36, delay: 14, type: 2, anim: 1, op: 0.25 },
      { left: 48, size: 34, dur: 44, delay: 3, type: 3, anim: 2, op: 0.18 },
      { left: 64, size: 48, dur: 38, delay: 19, type: 1, anim: 1, op: 0.24 },
      { left: 78, size: 30, dur: 42, delay: 9, type: 3, anim: 2, op: 0.19 },
      { left: 91, size: 44, dur: 34, delay: 22, type: 2, anim: 1, op: 0.23 },
      { left: 12, size: 36, dur: 46, delay: 16, type: 2, anim: 2, op: 0.21 },
      { left: 40, size: 26, dur: 38, delay: 27, type: 3, anim: 1, op: 0.17 },
      { left: 58, size: 40, dur: 42, delay: 11, type: 1, anim: 2, op: 0.22 },
      { left: 84, size: 32, dur: 35, delay: 30, type: 3, anim: 1, op: 0.18 },
      { left: 25, size: 46, dur: 48, delay: 24, type: 1, anim: 2, op: 0.20 },
    ];

    for (let i = 0; i < Math.min(count, seed.length); i++) {
      const s = seed[i];
      items.push({
        id: i,
        type: s.type as 1 | 2 | 3,
        size: s.size,
        leftPercent: s.left,
        delaySec: s.delay,
        durationSec: s.dur,
        animClass: s.anim === 1 ? 'animate-floral-drift-1' : 'animate-floral-drift-2',
        opacity: s.op,
      });
    }

    return items;
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {florals.map((item) => (
        <div
          key={item.id}
          className={`absolute bottom-[-60px] ${item.animClass}`}
          style={
            {
              left: `${item.leftPercent}%`,
              animationDuration: `${item.durationSec}s`,
              animationDelay: `-${item.delaySec}s`,
              '--floral-max-opacity': item.opacity,
            } as React.CSSProperties
          }
        >
          {item.type === 1 && <IslamicFloralRosette size={item.size} color="#C6A15B" />}
          {item.type === 2 && <IslamicGeometricBlossom size={item.size} color="#E6C781" />}
          {item.type === 3 && <IslamicFloralPetal size={item.size} color="#FAF5EB" />}
        </div>
      ))}
    </div>
  );
};
