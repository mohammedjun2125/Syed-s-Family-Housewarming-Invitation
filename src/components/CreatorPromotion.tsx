import React, { useState } from 'react';
import { Instagram, Sparkles, Heart, ExternalLink, Check, Copy } from 'lucide-react';

interface CreatorPromotionProps {
  className?: string;
}

export const CreatorPromotion: React.FC<CreatorPromotionProps> = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const instagramUrl =
    'https://www.instagram.com/the_digital_invitations?srtk=MWUya2I0bHc5cDVnbQ%3D%3D&utm_source=qr';
  const handle = '@the_digital_invitations';

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      aria-label="Creator Promotion"
      className={`relative z-10 max-w-md mx-auto px-4 ${className}`}
    >
      <div className="relative rounded-2xl overflow-hidden p-5 sm:p-6 bg-gradient-to-br from-[#0F2D24] via-[#123B30] to-[#091B15] border border-[#C6A15B]/70 shadow-[0_12px_36px_rgba(0,0,0,0.6),0_0_24px_rgba(198,161,91,0.22)] transition-all duration-300 hover:shadow-[0_16px_44px_rgba(0,0,0,0.7),0_0_32px_rgba(230,199,129,0.35)] hover:border-[#E6C781] group">
        {/* Subtle decorative gold corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E6C781]/60 rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#E6C781]/60 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#E6C781]/60 rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E6C781]/60 rounded-br-2xl pointer-events-none" />

        {/* Ambient golden glow highlight */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#C6A15B]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#E6C781]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C6A15B]/15 border border-[#C6A15B]/40 text-[#E6C781] text-[10px] sm:text-[11px] font-serif font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-[#E6C781] animate-pulse" />
            <span>Digital Invitation Studio</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-serif text-[#C6A15B]/80 italic">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </span>
        </div>

        {/* Brand identity row */}
        <div className="flex items-center gap-3.5 mb-3">
          {/* Instagram Avatar Icon */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Instagram Profile @the_digital_invitations"
            className="relative flex-shrink-0 w-12 h-12 rounded-xl p-[2px] bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform"
          >
            <div className="w-full h-full rounded-[10px] bg-[#0B211B] flex items-center justify-center">
              <Instagram className="w-6 h-6 text-[#FFF4D9]" />
            </div>
            {/* Tiny notification sparkle dot */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-300 to-yellow-500 rounded-full border border-[#0B211B] shadow-sm animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border border-[#0B211B]" />
          </a>

          {/* Titles & Handle */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFF4D9] tracking-wide truncate flex items-center gap-1.5">
              <span>The Digital Invitations</span>
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-medium text-[#E6C781] hover:underline flex items-center gap-1 truncate"
              >
                <span>{handle}</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy Instagram handle"
                aria-label="Copy Instagram handle"
                className="p-1 rounded hover:bg-[#C6A15B]/20 text-[#C6A15B] hover:text-[#FFF4D9] transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Pitch / Promotional Message */}
        <p className="text-xs sm:text-[13px] text-[#EEDFC6] leading-relaxed mb-4 font-serif">
          Loved this interactive digital experience? Get a custom, handcrafted digital invitation
          for your <strong className="text-[#FFF4D9] font-semibold">Wedding</strong>,{' '}
          <strong className="text-[#FFF4D9] font-semibold">Housewarming</strong>,{' '}
          <strong className="text-[#FFF4D9] font-semibold">Nikah</strong>, or special celebration.
        </p>

        {/* Action Button Row */}
        <div className="flex items-center gap-2.5">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C6A15B] via-[#E6C781] to-[#C6A15B] text-[#0B211B] font-serif font-bold text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(198,161,91,0.35)] hover:shadow-[0_6px_22px_rgba(230,199,129,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Instagram className="w-4 h-4 text-[#0B211B]" />
            <span>Visit on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0B211B]" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2.5 rounded-xl border border-[#C6A15B]/50 bg-[#0B211B]/80 hover:bg-[#0B211B] text-[#E6C781] text-xs font-serif font-medium tracking-wide flex items-center gap-1.5 transition-all active:scale-95"
            title="Copy handle"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-3.5 pt-3 border-t border-[#C6A15B]/20 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] text-[#C6A15B]/85 font-serif">
          <span>✨ Audio & Music</span>
          <span>&bull;</span>
          <span>🗺️ GPS Navigation</span>
          <span>&bull;</span>
          <span>💬 WhatsApp RSVP</span>
          <span>&bull;</span>
          <span>📅 Calendar Sync</span>
        </div>
      </div>
    </section>
  );
};
