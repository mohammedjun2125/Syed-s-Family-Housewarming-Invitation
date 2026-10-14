/**
 * Syed's Family Housewarming Invitation Configuration
 * Pure English invitation with minimal, elegant Arabic sacred accents.
 * All Urdu text removed.
 */

import residenceImage from '../assets/images/syeds_blessed_residence_1791927300947.jpg';
import vintageBackground from '../assets/images/vintage_housewarming_bg_1791927961767.jpg';

export interface EventConfig {
  family: string;
  occasion: string;
  subTitle: string;
  date: {
    dayOfWeek: string;
    dayNumber: string;
    month: string;
    year: string;
    formatted: string;
    isoDate: string;
    targetDateIso: string;
  };
  familyMembers: {
    elders: Array<{ name: string; prefix: string; honorific?: string }>;
    hosts: Array<{ name: string }>;
  };
  time: {
    display: string;
    note: string;
    startIso: string;
    endIso: string;
  };
  venue: {
    heading: string;
    message: string;
    mapsUrl: string;
    locationNote: string;
  };
  contact: {
    phoneFormatted: string;
    phoneDigits: string;
    whatsappMessage: string;
  };
  bismillah: {
    arabic: string;
    transliteration: string;
    translationEn: string;
  };
  mashaAllah: {
    arabic: string;
    translationEn: string;
  };
  houseDua: {
    arabic: string;
    translationEn: string;
    reference: string;
  };
  copy: {
    coverTagline: string;
    coverSubtext: string;
    invitationGreeting: string;
    invitationBody: string;
    closingBlessing: string;
    signatureGreeting: string;
    signatureName: string;
  };
  colors: {
    emerald: string;
    forestGreen: string;
    antiqueGold: string;
    champagneGold: string;
    warmParchment: string;
    antiqueBrown: string;
  };
  images: {
    residence: string;
    vintageBackground: string;
  };
}

export const EVENT_CONFIG: EventConfig = {
  family: "Syed's Family",
  occasion: "HOUSEWARMING CEREMONY",
  subTitle: "A New Home, A New Beginning, By the Grace of Allah",
  date: {
    dayOfWeek: "Saturday",
    dayNumber: "17",
    month: "October",
    year: "2026",
    formatted: "Saturday, 17 October 2026",
    isoDate: "2026-10-17",
    targetDateIso: "2026-10-17T18:30:00",
  },
  familyMembers: {
    elders: [
      { name: "SYED AKBAR SAHAB", prefix: "", honorific: "Mr. & Mrs." },
      { name: "SYED KAZAM SAHAB", prefix: "", honorific: "Mr. & Mrs." },
    ],
    hosts: [
      { name: "SYED KHALIL SHEBAZ" },
      { name: "SYED ARIF HAMZA" },
    ],
  },
  time: {
    display: "After Maghrib",
    note: "Gathering commences following the Maghrib prayer",
    startIso: "2026-10-17T18:30:00",
    endIso: "2026-10-17T21:30:00",
  },
  venue: {
    heading: "WE LOOK FORWARD TO WELCOMING YOU",
    message: "Join us as we celebrate the joy of a new home. Your presence and prayers mean a great deal to our family.",
    mapsUrl: "https://maps.app.goo.gl/i272MVEH9G1Uv1eo7?g_st=ic",
    locationNote: "Open location directly on Google Maps for turn-by-turn navigation.",
  },
  contact: {
    phoneFormatted: "+91 72870 93906",
    phoneDigits: "917287093906",
    whatsappMessage:
      "Assalamu Alaikum! Thank you for inviting me to the housewarming ceremony on Saturday, 17 October 2026, after Maghrib. I would like to confirm my presence.",
  },
  bismillah: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    transliteration: "BISMILLAH-IR-RAHMAN-IR-RAHEEM",
    translationEn: "In the name of Allah, the Most Gracious, the Most Merciful",
  },
  mashaAllah: {
    arabic: "مَا شَاءَ ٱللَّٰهُ",
    translationEn: "As Allah wills; all blessings are from Allah",
  },
  houseDua: {
    arabic: "رَبِّ أَنْزِلْنِي مُنْزَلًا مُبَارَكًا وَأَنْتَ خَيْرُ الْمُنْزِلِينَ",
    translationEn: "My Lord, settle me in a blessed settlement, and You are the best of settlers.",
    reference: "Surah Al-Mu'minun : 29",
  },
  copy: {
    coverTagline: "AN INVITATION TO OUR NEW BEGINNING",
    coverSubtext: "With gratitude to Allah, we invite you to share in our happiness.",
    invitationGreeting:
      "With the blessings of Allah, we cordially invite you to celebrate the joy of our new home.",
    invitationBody:
      "We would be honoured by your gracious presence and prayers as we celebrate this special milestone. Please join us and bless our new home with your presence.",
    closingBlessing: "YOUR PRESENCE WILL MAKE OUR CELEBRATION EVEN MORE SPECIAL.",
    signatureGreeting: "With warm regards and duas,",
    signatureName: "THE SYED FAMILY",
  },
  colors: {
    emerald: "#123B30",
    forestGreen: "#0B211B",
    antiqueGold: "#C6A15B",
    champagneGold: "#E6C781",
    warmParchment: "#F4EBDD",
    antiqueBrown: "#33241F",
  },
  images: {
    residence: residenceImage,
    vintageBackground: vintageBackground,
  },
};
