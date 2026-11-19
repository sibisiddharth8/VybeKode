import React from 'react';
import tcsLogo from '../assets/Tata_Consultancy_Services_Logo.svg';
import vybekodeLogo from '../assets/VybeKode Logo.png';
import { Volume2Icon, VolumeXIcon } from './Icons';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="w-full border-b border-emerald-900/10 bg-white/85 backdrop-blur-md sticky top-0 z-40 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">

        {/* Left: Official TCS Logo & VybeKode Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* TCS Official SVG Logo */}
          <div className="flex items-center pr-3 sm:pr-5 border-r border-gray-200">
            <img
              src={tcsLogo}
              alt="Tata Consultancy Services"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </div>

          {/* VybeKode Logo */}
          <div className="flex items-center gap-2.5">
            <img
              src={vybekodeLogo}
              alt="VybeKode"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            {/* <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
              Live Reveal
            </span> */}
          </div>
        </div>

        {/* Right: Sound Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Sound Enabled (Click to Mute)' : 'Sound Muted (Click to Unmute)'}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${soundEnabled
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 shadow-xs'
                : 'bg-gray-100 border-gray-300 text-gray-400 hover:bg-gray-200'
              }`}
          >
            {soundEnabled ? <Volume2Icon className="w-4 h-4" /> : <VolumeXIcon className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </header>
  );
};
