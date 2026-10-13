import React from 'react';
import { EVENT_CONFIG } from '../config/event';
import {
  CornerOrnament,
  RoyalIslamicEmblem,
  OrnateDivider,
} from './IslamicOrnaments';
import { TwinklingGoldParticles } from './TwinklingGoldParticles';
import { EventDetails } from './EventDetails';
import { VenueSection } from './VenueSection';
import { BookMarked, ArrowUp } from 'lucide-react';

interface InvitationPageProps {
  onClose: () => void;
}

export const InvitationPage: React.FC<InvitationPageProps> = ({ onClose }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-6 py-6 pb-24 select-text animate-in fade-in duration-700">
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

        {/* Syed's Family Top Showcase Badge */}
        <div className="flex items-center gap-2 bg-[#0B211B]/90 px-4 py-1.5 rounded-full border border-[#C6A15B]/50 shadow-md">
          <span className="text-xs uppercase font-serif tracking-widest text-[#E6C781] font-semibold">
            {EVENT_CONFIG.family}
          </span>
        </div>
      </div>

      {/* Main Vintage Ivory Parchment Manuscript Card */}
      <article
        className="relative parchment-texture rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-[#0B211B] shadow-[0_24px_60px_rgba(0,0,0,0.85),_0_2px_8px_rgba(198,161,91,0.25)] border-2 border-[#C6A15B] overflow-hidden"
        style={{
          boxShadow: '0 24px 60px rgba(0,0,0,0.7), inset 0 0 50px rgba(198,161,91,0.2)',
        }}
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

        {/* Center: Royal Crest of Syed's Family with Minimal Arabic Masha'Allah */}
        <section className="text-center my-3 relative z-10">
          <div className="flex justify-center mb-2">
            <RoyalIslamicEmblem size={80} />
          </div>

          <p className="font-serif italic text-xs text-[#523B19]/80">
            {EVENT_CONFIG.mashaAllah.translationEn}
          </p>
        </section>

        {/* Prominent Host Showcase: Syed's Family */}
        <section className="text-center my-5 px-3 relative z-10">
          <span className="font-serif text-xs uppercase tracking-[0.22em] text-[#7A561E] font-bold block mb-1">
            Formal Invitation From
          </span>
          <div className="inline-block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#123B30] via-[#1a4f41] to-[#123B30] border-2 border-[#C6A15B] shadow-lg text-white my-1">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider gold-text-gradient uppercase my-0.5">
              {EVENT_CONFIG.family}
            </h2>
            <p className="text-xs uppercase tracking-widest text-[#FFF4D9]/80 mt-1 font-serif">
              Warmly Invites You To Celebrate Our New Home
            </p>
          </div>
        </section>

        {/* Opening Warm Greeting in Clear English */}
        <section className="text-center my-4 px-2 sm:px-6 relative z-10">
          <p className="font-serif text-base sm:text-lg text-[#164639] leading-relaxed max-w-lg mx-auto italic font-medium">
            "{EVENT_CONFIG.copy.invitationGreeting}"
          </p>
        </section>

        {/* Strongest Visual Centerpiece: Housewarming Ceremony Title */}
        <section className="text-center my-6 py-6 px-4 rounded-xl bg-[#FAF5EB]/95 border-2 border-[#C6A15B]/60 shadow-inner relative z-10">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#0B211B] mb-1 uppercase leading-tight">
            {EVENT_CONFIG.occasion}
          </h1>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent mx-auto my-2.5" />

          <p className="font-serif text-sm sm:text-base text-[#123B30] tracking-wide font-semibold italic">
            "{EVENT_CONFIG.subTitle}"
          </p>
        </section>

        {/* Invitation Body Paragraph in Clear English */}
        <section className="text-center my-5 px-3 sm:px-8 relative z-10">
          <p className="font-serif text-sm sm:text-base text-[#1E3A32] leading-relaxed max-w-lg mx-auto">
            {EVENT_CONFIG.copy.invitationBody}
          </p>
        </section>

        {/* Blessed Residence Luxury Villa Image Showcase */}
        <section className="my-7 relative z-10">
          <div className="text-center mb-3">
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-[#7A561E] font-bold block">
              Syed's Family Blessed Residence
            </span>
            <OrnateDivider width="w-40 sm:w-56" className="my-2" />
          </div>

          {/* Luxury Villa Image */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#C6A15B] shadow-[0_16px_36px_rgba(0,0,0,0.35)] group">
            <img
              src={EVENT_CONFIG.images.residence}
              alt="Syed's Family Housewarming Residence Illuminated Villa"
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

        {/* Warm Signature: Showcasing Syed's Family */}
        <footer className="text-center mt-6 pt-3 pb-2 relative z-10">
          <p className="font-serif italic text-sm text-[#523B19]">
            {EVENT_CONFIG.copy.signatureGreeting}
          </p>

          <p className="font-serif text-2xl sm:text-3xl font-bold text-[#123B30] tracking-wider mt-1">
            {EVENT_CONFIG.copy.signatureName}
          </p>
        </footer>
      </article>

      {/* Structured Event Details */}
      <EventDetails className="mt-8" />

      {/* Venue Section (Google Maps Directions & WhatsApp RSVP) */}
      <VenueSection className="mt-4" />

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
    </div>
  );
};
