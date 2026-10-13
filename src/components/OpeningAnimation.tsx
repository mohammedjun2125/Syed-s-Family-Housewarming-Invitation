import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { EVENT_CONFIG } from '../config/event';
import { CornerOrnament, RoyalIslamicEmblem } from './IslamicOrnaments';
import { soundEffects } from '../services/soundEffects';

interface OpeningAnimationProps {
  onAnimationComplete: () => void;
  onCancel?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({
  onAnimationComplete,
}) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    soundEffects.playBookOpen();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        onAnimationComplete();
      }, 400);
      return () => clearTimeout(t);
    }

    const t0 = setTimeout(() => setStage(1), 150);
    const t1 = setTimeout(() => setStage(2), 850);
    const t2 = setTimeout(() => {
      setStage(3);
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.55 },
          colors: ['#E6C781', '#C6A15B', '#FFF4D9', '#B89248'],
          disableForReducedMotion: true,
          scalar: 0.8,
        });
      } catch {
        // Fallback
      }
    }, 1400);
    const t3 = setTimeout(() => {
      setStage(4);
      onAnimationComplete();
    }, 2200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onAnimationComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071713]/90 backdrop-blur-md overflow-hidden select-none px-4">
      {/* 3D Perspective Stage */}
      <div
        className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[1/1.42] perspective-container"
        style={{ perspective: '1400px' }}
      >
        {/* Book Container that lifts and tilts */}
        <div
          className={`relative w-full h-full transform-style-3d transition-all duration-700 ease-out ${
            stage >= 1 ? 'scale-105 -translate-y-2' : 'scale-100'
          }`}
          style={{
            transform: stage >= 1 ? 'rotateX(8deg) rotateY(-4deg)' : 'none',
          }}
        >
          {/* UNDERLYING PAGES (Inner Ivory Parchment) */}
          <div
            className="absolute inset-0 rounded-xl parchment-texture border border-[#C6A15B] shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Ornamental Borders */}
            <div className="absolute inset-3 border border-[#C6A15B]/40 rounded-lg pointer-events-none" />
            <CornerOrnament position="tl" className="absolute top-4 left-4 w-9 h-9" />
            <CornerOrnament position="tr" className="absolute top-4 right-4 w-9 h-9" />
            <CornerOrnament position="bl" className="absolute bottom-4 left-4 w-9 h-9" />
            <CornerOrnament position="br" className="absolute bottom-4 right-4 w-9 h-9" />

            {/* Minimal Arabic Bismillah */}
            <div
              className={`text-center transition-all duration-700 ease-out ${
                stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="font-amiri text-lg sm:text-xl text-[#123B30] font-bold">
                {EVENT_CONFIG.bismillah.arabic}
              </p>
            </div>

            {/* Center Royal Seal and English Headings */}
            <div
              className={`text-center my-auto transition-all duration-700 delay-150 ease-out ${
                stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex justify-center mb-2">
                <RoyalIslamicEmblem size={56} />
              </div>
              <p className="font-serif text-xs uppercase tracking-widest text-[#8F6B2C] font-semibold">
                {EVENT_CONFIG.family}
              </p>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0B211B] mt-0.5 uppercase">
                {EVENT_CONFIG.occasion}
              </h2>
            </div>

            <div
              className={`text-center transition-all duration-700 delay-300 ease-out ${
                stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <p className="text-[11px] font-serif uppercase tracking-wider text-[#0B211B] font-semibold">
                {EVENT_CONFIG.date.formatted}
              </p>
              <p className="text-[10px] text-[#8F6B2C] italic">{EVENT_CONFIG.time.display}</p>
            </div>

            {/* Warm light sweep overlay during stage 3 */}
            {stage >= 3 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF4D9]/40 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
            )}
          </div>

          {/* FRONT COVER THAT SWINGS OPEN AROUND LEFT SPINE */}
          <div
            className="absolute inset-0 rounded-xl leather-texture border border-[#C6A15B] shadow-2xl p-6 sm:p-8 pl-8 flex flex-col justify-between overflow-hidden transform-style-3d origin-left transition-transform ease-in-out"
            style={{
              transformOrigin: 'left center',
              transform: stage >= 1 ? 'rotateY(-165deg)' : 'rotateY(0deg)',
              transitionDuration: stage >= 1 ? '1100ms' : '0ms',
              zIndex: 30,
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#071713] to-transparent pointer-events-none" />

            {/* Front Cover Face */}
            <div className="backface-hidden w-full h-full flex flex-col justify-between">
              <div className="absolute inset-3 border border-[#C6A15B]/60 rounded-lg pointer-events-none" />
              <CornerOrnament position="tl" className="absolute top-4 left-5 w-9 h-9" />
              <CornerOrnament position="tr" className="absolute top-4 right-4 w-9 h-9" />
              <CornerOrnament position="bl" className="absolute bottom-4 left-5 w-9 h-9" />
              <CornerOrnament position="br" className="absolute bottom-4 right-4 w-9 h-9" />

              <div className="text-center pt-2">
                <p className="font-amiri text-base text-[#E6C781] font-bold">
                  {EVENT_CONFIG.bismillah.arabic}
                </p>
              </div>

              <div className="text-center my-auto px-2">
                <div className="flex justify-center mb-2">
                  <RoyalIslamicEmblem size={58} />
                </div>
                <p className="font-serif text-xs uppercase tracking-widest text-[#FFF2D6]">
                  {EVENT_CONFIG.family}
                </p>
                <h3 className="font-serif text-lg sm:text-xl font-bold gold-text-gradient leading-tight">
                  {EVENT_CONFIG.copy.coverTagline}
                </h3>
              </div>

              <div className="text-center pb-1">
                <span className="text-[10px] text-[#C6A15B] tracking-widest uppercase">
                  Opening...
                </span>
              </div>
            </div>

            {/* Inner Face of Cover */}
            <div
              className="absolute inset-0 rounded-xl parchment-texture border border-[#C6A15B] p-6 flex items-center justify-center pointer-events-none"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="w-full h-full border border-[#C6A15B]/30 rounded-lg flex items-center justify-center p-4 text-center">
                <p className="font-amiri text-sm text-[#8F6B2C]">
                  {EVENT_CONFIG.mashaAllah.arabic}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 text-center text-xs text-[#C6A15B] font-serif tracking-widest uppercase animate-pulse">
        Unfolding Your Invitation...
      </div>
    </div>
  );
};
