/**
 * Google Calendar API & Multi-format Calendar helper
 * Integrates with Google Calendar API via Firebase Auth (OAuth)
 * and provides 1-click fallback to Web Google Calendar and .ics file download.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { EVENT_CONFIG } from '../config/event';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events';

const provider = new GoogleAuthProvider();
provider.addScope(CALENDAR_SCOPE);

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google access token');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

/**
 * Creates the Housewarming Ceremony event in the user's Google Calendar via API
 */
export async function createGoogleCalendarEvent(token: string): Promise<{ success: boolean; eventLink?: string; error?: string }> {
  try {
    const summary = `${EVENT_CONFIG.family} | ${EVENT_CONFIG.occasion}`;
    const description = `Bismillah-ir-Rahman-ir-Raheem\n\nWith gratitude to Allah, ${EVENT_CONFIG.family} warmly invites you to celebrate our new home.\n\nDate: ${EVENT_CONFIG.date.formatted}\nTime: ${EVENT_CONFIG.time.display} (${EVENT_CONFIG.time.note})\nVenue: ${EVENT_CONFIG.venue.mapsUrl}\nRSVP / Contact: ${EVENT_CONFIG.contact.phoneFormatted}`;

    const event = {
      summary,
      description,
      location: EVENT_CONFIG.venue.mapsUrl,
      start: {
        dateTime: '2026-10-17T18:30:00+05:30', // India Standard Time
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: '2026-10-17T21:30:00+05:30',
        timeZone: 'Asia/Kolkata',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 24 * 60 },
          { method: 'popup', minutes: 180 },
        ],
      },
    };

    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return { success: true, eventLink: data.htmlLink };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Failed to create calendar event:', err);
    return { success: false, error: message };
  }
}

/**
 * Generate direct web link to Google Calendar (no sign-in required, opens user's calendar directly)
 */
export function getWebGoogleCalendarUrl(): string {
  const title = encodeURIComponent(`${EVENT_CONFIG.family} - ${EVENT_CONFIG.occasion}`);
  const details = encodeURIComponent(
    `Bismillah-ir-Rahman-ir-Raheem\n\nWith gratitude to Allah, ${EVENT_CONFIG.family} warmly invites you to celebrate our new home.\n\nDate: ${EVENT_CONFIG.date.formatted}\nTime: ${EVENT_CONFIG.time.display}\nVenue: ${EVENT_CONFIG.venue.mapsUrl}\nRSVP: ${EVENT_CONFIG.contact.phoneFormatted}`
  );
  const location = encodeURIComponent(EVENT_CONFIG.venue.mapsUrl);
  const dates = '20261017T130000Z/20261017T160000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
}

/**
 * Generates and triggers download of an .ics file for Apple Calendar, Outlook, and local calendar apps
 */
export function downloadIcsFile(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Syeds Family//Housewarming Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${EVENT_CONFIG.family} - ${EVENT_CONFIG.occasion}`,
    `DESCRIPTION:Bismillah-ir-Rahman-ir-Raheem\\n\\nWith gratitude to Allah\\, ${EVENT_CONFIG.family} warmly invites you to celebrate our new home.\\nDate: ${EVENT_CONFIG.date.formatted}\\nTime: ${EVENT_CONFIG.time.display}\\nVenue: ${EVENT_CONFIG.venue.mapsUrl}`,
    `LOCATION:${EVENT_CONFIG.venue.mapsUrl}`,
    'DTSTART:20261017T130000Z',
    'DTEND:20261017T160000Z',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Syed\'s Family Housewarming Tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'syeds-family-housewarming.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
