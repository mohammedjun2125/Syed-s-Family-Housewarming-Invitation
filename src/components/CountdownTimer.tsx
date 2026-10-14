import React, { useState, useEffect } from 'react';
import { OrnateDivider } from './IslamicOrnaments';
import { EVENT_CONFIG } from '../config/event';
import { Clock, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

interface CountdownTimerProps {
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ className = '' }) => {
  // Target: 17 October 2026, 18:30 (Commencing after Maghrib)
  const targetDate = new Date(EVENT_CONFIG.date.targetDateIso || '2026-10-17T18:30:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label="Countdown to Housewarming Ceremony"
      className={`w-full max-w-xl mx-auto py-6 px-4 relative z-10 ${className}`}
    >
      <div className="relative rounded-2xl p-5 sm:p-7 bg-gradient-to-b from-[#123B30] via-[#0E2C24] to-[#0B211B] border-2 border-[#C6A15B] shadow-[0_16px_36px_rgba(0,0,0,0.5),_0_0_20px_rgba(198,161,91,0.2)] overflow-hidden">
        {/* Subtle Inner Antique Gold Border */}
        <div className="absolute inset-2 border border-[#C6A15B]/40 rounded-xl pointer-events-none" />
        <div className="absolute inset-3 border border-[#E6C781]/20 border-dashed rounded-lg pointer-events-none" />

        {/* Header with Antique Gold Scheme */}
        <div className="text-center relative z-10 mb-5">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border border-[#C6A15B]/50 bg-[#0B211B]/80 text-[#E6C781] text-[10px] sm:text-xs uppercase tracking-[0.22em] font-serif mb-2">
            <Clock className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>COUNTDOWN TO 17 OCTOBER 2026</span>
            <Sparkles className="w-3 h-3 text-[#C6A15B]" />
          </div>

          <h3 className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#FFF5DF] uppercase drop-shadow-sm">
            Time Remaining Until The Blessed Gathering
          </h3>

          <p className="font-serif italic text-xs sm:text-sm text-[#E6C781]/85 mt-1">
            Saturday, 17 October 2026 • After Maghrib
          </p>

          <OrnateDivider width="w-36 sm:w-48" className="my-3 text-[#C6A15B]" />
        </div>

        {/* 4 Time Digit Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3.5 relative z-10">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative flex flex-col items-center justify-center py-3.5 sm:py-5 px-1 sm:px-2 rounded-xl bg-[#091D17]/90 border border-[#C6A15B]/70 shadow-inner group hover:border-[#E6C781] transition-all"
            >
              {/* Top and Bottom subtle gold accents */}
              <div className="absolute top-1 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/40 to-transparent" />
              <div className="absolute bottom-1 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B]/40 to-transparent" />

              {/* Number with Antique Gold Styling */}
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#E6C781] tracking-wider leading-none drop-shadow-[0_2px_8px_rgba(230,199,129,0.35)] tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>

              {/* Unit Label */}
              <span className="font-serif text-[9px] sm:text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#C6A15B] font-semibold mt-2 opacity-95">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom subtle note */}
        <div className="text-center mt-4 pt-2 relative z-10">
          <p className="font-serif text-[11px] sm:text-xs text-[#E6C781]/70 tracking-wider">
            Insha'Allah, we look forward to having you with us
          </p>
        </div>
      </div>
    </section>
  );
};
