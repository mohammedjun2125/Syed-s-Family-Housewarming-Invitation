import React, { useState } from 'react';
import { EVENT_CONFIG } from '../config/event';
import {
  CornerOrnament,
  RoyalIslamicEmblem,
  OrnateDivider,
} from './IslamicOrnaments';
import { TwinklingGoldParticles } from './TwinklingGoldParticles';
import { CountdownTimer } from './CountdownTimer';
import { EventDetails } from './EventDetails';
import { VenueSection } from './VenueSection';
import { BlessingWall } from './BlessingWall';
import { FloatingActionBar } from './FloatingActionBar';
import { DigitalWaxSeal } from './DigitalWaxSeal';
import { BookMarked, ArrowUp, Share2, Check } from 'lucide-react';

interface InvitationPageProps {
  onClose: () => void;
}

export const InvitationPage: React.FC<InvitationPageProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Housewarming Ceremony - 17 October 2026",
      text: "You are cordially invited to celebrate our new home on Saturday, 17 October 2026, after Maghrib.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-6 pb-28 select-text animate-in fade-in duration-700">
      {/* Top Navigation Bar: Close Invitation / Re-fold Book */}
      <div className="flex items-center justify-between mb-5 sticky top-3 z-30 px-2">
        <button
          onClick={onClose}
          type="button"
          className="min-h-[44px] px-4 py-2 rounded-full border border-[#C6A15B] bg-[#0B211B]/95 backdrop-blur-md text-[#E6C781] hover:text-[#FFF] hover:border-[#E6C781] hover:bg-[#123B30] text-xs uppercase tracking-wider font-medium flex items-center gap-2 shadow-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
          aria-label="Close invitation and return to book cover"
        >
          <BookMarked className="w-4 h-4 text-[#C6A15B]" />
          <span>CLOSE INVITATION</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Share Button in Header */}
          <button
            onClick={handleShare}
            type="button"
            className="min-h-[44px] px-3.5 py-2 rounded-full border border-[#C6A15B]/60 bg-[#0B211B]/95 backdrop-blur-md text-[#E6C781] hover:text-[#FFF] hover:border-[#E6C781] hover:bg-[#123B30] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            title="Share Invitation Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span className="hidden sm:inline text-[11px]">COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span className="hidden sm:inline text-[11px]">SHARE</span>
              </>
            )}
          </button>

          {/* Top Showcase Badge */}
          <div className="hidden sm:flex items-center gap-2 bg-[#0B211B]/90 px-4 py-1.5 rounded-full border border-[#C6A15B]/50 shadow-md">
            <span className="text-xs uppercase font-serif tracking-widest text-[#E6C781] font-semibold">
              HOUSEWARMING CEREMONY
            </span>
          </div>
        </div>
      </div>

      {/* Main Vintage Ivory Parchment Manuscript Card */}
      <article
        aria-label="Housewarming Formal Invitation Letter"
        className="relative bg-[#FAF5EB] text-[#222] rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.65),_0_2px_8px_rgba(198,161,91,0.25)] border-2 border-[#C6A15B] overflow-hidden"
      >
        {/* Live Shining / Twinkling Golden Dots on Parchment */}
        <TwinklingGoldParticles count={22} />

        {/* Soft Parchment Edge Folds */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#D9C7AC]/70 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[#D9C7AC]/70 to-transparent pointer-events-none" />

        {/* Double Gold Ornamental Vintage Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#C6A15B]/50 rounded-xl pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-[#C6A15B]/30 border-dashed rounded-lg pointer-events-none" />

        {/* Symmetrical Arabesque Corners placed safely */}
        <CornerOrnament position="tl" className="absolute top-4 left-4 w-10 h-10 sm:w-14 sm:h-14" />
        <CornerOrnament position="tr" className="absolute top-4 right-4 w-10 h-10 sm:w-14 sm:h-14" />
        <CornerOrnament position="bl" className="absolute bottom-4 left-4 w-10 h-10 sm:w-14 sm:h-14" />
        <CornerOrnament position="br" className="absolute bottom-4 right-4 w-10 h-10 sm:w-14 sm:h-14" />

        {/* Top: Minimal Sacred Arabic Bismillah */}
        <header className="text-center pt-3 sm:pt-6 pb-2 px-2 relative z-10">
          <p className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#123B30] font-bold tracking-wide leading-relaxed">
            {EVENT_CONFIG.bismillah.arabic}
          </p>

          <p className="font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#7A561E] uppercase font-semibold mt-1">
            {EVENT_CONFIG.bismillah.transliteration}
          </p>

          <p className="text-[10px] sm:text-xs text-[#523B19] font-serif tracking-wider uppercase opacity-80 mt-0.5">
            {EVENT_CONFIG.bismillah.translationEn}
          </p>

          <OrnateDivider width="w-48 sm:w-64" className="my-3 text-[#8F6B2C]" />
        </header>

        {/* Quranic Du'a for a Blessed Home (Surah Al-Mu'minun: 29) */}
        <section className="my-4 p-4 sm:p-5 rounded-2xl bg-[#FAF5EB]/90 border border-[#C6A15B]/40 text-center relative z-10 shadow-sm space-y-1.5">
          <p className="font-amiri text-lg sm:text-xl md:text-2xl text-[#123B30] font-bold leading-relaxed">
            {EVENT_CONFIG.houseDua.arabic}
          </p>

          <p className="font-serif italic text-xs sm:text-sm text-[#523B19] mt-1">
            "{EVENT_CONFIG.houseDua.translationEn}"
          </p>
          <span className="text-[10px] uppercase font-serif tracking-widest text-[#8F6B2C] font-semibold block">
            {EVENT_CONFIG.houseDua.reference}
          </span>
        </section>

        {/* Center: Royal Crest Emblem with Minimal Arabic Masha'Allah */}
        <section className="text-center my-3 relative z-10">
          <div className="flex justify-center mb-2">
            <RoyalIslamicEmblem size={80} />
          </div>

          <p className="font-serif italic text-xs text-[#523B19]/80">
            {EVENT_CONFIG.mashaAllah.translationEn}
          </p>
        </section>

        {/* Strongest Visual Centerpiece: Housewarming Ceremony Title */}
        <section className="text-center my-6 py-6 px-4 rounded-xl bg-[#FAF5EB]/95 border-2 border-[#C6A15B]/60 shadow-inner relative z-10">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-[#0B211B] mb-1 uppercase leading-tight">
            {EVENT_CONFIG.occasion}
          </h1>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent mx-auto my-2.5" />

          <p className="font-serif text-sm sm:text-base text-[#123B30] tracking-wide font-semibold italic">
            "{EVENT_CONFIG.subTitle}"
          </p>
        </section>

        {/* 1. Main Invitation Greeting */}
        <section className="text-center my-5 px-2 sm:px-6 relative z-10">
          <p className="font-serif text-base sm:text-xl md:text-2xl text-[#123B30] leading-relaxed max-w-xl mx-auto italic font-medium">
            "{EVENT_CONFIG.copy.invitationGreeting}"
          </p>
        </section>

        {/* Display the family names prominently beneath this message in a Refined Ornamental Frame */}
        <section
          aria-label="Family Names"
          className="my-6 sm:my-8 relative z-10"
        >
          <div className="relative rounded-2xl p-5 sm:p-7 md:p-8 bg-gradient-to-b from-[#FFFDF8] via-[#FAF3E2] to-[#FFFDF8] border-2 border-[#C6A15B] shadow-[0_12px_32px_rgba(18,59,48,0.14),_inset_0_0_20px_rgba(198,161,91,0.18)] text-center overflow-hidden">
            {/* Double Antique Gold Ornamental Inner Frame */}
            <div className="absolute inset-2 sm:inset-3 border border-[#C6A15B]/55 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-[#C6A15B]/30 border-dashed rounded-lg pointer-events-none" />

            {/* Antique Gold Arabesque Filigree Corner Accents */}
            <div className="absolute top-3 left-3 text-[#C6A15B] text-lg select-none pointer-events-none leading-none opacity-80">
              ❖
            </div>
            <div className="absolute top-3 right-3 text-[#C6A15B] text-lg select-none pointer-events-none leading-none opacity-80">
              ❖
            </div>
            <div className="absolute bottom-3 left-3 text-[#C6A15B] text-lg select-none pointer-events-none leading-none opacity-80">
              ❖
            </div>
            <div className="absolute bottom-3 right-3 text-[#C6A15B] text-lg select-none pointer-events-none leading-none opacity-80">
              ❖
            </div>

            {/* Respectful Reverence Header for Late Elders */}
            <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
              <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#C6A15B]" />
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.24em] text-[#8F6B2C] font-semibold">
                In Revered Remembrance &amp; Duas
              </span>
              <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#C6A15B]" />
            </div>

            {/* Late Elders Names: Large, bold, clearly highlighted with word 'LATE' preserved & small cute aesthetic 'Mr. & Mrs.' */}
            <div className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6 relative z-10">
              {/* LATE MR. & MRS. SYED AKBAR SAHAB */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 px-2">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full border border-[#C6A15B]/60 bg-[#FAF1DD] text-[#8F6B2C] font-serif text-[11px] sm:text-xs font-bold tracking-[0.2em] shadow-sm uppercase">
                    LATE
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-[#C6A15B]/35 bg-[#FFFDF8] text-[#7A561E] font-serif text-[11px] sm:text-xs tracking-wider italic font-semibold shadow-xs">
                    Mr. &amp; Mrs.
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-[#123B30] uppercase">
                  SYED AKBAR SAHAB
                </h3>
              </div>

              {/* Decorative gold divider between the two elders */}
              <div className="flex items-center justify-center gap-2 my-1.5 text-[#C6A15B]/60">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/40 to-transparent" />
                <span className="text-[10px]">✦</span>
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/40 to-transparent" />
              </div>

              {/* LATE MR. & MRS. SYED KAZAM SAHAB */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2.5 px-2">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full border border-[#C6A15B]/60 bg-[#FAF1DD] text-[#8F6B2C] font-serif text-[11px] sm:text-xs font-bold tracking-[0.2em] shadow-sm uppercase">
                    LATE
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md border border-[#C6A15B]/35 bg-[#FFFDF8] text-[#7A561E] font-serif text-[11px] sm:text-xs tracking-wider italic font-semibold shadow-xs">
                    Mr. &amp; Mrs.
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-[#123B30] uppercase">
                  SYED KAZAM SAHAB
                </h3>
              </div>
            </div>

            {/* Refined Decorative Gold Divider Between Elders & Hosts */}
            <div className="my-6 flex items-center justify-center gap-3 relative z-10">
              <span className="h-[1.5px] flex-1 max-w-[90px] sm:max-w-[140px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent" />
              <div className="flex items-center gap-2 text-[#C6A15B]">
                <span className="text-xs">✦</span>
                <span className="w-2.5 h-2.5 rotate-45 border border-[#C6A15B] bg-[#123B30]" />
                <span className="text-xs">✦</span>
              </div>
              <span className="h-[1.5px] flex-1 max-w-[90px] sm:max-w-[140px] bg-gradient-to-l from-transparent via-[#C6A15B] to-transparent" />
            </div>

            {/* Hosts Section: Especially Prominent while maintaining equal respect */}
            <div className="space-y-3.5 sm:space-y-4 relative z-10">
              <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.24em] text-[#7A561E] font-bold block mb-1">
                Warmly Invited By
              </span>

              {/* SYED KHALIL SHEBAZ */}
              <div className="relative py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#123B30]/5 via-[#123B30]/10 to-[#123B30]/5 border border-[#C6A15B]/40 shadow-sm">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-[#0B211B] uppercase leading-tight">
                  SYED KHALIL SHEBAZ
                </h2>
              </div>

              {/* SYED ARIF HAMZA */}
              <div className="relative py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#123B30]/5 via-[#123B30]/10 to-[#123B30]/5 border border-[#C6A15B]/40 shadow-sm">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-[#0B211B] uppercase leading-tight">
                  SYED ARIF HAMZA
                </h2>
              </div>
            </div>

            {/* Bottom Subtle Antique Gold Accent */}
            <div className="w-36 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent mx-auto mt-6" />
          </div>
        </section>

        {/* Invitation Body Paragraph in Clear English */}
        <section className="text-center my-6 px-3 sm:px-8 relative z-10">
          <p className="font-serif text-sm sm:text-base text-[#1E3A32] leading-relaxed max-w-lg mx-auto">
            {EVENT_CONFIG.copy.invitationBody}
          </p>
        </section>

        {/* Blessed Residence Luxury Villa Image Showcase */}
        <section className="my-7 relative z-10">
          <div className="text-center mb-3">
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#7A561E] font-bold block">
              Our Blessed Residence
            </span>
            <OrnateDivider width="w-40 sm:w-56" className="my-2" />
          </div>

          {/* Luxury Villa Image */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B] shadow-[0_16px_36px_rgba(0,0,0,0.35)] group">
            <img
              src={EVENT_CONFIG.images.residence}
              alt="Housewarming Residence Illuminated Villa"
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Caption Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B211B]/95 via-[#0B211B]/60 to-transparent p-4 sm:p-5 text-center text-white">
              <p className="font-serif text-xs sm:text-sm text-[#E6C781] tracking-wider uppercase font-semibold">
                May Allah bless this home with peace, joy & prosperity
              </p>
            </div>
          </div>
        </section>

        {/* Closing Highlighted Blessing in English */}
        <section className="text-center my-6 py-4 px-4 rounded-xl bg-[#EEDFC6]/65 border-y-2 border-[#C6A15B]/50 relative z-10 space-y-1.5">
          <p className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#0B211B] uppercase leading-relaxed">
            "{EVENT_CONFIG.copy.closingBlessing}"
          </p>
        </section>

        {/* 2. Closing Signature: “With warm regards and duas, THE SYED FAMILY” */}
        <footer className="text-center mt-8 pt-5 pb-3 relative z-10 border-t border-[#C6A15B]/30 max-w-md mx-auto">
          <p className="font-serif italic text-base sm:text-lg text-[#523B19] tracking-wide">
            {EVENT_CONFIG.copy.signatureGreeting}
          </p>

          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent mx-auto my-2.5" />

          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#123B30] tracking-[0.18em] uppercase mt-1 drop-shadow-sm">
            {EVENT_CONFIG.copy.signatureName}
          </p>
        </footer>

        {/* Interactive Digital Wax Seal: reveals heartfelt 'Thank You' message with flourish animation */}
        <div className="relative z-10 pt-3 pb-2 border-t border-[#C6A15B]/20 max-w-md mx-auto">
          <DigitalWaxSeal />
        </div>
      </article>

      {/* Countdown Timer to 17 October 2026 with Antique Gold Styling */}
      <CountdownTimer className="mt-8" />

      {/* Structured Event Details */}
      <EventDetails className="mt-4" />

      {/* Venue Section (Google Maps Directions & WhatsApp RSVP) */}
      <VenueSection className="mt-4" />

      {/* Interactive Blessing & Du'a Wall for the New Home */}
      <BlessingWall className="mt-4" />

      {/* Bottom Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pb-10 text-center">
        <button
          onClick={onClose}
          type="button"
          className="min-h-[48px] px-8 py-3 rounded-full border border-[#C6A15B] bg-[#123B30] hover:bg-[#1a4f41] text-[#E6C781] hover:text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
        >
          <BookMarked className="w-4 h-4 text-[#C6A15B]" />
          <span>CLOSE INVITATION BOOK</span>
        </button>

        <button
          onClick={scrollToTop}
          type="button"
          className="min-h-[48px] px-5 py-3 rounded-full border border-[#C6A15B]/40 bg-[#0B211B] text-[#C6A15B] hover:text-[#FFF] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
        >
          <ArrowUp className="w-4 h-4 text-[#C6A15B]" />
          <span>Back to Top</span>
        </button>
      </div>

      {/* Discreet Floating Action Bar for Mobile & Desktop Navigation */}
      <FloatingActionBar />
    </div>
  );
};
