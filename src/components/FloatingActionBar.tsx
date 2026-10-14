import React, { useState, useEffect } from 'react';
import { MapPin, MessageCircle, Calendar, Share2, ArrowUp, Check } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import { getWebGoogleCalendarUrl } from '../services/calendarService';

export const FloatingActionBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down 280px
      if (window.scrollY > 280) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        // Fallback to copy
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

  const handleRsvp = () => {
    const url = `https://wa.me/${EVENT_CONFIG.contact.phoneDigits}?text=${encodeURIComponent(
      EVENT_CONFIG.contact.whatsappMessage
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleMaps = () => {
    window.open(EVENT_CONFIG.venue.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCalendar = () => {
    const url = getWebGoogleCalendarUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <nav
      aria-label="Quick Actions Navigation Bar"
      className="fixed bottom-3 inset-x-0 z-40 px-3 max-w-lg mx-auto select-none animate-in fade-in slide-in-from-bottom-3 duration-300 pointer-events-none"
    >
      <div className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-[#0B211B]/95 backdrop-blur-md border border-[#C6A15B] shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center justify-between gap-1 text-[#E6C781]">
        {/* RSVP WhatsApp */}
        <button
          onClick={handleRsvp}
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white text-[11px] font-serif font-semibold tracking-wider transition-all active:scale-95 shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
          <span>RSVP</span>
        </button>

        {/* Directions Google Maps */}
        <button
          onClick={handleMaps}
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-full bg-[#123B30] hover:bg-[#1a4f41] border border-[#C6A15B]/50 text-[#E6C781] hover:text-white text-[11px] font-serif font-medium tracking-wider transition-all active:scale-95"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Directions</span>
        </button>

        {/* Calendar */}
        <button
          onClick={handleCalendar}
          type="button"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-full bg-[#123B30] hover:bg-[#1a4f41] border border-[#C6A15B]/50 text-[#E6C781] hover:text-white text-[11px] font-serif font-medium tracking-wider transition-all active:scale-95"
          title="Add to Google Calendar"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Calendar</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          type="button"
          className="p-2 rounded-full bg-[#123B30] hover:bg-[#1a4f41] border border-[#C6A15B]/50 text-[#E6C781] hover:text-white transition-all active:scale-95"
          title="Share Invitation Link"
          aria-label="Share Invitation"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-300" />
          ) : (
            <Share2 className="w-3.5 h-3.5 text-[#C6A15B]" />
          )}
        </button>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          type="button"
          className="p-2 rounded-full bg-[#0B211B] hover:bg-[#123B30] border border-[#C6A15B]/40 text-[#C6A15B] hover:text-[#FFF] transition-all active:scale-95"
          title="Scroll to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {copied && (
        <div className="text-center mt-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#0B211B] border border-[#C6A15B] text-[10px] font-serif text-[#E6C781] shadow-lg">
            ✨ Invitation link copied to clipboard!
          </span>
        </div>
      )}
    </nav>
  );
};
