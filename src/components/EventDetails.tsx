import React from 'react';
import { Calendar as CalendarIcon, Clock, Home } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import { OrnateDivider } from './IslamicOrnaments';


export const EventDetails: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <section className={`w-full max-w-xl mx-auto py-8 px-4 relative z-10`} aria-label="Event Details">
      <div className="text-center mb-6">
        <h2 className="font-serif text-xl sm:text-2xl text-[#C6A15B] uppercase tracking-[0.2em] font-semibold">
          Event Details
        </h2>
        <OrnateDivider width="w-40 sm:w-56" />
      </div>

      {/* 3 Detail Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Date Card */}
        <div className="relative p-5 rounded-xl border border-[#C6A15B]/50 bg-[#123B30]/60 backdrop-blur-md text-center flex flex-col items-center justify-center shadow-lg group hover:border-[#E6C781] transition-colors">
          <div className="w-10 h-10 rounded-full border border-[#C6A15B]/70 bg-[#0B211B] flex items-center justify-center mb-3 text-[#E6C781]">
            <CalendarIcon className="w-5 h-5 text-[#E6C781]" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">
            DATE
          </span>
          <div className="font-serif text-lg sm:text-xl font-bold text-[#FFF5DF]">
            {EVENT_CONFIG.date.dayOfWeek}
          </div>
          <div className="font-serif text-sm sm:text-base text-[#E6C781] mt-0.5">
            {EVENT_CONFIG.date.dayNumber} {EVENT_CONFIG.date.month} {EVENT_CONFIG.date.year}
          </div>
        </div>

        {/* Time Card */}
        <div className="relative p-5 rounded-xl border border-[#C6A15B]/50 bg-[#123B30]/60 backdrop-blur-md text-center flex flex-col items-center justify-center shadow-lg group hover:border-[#E6C781] transition-colors">
          <div className="w-10 h-10 rounded-full border border-[#C6A15B]/70 bg-[#0B211B] flex items-center justify-center mb-3 text-[#E6C781]">
            <Clock className="w-5 h-5 text-[#E6C781]" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">
            TIME
          </span>
          <div className="font-serif text-lg sm:text-xl font-bold text-[#FFF5DF]">
            {EVENT_CONFIG.time.display}
          </div>
          <div className="text-[11px] text-[#E6C781]/80 mt-1 italic">
            {EVENT_CONFIG.time.note}
          </div>
        </div>

        {/* Occasion Card */}
        <div className="relative p-5 rounded-xl border border-[#C6A15B]/50 bg-[#123B30]/60 backdrop-blur-md text-center flex flex-col items-center justify-center shadow-lg group hover:border-[#E6C781] transition-colors">
          <div className="w-10 h-10 rounded-full border border-[#C6A15B]/70 bg-[#0B211B] flex items-center justify-center mb-3 text-[#E6C781]">
            <Home className="w-5 h-5 text-[#E6C781]" />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#C6A15B] font-semibold mb-1">
            OCCASION
          </span>
          <div className="font-serif text-sm sm:text-base font-bold text-[#FFF5DF] uppercase">
            {EVENT_CONFIG.occasion}
          </div>
          <div className="text-xs text-[#E6C781]/90 mt-1 font-serif">
            A Blessed New Beginning
          </div>
        </div>
      </div>
    </section>
  );
};
