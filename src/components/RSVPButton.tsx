import React, { useState } from 'react';
import { MessageCircle, Check, UserPlus } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

export const RSVPButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [guestName, setGuestName] = useState('');
  const [attendeeCount, setAttendeeCount] = useState('1');
  const [showCustomizer, setShowCustomizer] = useState(false);

  const getWhatsAppUrl = () => {
    let message = EVENT_CONFIG.contact.whatsappMessage;
    if (guestName.trim()) {
      message = `Assalamu Alaikum! This is ${guestName.trim()}. Thank you for inviting me to Syed's Family housewarming ceremony on Saturday, 17 October 2026, after Maghrib. I would like to confirm our presence (${attendeeCount} ${attendeeCount === '1' ? 'guest' : 'guests'}).`;
    }
    return `https://wa.me/${EVENT_CONFIG.contact.phoneDigits}?text=${encodeURIComponent(message)}`;
  };

  const handleSendRSVP = () => {
    const url = getWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* Primary WhatsApp RSVP Button */}
      <div className="space-y-3">
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

        {/* Optional Customizer Toggle for Guest Name & Count */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowCustomizer(!showCustomizer)}
            className="text-xs text-[#C6A15B] hover:text-[#E6C781] inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{showCustomizer ? 'Hide guest details' : 'Add your name / guest count (optional)'}</span>
          </button>
        </div>

        {/* Guest Details Drawer */}
        {showCustomizer && (
          <div className="p-4 rounded-xl border border-[#C6A15B]/40 bg-[#0B211B]/95 text-left text-xs space-y-3 animate-in fade-in duration-200">
            <div>
              <label className="block text-[#E6C781] font-medium mb-1 tracking-wide">
                Your Name:
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 rounded-lg bg-[#123B30]/60 border border-[#C6A15B]/50 text-[#FFF] placeholder-[#C6A15B]/50 focus:outline-none focus:border-[#E6C781] focus:ring-1 focus:ring-[#E6C781] text-xs"
              />
            </div>

            <div>
              <label className="block text-[#E6C781] font-medium mb-1 tracking-wide">
                Number of Guests attending:
              </label>
              <select
                value={attendeeCount}
                onChange={(e) => setAttendeeCount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#123B30] border border-[#C6A15B]/50 text-[#FFF] focus:outline-none focus:border-[#E6C781] text-xs"
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons</option>
                <option value="5+">5+ Family Members</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleSendRSVP}
              className="w-full py-2.5 rounded-lg bg-[#C6A15B] hover:bg-[#E6C781] text-[#0B211B] font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Send RSVP via WhatsApp</span>
            </button>
          </div>
        )}

        <p className="text-center text-[11px] text-[#C6A15B]/80 tracking-wide">
          WhatsApp: {EVENT_CONFIG.contact.phoneFormatted}
        </p>
      </div>
    </div>
  );
};
