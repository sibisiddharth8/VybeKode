import React, { useEffect } from 'react';
import type { Usecase } from '../types/usecase';
import { RotateCcwIcon } from './Icons';
import { sound } from '../utils/audio';

interface UsecaseCardProps {
  usecase: Usecase;
  onReset: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  scrambledTitle?: string;
}

export const UsecaseCard: React.FC<UsecaseCardProps> = ({
  usecase,
  onReset,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  scrambledTitle,
}) => {
  // Support keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onReset();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onReset, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border-3 border-gray-900 rounded-3xl shadow-[8px_8px_0px_#111827] overflow-hidden transition-all duration-300 animate-fadeIn flex flex-col md:flex-row h-full max-h-[calc(100dvh-130px)]">
      
      {/* Left Column: Number Badge & Controls (Fixed height, no scroll, buttons always visible!) */}
      <div className="w-full md:w-[32%] lg:w-[30%] bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 sm:p-6 lg:p-7 flex flex-col justify-between relative border-b-3 md:border-b-0 md:border-r-3 border-gray-900 shrink-0">
        
        {/* Subtle Background Watermark */}
        <div className="absolute right-2 bottom-0 text-7xl md:text-9xl font-black text-white/5 select-none pointer-events-none font-mono">
          #{usecase.numberDisplay}
        </div>

        {/* Top: Usecase Badge & Large Number */}
        <div className="relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/80 text-emerald-200 border border-emerald-500/40 text-xs font-mono font-bold uppercase tracking-wider">
            <span>Official Challenge</span>
          </div>

          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-300 block mb-1">
              USECASE NUMBER
            </span>
            <div className="inline-flex items-center justify-center px-5 sm:px-6 py-1.5 sm:py-2 bg-white text-gray-950 font-black text-3xl sm:text-5xl rounded-2xl border-3 border-gray-900 shadow-[3px_3px_0px_#111827] font-mono">
              #{usecase.numberDisplay}
            </div>
          </div>
        </div>

        {/* Bottom: Stepper Navigation & Reset Button */}
        <div className="relative z-10 pt-4 sm:pt-6 space-y-2.5 sm:space-y-3">
          {/* Stepper (Prev / Next) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                if (onPrev) onPrev();
              }}
              disabled={!hasPrev}
              title="Previous Usecase (Left Arrow)"
              className="flex-1 py-2 px-3 bg-emerald-950/80 hover:bg-emerald-950 disabled:opacity-40 text-emerald-200 text-xs font-bold rounded-xl border border-emerald-600/50 transition-all cursor-pointer disabled:cursor-not-allowed text-center active:scale-95"
            >
              ← Prev
            </button>
            <button
              onClick={() => {
                sound.playClick();
                if (onNext) onNext();
              }}
              disabled={!hasNext}
              title="Next Usecase (Right Arrow)"
              className="flex-1 py-2 px-3 bg-emerald-950/80 hover:bg-emerald-950 disabled:opacity-40 text-emerald-200 text-xs font-bold rounded-xl border border-emerald-600/50 transition-all cursor-pointer disabled:cursor-not-allowed text-center active:scale-95"
            >
              Next →
            </button>
          </div>

          {/* Reset Action */}
          <button
            onClick={() => {
              sound.playClick();
              onReset();
            }}
            title="Reveal Another (Esc)"
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 bg-white hover:bg-emerald-50 text-gray-950 font-extrabold text-xs sm:text-sm rounded-xl border-2 border-gray-900 shadow-[3px_3px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <RotateCcwIcon className="w-4 h-4 text-emerald-800" />
            <span>Reveal Another Usecase</span>
          </button>
        </div>
      </div>

      {/* Right Column: Title & Scrollable Description Box */}
      <div className="flex-1 min-w-0 p-5 sm:p-7 lg:p-8 flex flex-col justify-between h-full min-h-0 bg-white space-y-3 sm:space-y-4 overflow-hidden">
        
        {/* Title Area (Header pinned, never scrolls) */}
        <div className="shrink-0 space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              Active Challenge Brief
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 tracking-tight leading-snug">
            {scrambledTitle || usecase.title}
          </h2>
        </div>

        {/* Detailed Description Box (ONLY this inner text area scrolls!) */}
        <div className="flex-1 min-h-0 bg-emerald-50/60 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 border-gray-900 shadow-[3px_3px_0px_#111827] flex flex-col overflow-hidden">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2 block shrink-0">
            Detailed Description & Requirements
          </span>
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 sm:pr-3 focus:outline-none">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-800 leading-relaxed whitespace-pre-line">
              {usecase.description}
            </p>
          </div>
        </div>

        {/* Footer Note (Pinned at bottom of card) */}
        <div className="shrink-0 flex items-center justify-between text-[11px] text-gray-500 font-semibold pt-1">
          <span>VybeKode 2026 • Live Reveal</span>
          <span className="text-emerald-700 font-bold hidden sm:inline">
            Press Esc or click button to reveal another
          </span>
        </div>

      </div>

    </div>
  );
};
