import React from 'react';
import { MessageCircle } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

export const RSVPButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const handleSendRSVP = () => {
    const url = `https://wa.me/${EVENT_CONFIG.contact.phoneDigits}?text=${encodeURIComponent(
      EVENT_CONFIG.contact.whatsappMessage
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Primary WhatsApp RSVP Button */}
      <button
        onClick={handleSendRSVP}
        type="button"
        className="w-full min-h-[52px] px-6 py-3.5 rounded-xl border-2 border-[#C6A15B] bg-gradient-to-r from-[#123B30] via-[#164b3d] to-[#123B30] text-[#FFF4D9] font-serif font-semibold tracking-wider text-sm sm:text-base uppercase flex items-center justify-center gap-3 shadow-[0_8px_24px_rgba(11,33,27,0.6)] hover:border-[#E6C781] hover:shadow-[0_0_28px_rgba(230,199,129,0.35)] active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/40 group"
        aria-label="Confirm presence via WhatsApp"
      >
        <div className="p-1.5 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/60 text-[#E6C781] group-hover:scale-110 transition-transform">
          <MessageCircle className="w-5 h-5 text-[#E6C781]" />
        </div>
        <span>CONFIRM YOUR PRESENCE</span>
      </button>
    </div>
  );
};
