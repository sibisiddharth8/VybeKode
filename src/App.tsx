import { useState, useEffect } from 'react';
import usecasesData from './data/usecases.json';
import type { Usecase } from './types/usecase';
import { Header } from './components/Header';
import { RevealStation } from './components/RevealStation';
import { GuidelinesModal } from './components/GuidelinesModal';
import { FileTextIcon } from './components/Icons';
import { sound } from './utils/audio';

function App() {
  const [usecases] = useState<Usecase[]>(usecasesData as Usecase[]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);

  // Sync sound engine enabled state
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) {
      sound.playBeep(600);
    }
  };

  const handleOpenGuidelines = () => {
    sound.playClick();
    setIsGuidelinesOpen(true);
  };

  return (
    <div className="h-dvh max-h-dvh flex flex-col bg-[#f8faf8] text-gray-900 overflow-hidden relative select-text">
      
      {/* Background Grids & Corner Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 watercolor-glow-tl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 watercolor-glow-br" />
        <div className="absolute inset-0 poster-grid-bg opacity-70" />
      </div>

      {/* Header with official TCS & VybeKode logos */}
      <div className="shrink-0 z-40">
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />
      </div>

      {/* Main Container - Strict Single Screen Height Constraint */}
      <main className="relative z-10 flex-1 min-h-0 w-full max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center overflow-hidden">
        <RevealStation usecases={usecases} />
      </main>

      {/* Fixed Docked Footer with Guidelines Action */}
      <footer className="shrink-0 z-30 border-t border-emerald-900/15 bg-white/95 backdrop-blur-md py-2 text-xs font-semibold text-gray-600 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Event & Company */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-extrabold text-gray-950">VybeKode 2026</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-700 font-bold hidden sm:inline">Tata Consultancy Services</span>
          </div>

          {/* Center: Guidelines Button */}
          <button
            onClick={handleOpenGuidelines}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-xl border-2 border-gray-900 shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <FileTextIcon className="w-3.5 h-3.5 text-emerald-700" />
            <span>Event Guidelines</span>
          </button>

          {/* Right: Venue & Time */}
          <div className="text-[11px] text-gray-500 font-medium text-right">
            <span className="hidden md:inline">Magnum SCB ODC, 11th Flr • </span>
            <span>2:00–5:00 PM</span>
          </div>

        </div>
      </footer>

      {/* Event Guidelines Modal */}
      <GuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />
    </div>
  );
}

export default App;
