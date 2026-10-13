import React from 'react';

export const HouseIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[340px] sm:max-w-[420px] mx-auto my-6 px-4 ${className}`}>
      {/* Decorative Outer Aura */}
      <div className="absolute inset-0 bg-radial from-[#C6A15B]/15 via-[#123B30]/30 to-transparent blur-xl pointer-events-none" />

      {/* SVG Layered Artwork */}
      <svg
        viewBox="0 0 400 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id="nightSky" x1="200" y1="20" x2="200" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0B211B" />
            <stop offset="100%" stopColor="#123B30" />
          </linearGradient>

          <linearGradient id="archOutline" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="50%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#8F6B2C" />
          </linearGradient>

          <linearGradient id="wallGradient" x1="120" y1="120" x2="280" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAF4EA" />
            <stop offset="100%" stopColor="#E2D4BF" />
          </linearGradient>

          <linearGradient id="warmWindow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="60%" stopColor="#FFD152" />
            <stop offset="100%" stopColor="#E69500" />
          </linearGradient>

          <linearGradient id="pathGradient" x1="200" y1="220" x2="200" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D9C7AC" />
            <stop offset="100%" stopColor="#B39B78" />
          </linearGradient>

          <linearGradient id="doorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F4E40" />
            <stop offset="100%" stopColor="#0D261F" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Traditional Islamic Horseshoe / Moorish Arch Frame */}
        {/* Background inside the arch */}
        <path
          d="M60 285 V150 C60 70, 130 35, 200 35 C270 35, 340 70, 340 150 V285 Z"
          fill="url(#nightSky)"
        />

        {/* Stars in night sky */}
        <circle cx="110" cy="80" r="1.5" fill="#FFEBAA" opacity="0.8" />
        <circle cx="290" cy="75" r="1.5" fill="#FFEBAA" opacity="0.8" />
        <circle cx="160" cy="65" r="1" fill="#FFEBAA" opacity="0.6" />
        <circle cx="240" cy="60" r="1" fill="#FFEBAA" opacity="0.6" />
        <circle cx="130" cy="110" r="1" fill="#FFEBAA" opacity="0.5" />
        <circle cx="270" cy="115" r="1" fill="#FFEBAA" opacity="0.5" />

        {/* Crescent moon in sky above house */}
        <path
          d="M200 48 C192 48 185 54 185 62 C185 70 192 76 200 76 C204 76 207 74 209 72 C205 73 199 71 196 66 C193 61 195 54 199 50 C197 49 198 48 200 48 Z"
          fill="#FFF2D6"
          filter="url(#softGlow)"
        />

        {/* Distant soft trees / landscaping */}
        <ellipse cx="105" cy="220" rx="35" ry="25" fill="#0E2D23" />
        <ellipse cx="295" cy="220" rx="35" ry="25" fill="#0E2D23" />
        <ellipse cx="85" cy="235" rx="28" ry="18" fill="#133C2F" />
        <ellipse cx="315" cy="235" rx="28" ry="18" fill="#133C2F" />

        {/* Elegant Modern House Base Structure */}
        {/* Main Two-Story Villa Body */}
        <rect x="120" y="140" width="160" height="95" rx="3" fill="url(#wallGradient)" stroke="#8F6B2C" strokeWidth="1" />

        {/* Upper Balcony / Parapet */}
        <rect x="114" y="132" width="172" height="10" rx="2" fill="#EADBC6" stroke="#C6A15B" strokeWidth="1" />
        <line x1="116" y1="137" x2="284" y2="137" stroke="#8F6B2C" strokeWidth="0.8" />

        {/* Cantilever / Contemporary Architectural overhang */}
        <rect x="108" y="176" width="184" height="6" fill="#C6A15B" />

        {/* Warm Golden Windows - 2nd Floor */}
        {/* Left window */}
        <rect x="135" y="148" width="32" height="22" rx="2" fill="url(#warmWindow)" stroke="#7A561E" strokeWidth="1" filter="url(#softGlow)" />
        <line x1="151" y1="148" x2="151" y2="170" stroke="#7A561E" strokeWidth="1" />
        <line x1="135" y1="159" x2="167" y2="159" stroke="#7A561E" strokeWidth="1" />

        {/* Right window */}
        <rect x="233" y="148" width="32" height="22" rx="2" fill="url(#warmWindow)" stroke="#7A561E" strokeWidth="1" filter="url(#softGlow)" />
        <line x1="249" y1="148" x2="249" y2="170" stroke="#7A561E" strokeWidth="1" />
        <line x1="233" y1="159" x2="265" y2="159" stroke="#7A561E" strokeWidth="1" />

        {/* Center arched motif on upper floor */}
        <path d="M190 170 V155 Q200 148 210 155 V170 Z" fill="url(#warmWindow)" stroke="#7A561E" strokeWidth="0.8" />

        {/* Ground Floor Windows & Entrance */}
        {/* Large picture window left */}
        <rect x="130" y="190" width="38" height="34" rx="2" fill="url(#warmWindow)" stroke="#7A561E" strokeWidth="1" filter="url(#softGlow)" />
        <line x1="149" y1="190" x2="149" y2="224" stroke="#7A561E" strokeWidth="0.8" />
        <line x1="130" y1="207" x2="168" y2="207" stroke="#7A561E" strokeWidth="0.8" />

        {/* Large picture window right */}
        <rect x="232" y="190" width="38" height="34" rx="2" fill="url(#warmWindow)" stroke="#7A561E" strokeWidth="1" filter="url(#softGlow)" />
        <line x1="251" y1="190" x2="251" y2="224" stroke="#7A561E" strokeWidth="0.8" />
        <line x1="232" y1="207" x2="270" y2="207" stroke="#7A561E" strokeWidth="0.8" />

        {/* Welcoming Grand Entrance with Islamic Horseshoe Arch Frame */}
        <rect x="180" y="184" width="40" height="51" fill="#EADBC6" />
        {/* Entrance Doorway with Arch */}
        <path
          d="M185 235 V200 C185 188 215 188 215 200 V235 Z"
          fill="url(#doorGradient)"
          stroke="#C6A15B"
          strokeWidth="1.2"
        />
        {/* Gold Door Handles & Geometric Pattern */}
        <circle cx="197" cy="214" r="1.5" fill="#E6C781" />
        <circle cx="203" cy="214" r="1.5" fill="#E6C781" />
        <line x1="200" y1="196" x2="200" y2="235" stroke="#C6A15B" strokeWidth="0.8" />

        {/* Entrance Portico Steps */}
        <polygon points="174,235 226,235 230,242 170,242" fill="#D9C7AC" stroke="#A88B57" strokeWidth="0.8" />
        <polygon points="170,242 230,242 236,249 164,249" fill="#C5B191" stroke="#A88B57" strokeWidth="0.8" />

        {/* Welcoming Pathway */}
        <path
          d="M180 249 L140 285 H260 L220 249 Z"
          fill="url(#pathGradient)"
          stroke="#C6A15B"
          strokeWidth="0.8"
        />

        {/* Pathway stepping lights / small lanterns */}
        <circle cx="162" cy="265" r="3.5" fill="#FFEAA5" filter="url(#softGlow)" />
        <circle cx="162" cy="265" r="1.5" fill="#FFF" />
        <circle cx="238" cy="265" r="3.5" fill="#FFEAA5" filter="url(#softGlow)" />
        <circle cx="238" cy="265" r="1.5" fill="#FFF" />

        <circle cx="148" cy="279" r="3.5" fill="#FFEAA5" filter="url(#softGlow)" />
        <circle cx="148" cy="279" r="1.5" fill="#FFF" />
        <circle cx="252" cy="279" r="3.5" fill="#FFEAA5" filter="url(#softGlow)" />
        <circle cx="252" cy="279" r="1.5" fill="#FFF" />

        {/* Garden Planters / Topiary shrubs */}
        <path d="M166 235 Q170 226 174 235 Z" fill="#1B4D3E" stroke="#123B30" />
        <path d="M226 235 Q230 226 234 235 Z" fill="#1B4D3E" stroke="#123B30" />

        {/* Arch Frame Outer Molding */}
        <path
          d="M60 285 V150 C60 70, 130 35, 200 35 C270 35, 340 70, 340 150 V285"
          stroke="url(#archOutline)"
          strokeWidth="3.5"
          fill="none"
        />
        <path
          d="M52 285 V150 C52 64, 126 27, 200 27 C274 27, 348 64, 348 150 V285"
          stroke="url(#archOutline)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          fill="none"
        />

        {/* Arch Apex Finial Ornament */}
        <circle cx="200" cy="27" r="4.5" fill="url(#archOutline)" />
        <circle cx="200" cy="18" r="2" fill="url(#archOutline)" />

        {/* Foreground Grass/Ground Base */}
        <rect x="40" y="284" width="320" height="6" rx="2" fill="#0B211B" stroke="#C6A15B" strokeWidth="1" />
      </svg>
    </div>
  );
};
