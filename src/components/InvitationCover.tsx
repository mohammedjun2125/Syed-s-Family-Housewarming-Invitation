import React from 'react';
import { EVENT_CONFIG } from '../config/event';
import { CornerOrnament, RoyalIslamicEmblem } from './IslamicOrnaments';
import { BookOpen } from 'lucide-react';

interface InvitationCoverProps {
  onOpen: () => void;
  isOpening?: boolean;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({ onOpen, isOpening = false }) => {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] mx-auto select-none group">
      {/* 3D Realistic Book Representation */}
      <div
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpen();
          }
        }}
        className={`relative aspect-[1/1.42] rounded-xl leather-texture cursor-pointer transition-transform duration-500 transform-style-3d border border-[#C6A15B]/60 hover:border-[#E6C781] hover:scale-[1.015] active:scale-[0.985] shadow-[0_24px_50px_rgba(0,0,0,0.85),_0_6px_20px_rgba(198,161,91,0.2)] flex flex-col justify-between p-6 sm:p-8 pl-8 sm:pl-10 overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/50 ${
          isOpening ? 'pointer-events-none' : ''
        }`}
        aria-label="Invitation Book Cover. Tap to open the invitation."
      >
        {/* Realistic Book Spine */}
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-5 bg-gradient-to-r from-[#061410] via-[#0b241e] to-[#123B30] border-r border-[#C6A15B]/40 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.7)] z-20" />
        <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-[1.5px] bg-[#E6C781]/40 z-20" />

        {/* Right Page Thickness */}
        <div className="absolute right-0 top-1.5 bottom-1.5 w-3 sm:w-4 bg-gradient-to-l from-[#C6A15B] via-[#F4EBDD] to-[#8F6B2C] rounded-r-sm shadow-md border-y border-r border-[#C6A15B]/60 z-10" />

        {/* Outer Gold Embossed Border */}
        <div className="absolute inset-3 sm:inset-4 border border-[#C6A15B]/60 rounded-lg pointer-events-none z-10" />
        <div className="absolute inset-4 sm:inset-5 border border-[#E6C781]/30 border-dashed rounded-md pointer-events-none z-10" />

        {/* Ornate Gold Corners */}
        <CornerOrnament position="tl" className="absolute top-4 left-6 w-9 h-9 sm:w-11 sm:h-11" />
        <CornerOrnament position="tr" className="absolute top-4 right-4 w-9 h-9 sm:w-11 sm:h-11" />
        <CornerOrnament position="bl" className="absolute bottom-4 left-6 w-9 h-9 sm:w-11 sm:h-11" />
        <CornerOrnament position="br" className="absolute bottom-4 right-4 w-9 h-9 sm:w-11 sm:h-11" />

        {/* Top: Minimal Sacred Arabic Bismillah */}
        <div className="relative z-20 text-center pt-2 px-3">
          <p className="font-amiri text-lg sm:text-xl text-[#E6C781] font-bold tracking-wide drop-shadow-md">
            {EVENT_CONFIG.bismillah.arabic}
          </p>
        </div>

        {/* Center: Majestic Royal Islamic Seal & Family Showcase */}
        <div className="relative z-20 my-auto text-center px-4 py-1">
          {/* Royal Seal Emblem */}
          <div className="mb-3 flex justify-center">
            <RoyalIslamicEmblem size={74} />
          </div>

          {/* Family Showcase in English */}
          <h2 className="font-serif text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-[#FFE8B5] mb-2">
            {EVENT_CONFIG.family}
          </h2>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#E6C781] to-transparent mx-auto my-2" />

          {/* Cover Tagline in English */}
          <h1 className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-wider gold-text-gradient leading-tight mb-2">
            {EVENT_CONFIG.copy.coverTagline}
          </h1>

          <div className="text-xs font-serif italic text-[#F4EBDD]/80 tracking-wide uppercase">
            {EVENT_CONFIG.occasion}
          </div>
        </div>

        {/* Bottom: "Tap to open" action */}
        <div className="relative z-20 text-center pb-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C6A15B]/60 bg-[#0B211B]/90 text-[#E6C781] group-hover:border-[#E6C781] group-hover:bg-[#123B30] transition-colors shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#E6C781]" />
            <span className="text-[11px] uppercase tracking-widest font-serif font-medium">
              Tap to open
            </span>
          </div>
        </div>

        {/* Subtle Diagonal Gold Foil Light Sweep on hover */}
        <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-[#FFF4D9]/10 to-transparent rotate-12 pointer-events-none group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
    </div>
  );
};
