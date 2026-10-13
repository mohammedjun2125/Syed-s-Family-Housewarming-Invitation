/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InvitationBook } from './components/InvitationBook';
import { AmbientParticles } from './components/AmbientParticles';
import { AudioToggle } from './components/AudioToggle';

export default function App() {
  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0B211B] text-[#F4EBDD] overflow-x-hidden selection:bg-[#C6A15B]/30 selection:text-[#E6C781]">
      {/* Floating Golden Dust Particles in Background */}
      <AmbientParticles count={16} />

      {/* Discreet Audio Toggle Button (Muted by default) */}
      <AudioToggle />

      {/* Central 3D Interactive Invitation Experience */}
      <InvitationBook />
    </div>
  );
}
