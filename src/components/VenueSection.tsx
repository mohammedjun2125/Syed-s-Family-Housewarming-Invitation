import React from 'react';
import { MapPin, Navigation, ExternalLink, Share2 } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import { OrnateDivider, RoyalIslamicEmblem } from './IslamicOrnaments';
import { RSVPButton } from './RSVPButton';

export const VenueSection: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  const handleOpenMaps = () => {
    window.open(EVENT_CONFIG.venue.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Housewarming Ceremony - 17 October 2026",
          text: `You're warmly invited to the Housewarming Ceremony on Saturday, 17 October 2026, after Maghrib.\nVenue: ${EVENT_CONFIG.venue.mapsUrl}`,
          url: window.location.href,
        });
        return;
      } catch {
        // Share cancelled
      }
    }
    
    try {
      await navigator.clipboard.writeText(
        `Housewarming Ceremony - Saturday, 17 October 2026, after Maghrib.\nVenue: ${EVENT_CONFIG.venue.mapsUrl}\n${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <section className={`w-full max-w-xl mx-auto py-8 px-4 relative z-10`} aria-label="Venue and Location">
      <div className="relative p-6 sm:p-8 rounded-2xl border-2 border-[#C6A15B]/70 bg-gradient-to-b from-[#123B30] via-[#0D2821] to-[#0B211B] shadow-[0_16px_40px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle ambient light glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C6A15B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#123B30]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Header Royal Seal */}
        <div className="flex justify-center mb-3">
          <RoyalIslamicEmblem size={56} />
        </div>

        {/* Headings */}
        <div className="text-center space-y-1 mb-2">
          <h2 className="font-serif text-lg sm:text-xl text-[#FFF5DF] font-bold tracking-wider uppercase">
            {EVENT_CONFIG.venue.heading}
          </h2>
        </div>

        <OrnateDivider width="w-48 sm:w-64" />

        {/* Supporting Message */}
        <div className="my-4 text-center max-w-md mx-auto">
          <p className="font-serif text-sm sm:text-base text-[#F4EBDD]/90 leading-relaxed italic">
            "{EVENT_CONFIG.venue.message}"
          </p>
        </div>

        {/* Location Card with Map Pin */}
        <div className="my-6 p-4 rounded-xl border border-[#C6A15B]/40 bg-[#0B211B]/85 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6C781] font-semibold">
            <MapPin className="w-4 h-4 text-[#C6A15B]" />
            <span>Ceremony Venue</span>
          </div>

          <p className="text-xs text-[#F4EBDD]/80 max-w-sm mx-auto">
            {EVENT_CONFIG.venue.locationNote}
          </p>

          {/* GET DIRECTIONS Button */}
          <div className="pt-2">
            <button
              onClick={handleOpenMaps}
              type="button"
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl border border-[#E6C781] bg-gradient-to-r from-[#C6A15B] to-[#E6C781] text-[#0B211B] font-serif font-bold text-sm tracking-wider uppercase inline-flex items-center justify-center gap-2.5 shadow-[0_4px_18px_rgba(198,161,91,0.35)] hover:brightness-110 active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-[#E6C781]/40"
              aria-label="Get directions to venue via Google Maps"
            >
              <Navigation className="w-4 h-4 text-[#0B211B]" />
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#0B211B]/80" />
            </button>
          </div>
        </div>

        {/* WhatsApp RSVP section */}
        <div className="pt-4 border-t border-[#C6A15B]/30">
          <RSVPButton />
        </div>

        {/* Share Button for guests */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleShare}
            className="text-xs text-[#C6A15B] hover:text-[#E6C781] inline-flex items-center gap-2 py-2 px-3.5 rounded-lg border border-[#C6A15B]/40 hover:border-[#C6A15B] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied to Clipboard!' : 'Share Invitation'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
