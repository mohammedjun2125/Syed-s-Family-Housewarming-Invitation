import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/event';
import {
  AntiqueLantern,
  OrnateDivider,
  LiveIslamicGirihBackground,
} from './IslamicOrnaments';
import { InvitationCover } from './InvitationCover';
import { OpeningAnimation } from './OpeningAnimation';
import { InvitationPage } from './InvitationPage';
import { BookOpen } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';
import { backgroundMusic } from '../services/backgroundMusic';

export const InvitationBook: React.FC = () => {
  const [invitationState, setInvitationState] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleOpen = () => {
    if (invitationState !== 'closed') return;
    backgroundMusic.play(true);
    soundEffects.setMuted(false);
    setInvitationState('opening');
  };

  const handleAnimationComplete = () => {
    setInvitationState('opened');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    soundEffects.playBookClose();
    setInvitationState('closed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parallax for desktop pointer
  useEffect(() => {
    if (invitationState !== 'closed') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * -10;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [invitationState]);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between islamic-pattern-bg overflow-x-hidden">
      {/* Vintage Housewarming Courtyard Background Photo Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-center bg-cover mix-blend-luminosity z-0 transition-opacity duration-1000"
        style={{ backgroundImage: `url(${EVENT_CONFIG.images.vintageBackground})` }}
      />
      {/* Dark gradient overlay to keep high contrast & vintage luxury tone */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#0B211B]/85 via-[#0B211B]/75 to-[#0B211B]/95 z-0" />

      {/* Live Animated Islamic Girih Geometric Mandala */}
      <LiveIslamicGirihBackground />

      {/* Antique Lanterns - safely placed on screen borders */}
      <AntiqueLantern
        side="left"
        className="top-0 left-1 sm:left-6 md:left-12 scale-75 sm:scale-100 opacity-90 z-10"
      />
      <AntiqueLantern
        side="right"
        className="top-0 right-1 sm:right-6 md:right-12 scale-75 sm:scale-100 opacity-90 z-10"
      />

      {/* REVEALED INVITATION PAGE */}
      {invitationState === 'opened' && (
        <main className="relative z-20 w-full pt-4">
          <InvitationPage onClose={handleClose} />
        </main>
      )}

      {/* 3D BOOK-OPENING ANIMATION OVERLAY */}
      {invitationState === 'opening' && (
        <OpeningAnimation onAnimationComplete={handleAnimationComplete} />
      )}

      {/* INITIAL SCREEN: CLOSED BOOK */}
      {invitationState === 'closed' && (
        <main className="relative z-20 w-full min-h-[100dvh] flex flex-col justify-between py-5 sm:py-6 px-4 max-w-2xl mx-auto text-center">
          {/* Top Section: Minimal Arabic Bismillah & Syed's Family Showcase */}
          <header className="pt-2 sm:pt-4 px-2">
            <p className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#E6C781] font-bold tracking-wide drop-shadow-md">
              {EVENT_CONFIG.bismillah.arabic}
            </p>

            <h2 className="font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#C6A15B] uppercase font-semibold mt-1">
              {EVENT_CONFIG.bismillah.transliteration}
            </h2>

            {/* Auspicious Ceremony Badge */}
            <div className="inline-flex items-center gap-2 mt-2.5 px-5 py-1.5 rounded-full border border-[#C6A15B]/60 bg-[#0B211B]/90 shadow-md">
              <span className="font-serif text-xs uppercase tracking-widest text-[#E6C781] font-bold">
                HOUSEWARMING CEREMONY
              </span>
            </div>

            <OrnateDivider width="w-36 sm:w-56" className="mt-2.5" />
          </header>

          {/* Central 3D Closed Invitation Book */}
          <section
            className="my-auto py-3 sm:py-4 flex flex-col items-center justify-center transition-transform duration-300 ease-out will-change-transform z-20"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            }}
          >
            <InvitationCover onOpen={handleOpen} isOpening={false} />
          </section>

          {/* Bottom Section: English Copy & Primary Open Button */}
          <footer className="pb-4 sm:pb-6 space-y-2 sm:space-y-3 z-20">
            <p className="font-serif italic text-xs sm:text-sm text-[#F4EBDD]/90 max-w-sm mx-auto leading-relaxed">
              "{EVENT_CONFIG.copy.coverSubtext}"
            </p>

            {/* Primary Open Invitation Button */}
            <div className="pt-1">
              <button
                onClick={handleOpen}
                type="button"
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 rounded-xl border-2 border-[#E6C781] bg-gradient-to-r from-[#123B30] via-[#1b5344] to-[#123B30] text-[#FFF4D9] font-serif font-bold text-sm sm:text-base tracking-[0.16em] uppercase inline-flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(198,161,91,0.35),_0_8px_20px_rgba(0,0,0,0.6)] hover:border-[#FFF4D9] hover:shadow-[0_0_35px_rgba(230,199,129,0.55)] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/50 group"
                aria-label="Open your housewarming invitation"
              >
                <BookOpen className="w-4 h-4 text-[#E6C781] group-hover:scale-110 transition-transform" />
                <span>OPEN YOUR INVITATION</span>
              </button>
            </div>

            <p className="text-[11px] uppercase tracking-widest text-[#C6A15B]/90 font-medium">
              Tap to open
            </p>
          </footer>
        </main>
      )}
    </div>
  );
};
