import React, { useState } from 'react';
import { Calendar, Check, ExternalLink, Download, Loader2 } from 'lucide-react';
import {
  googleSignIn,
  createGoogleCalendarEvent,
  getWebGoogleCalendarUrl,
  downloadIcsFile,
} from '../services/calendarService';
import { EVENT_CONFIG } from '../config/event';

export const CalendarButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleCalendarApi = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const authResult = await googleSignIn();
      if (!authResult?.accessToken) {
        throw new Error('Could not access Google account');
      }

      const res = await createGoogleCalendarEvent(authResult.accessToken);
      if (res.success) {
        setSuccessMsg('Event added to your Google Calendar!');
        setTimeout(() => setIsOpen(false), 2800);
      } else {
        throw new Error(res.error || 'Failed to add event');
      }
    } catch (err: unknown) {
      console.warn('Google Calendar API notice:', err);
      setErrorMsg('Direct sync unavailable in current browser. Use Google Calendar Web link below.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebGoogleCalendar = () => {
    const url = getWebGoogleCalendarUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
    setSuccessMsg('Opening Google Calendar in new tab...');
    setTimeout(() => setIsOpen(false), 2000);
  };

  const handleDownloadIcs = () => {
    downloadIcsFile();
    setSuccessMsg('Calendar invitation downloaded (.ics)!');
    setTimeout(() => setIsOpen(false), 2000);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Primary Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl border border-[#C6A15B] bg-[#123B30] text-[#FFF5DF] font-medium tracking-wider text-xs sm:text-sm uppercase flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(11,33,27,0.4)] hover:bg-[#1a4f41] hover:border-[#E6C781] hover:shadow-[0_0_20px_rgba(230,199,129,0.3)] active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-[#E6C781]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Calendar className="w-4 h-4 text-[#E6C781]" />
        <span>ADD TO CALENDAR</span>
      </button>

      {/* Popover / Options Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-1/2 -translate-x-1/2 bottom-full sm:bottom-auto sm:top-full sm:left-0 sm:translate-x-0 mb-3 sm:mb-0 sm:mt-2 w-[310px] sm:w-[350px] z-40 bg-[#0B211B] border-2 border-[#C6A15B] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.9)] p-4 text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#C6A15B]/30 mb-3">
              <div>
                <span className="text-xs uppercase font-serif tracking-widest text-[#E6C781] font-semibold block">
                  Save Date & Time
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#C6A15B] hover:text-white text-sm px-2 py-1 min-h-[32px]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#F4EBDD]/90 mb-3">
              {EVENT_CONFIG.date.formatted} &bull; {EVENT_CONFIG.time.display}
            </p>

            {/* Notification messages */}
            {successMsg && (
              <div className="mb-3 p-2.5 rounded-lg bg-[#123B30] border border-[#E6C781] text-[#FFF4D9] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E6C781] shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-3 p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Calendar Options */}
            <div className="space-y-2">
              {/* Option 1: 1-Click Direct Google Calendar Sync */}
              <button
                type="button"
                onClick={handleGoogleCalendarApi}
                disabled={isLoading}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#C6A15B]/60 bg-[#123B30]/80 hover:bg-[#123B30] hover:border-[#E6C781] text-left text-xs text-[#FFF4D9] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-[#E6C781] animate-spin shrink-0" />
                  ) : (
                    <Calendar className="w-4 h-4 text-[#E6C781] shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-white">Sync with Google Calendar</div>
                    <div className="text-[10px] text-[#C6A15B]">1-Click Account Sync</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#E6C781] group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </button>

              {/* Option 2: Open Google Calendar in browser */}
              <button
                type="button"
                onClick={handleWebGoogleCalendar}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#C6A15B]/40 bg-[#0E2821] hover:bg-[#123B30] hover:border-[#E6C781] text-left text-xs text-[#FFF4D9] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <div>
                    <div className="font-medium">Google Calendar Web</div>
                    <div className="text-[10px] text-[#F4EBDD]/60">Opens directly in browser</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#C6A15B] group-hover:translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </button>

              {/* Option 3: Download .ics for Apple / Outlook / Mobile */}
              <button
                type="button"
                onClick={handleDownloadIcs}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-[#C6A15B]/40 bg-[#0E2821] hover:bg-[#123B30] hover:border-[#E6C781] text-left text-xs text-[#FFF4D9] flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-[#C6A15B] shrink-0" />
                  <div>
                    <div className="font-medium">Apple / Outlook / iCal</div>
                    <div className="text-[10px] text-[#F4EBDD]/60">Download standard .ics file</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#C6A15B] group-hover:translate-x-0.5 transition-transform">
                  &darr;
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
