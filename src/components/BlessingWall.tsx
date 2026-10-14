import React, { useState, useEffect } from 'react';
import { OrnateDivider } from './IslamicOrnaments';
import { Heart, Send, Sparkles, Check, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Blessing {
  id: string;
  author: string;
  message: string;
  date: string;
  arabicSnippet?: string;
}

const DEFAULT_BLESSINGS: Blessing[] = [
  {
    id: 'b1',
    author: 'A Well-Wisher',
    message: 'May Allah settle you in a blessed abode, filled with serenity, light, and boundless barakah.',
    date: 'Recent',
    arabicSnippet: 'مُنْزَلًا مُبَارَكًا',
  },
  {
    id: 'b2',
    author: 'Dear Family & Friends',
    message: 'May the warmth of iman and peace always radiate through every corner of this new home.',
    date: 'Recent',
    arabicSnippet: 'بَارَكَ ٱللَّٰهُ لَكُمْ',
  },
];

const PRESET_DUAS = [
  'May Allah bless this home with peace, prosperity, and unending joy.',
  'May this sanctuary always echo with the remembrance of Allah and warm laughter.',
  'Barakallahu lakum! Warmest congratulations on this beautiful new beginning.',
];

export const BlessingWall: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    try {
      const saved = localStorage.getItem('syed_housewarming_blessings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_BLESSINGS;
  });

  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('syed_housewarming_blessings', JSON.stringify(blessings));
    } catch {
      // ignore
    }
  }, [blessings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      author: author.trim() || 'A Dear Guest',
      message: message.trim(),
      date: 'Just now',
      arabicSnippet: 'آمين',
    };

    setBlessings((prev) => [newBlessing, ...prev]);
    setMessage('');
    setAuthor('');
    setSubmitted(true);

    try {
      confetti({
        particleCount: 40,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#E6C781', '#C6A15B', '#FFF4D9', '#123B30'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleSelectPreset = (preset: string) => {
    setMessage(preset);
  };

  return (
    <section
      aria-label="Send Prayers and Duas for the New Home"
      className={`w-full max-w-xl mx-auto py-6 px-4 relative z-10 ${className}`}
    >
      <div className="relative rounded-2xl p-5 sm:p-7 bg-[#FAF5EB] text-[#222] border-2 border-[#C6A15B] shadow-[0_16px_36px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Double border */}
        <div className="absolute inset-2 border border-[#C6A15B]/50 rounded-xl pointer-events-none" />

        {/* Header */}
        <div className="text-center relative z-10 mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border border-[#C6A15B]/50 bg-[#123B30] text-[#E6C781] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-serif mb-2">
            <Heart className="w-3.5 h-3.5 text-[#E6C781]" />
            <span>SEND YOUR DU'AS & BLESSINGS</span>
            <Sparkles className="w-3 h-3 text-[#E6C781]" />
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#0B211B] uppercase">
            Blessings for the New Home
          </h3>

          <p className="font-serif italic text-xs sm:text-sm text-[#523B19] mt-1 max-w-md mx-auto">
            Share your heartfelt prayers and warm wishes for the new residence
          </p>

          <OrnateDivider width="w-32 sm:w-44" className="my-2 text-[#C6A15B]" />
        </div>

        {/* Quick presets */}
        <div className="relative z-10 mb-4">
          <span className="block text-[11px] font-serif uppercase tracking-wider text-[#7A561E] font-semibold mb-2">
            Quick Du'a Suggestions:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_DUAS.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className="text-left text-[11px] sm:text-xs font-serif italic p-2 rounded-lg border border-[#C6A15B]/40 bg-[#FFFDF9] hover:bg-[#FAF1DF] hover:border-[#C6A15B] text-[#123B30] transition-colors"
              >
                "{preset}"
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-3 mb-6">
          <div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name (e.g. Brother Ahmed & Family)"
              maxLength={50}
              className="w-full text-xs sm:text-sm font-serif px-3 py-2.5 rounded-lg border border-[#C6A15B]/60 bg-[#FFFDF9] text-[#123B30] placeholder-[#8F6B2C]/60 focus:outline-none focus:ring-2 focus:ring-[#C6A15B]"
            />
          </div>

          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your du'a or blessing for the new home..."
              rows={2}
              maxLength={200}
              required
              className="w-full text-xs sm:text-sm font-serif px-3 py-2.5 rounded-lg border border-[#C6A15B]/60 bg-[#FFFDF9] text-[#123B30] placeholder-[#8F6B2C]/60 focus:outline-none focus:ring-2 focus:ring-[#C6A15B] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl border border-[#C6A15B] bg-[#123B30] hover:bg-[#1a4f41] text-[#E6C781] hover:text-white font-serif text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Du'a Recorded! Jazakallahu Khair</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Record My Blessing & Du'a</span>
              </>
            )}
          </button>
        </form>

        {/* Display recent du'as */}
        <div className="relative z-10 space-y-2.5 pt-2 border-t border-[#C6A15B]/30">
          <div className="flex items-center justify-between mb-1">
            <span className="font-serif text-[11px] uppercase tracking-wider text-[#7A561E] font-bold">
              Recent Prayers from Well-Wishers
            </span>
            <span className="text-[10px] text-[#8F6B2C] italic">
              {blessings.length} {blessings.length === 1 ? 'Du’a' : 'Du’as'}
            </span>
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-lg bg-[#FFFDF9] border border-[#C6A15B]/40 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-serif text-xs font-bold text-[#123B30]">
                    {b.author}
                  </span>
                  {b.arabicSnippet && (
                    <span className="font-amiri text-xs text-[#8F6B2C] font-semibold">
                      {b.arabicSnippet}
                    </span>
                  )}
                </div>
                <p className="font-serif italic text-xs text-[#33241F] leading-relaxed">
                  "{b.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
