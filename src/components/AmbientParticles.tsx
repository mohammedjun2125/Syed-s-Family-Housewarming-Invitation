import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const AmbientParticles: React.FC<{ count?: number }> = ({ count = 18 }) => {
  // Pre-calculate deterministic particle positions so they don't jitter on re-renders
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.round(((i * 37 + 13) % 100)),
      top: Math.round(((i * 53 + 29) % 100)),
      size: 1.5 + (i % 3) * 1.2,
      duration: 10 + (i % 8) * 2,
      delay: -(i * 1.5),
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#E6C781] blur-[0.5px] will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px #FFE484`,
            animation: `floatUp ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translate(0, 0) scale(0.8);
          }
          50% {
            transform: translate(14px, -28px) scale(1.2);
          }
          100% {
            transform: translate(-12px, -60px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
};
