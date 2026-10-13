import React, { useMemo } from 'react';

interface SparkleDot {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export const TwinklingGoldParticles: React.FC<{ count?: number; className?: string }> = ({
  count = 20,
  className = '',
}) => {
  // Deterministic positions to avoid jumpy re-renders
  const dots = useMemo<SparkleDot[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.round(((i * 47 + 11) % 94) + 3), // 3% to 97% bounds
      top: Math.round(((i * 61 + 19) % 94) + 3),  // 3% to 97% bounds
      size: (i % 3 === 0 ? 3.5 : i % 2 === 0 ? 2.5 : 2),
      delay: -(i * 0.7),
      duration: 2.2 + (i % 4) * 0.8,
    }));
  }, [count]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none z-10 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <span
          key={dot.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: '#FFF4D9',
            boxShadow: `0 0 ${dot.size * 2}px 1px rgba(230, 199, 129, 0.85), 0 0 ${dot.size * 4}px 2px rgba(198, 161, 91, 0.4)`,
            animation: `twinkleSparkle ${dot.duration}s ease-in-out infinite alternate`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkleSparkle {
          0% {
            opacity: 0.15;
            transform: scale(0.6);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.3);
          }
          100% {
            opacity: 0.25;
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
};
