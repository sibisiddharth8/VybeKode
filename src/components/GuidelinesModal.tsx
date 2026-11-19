import React, { useEffect } from 'react';
import { sound } from '../utils/audio';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-gray-950/65 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white border-3 border-gray-900 rounded-3xl shadow-[8px_8px_0px_#111827] overflow-hidden z-10 max-h-[88vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-900 bg-emerald-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight">
              VybeKode Official Guidelines
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            title="Close (Esc)"
            className="w-8 h-8 rounded-full border-2 border-gray-900 flex items-center justify-center font-black text-sm text-gray-900 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-gray-800">

          {/* Welcome Note & Objective */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white border-2 border-gray-900 shadow-[4px_4px_0px_#111827] space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 block">
              Core Objective
            </span>
            <p className="text-base sm:text-lg font-bold leading-snug">
              Develop AI-driven solutions to improve efficiency and reduce manual effort across Finance, RMG, and People Management functions.
            </p>
          </div>

          {/* Logistics Grid */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <span>📍</span> Event Logistics & Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

              {/* Venue */}
              <div className="p-3.5 rounded-xl border-2 border-gray-900 bg-emerald-50/50 shadow-[2px_2px_0px_#111827]">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  🏢 Venue
                </span>
                <span className="font-extrabold text-gray-900 text-sm sm:text-base mt-0.5 block">
                  Magnum SCB ODC, 11th Floor
                </span>

              </div>

              {/* Time */}
              <div className="p-3.5 rounded-xl border-2 border-gray-900 bg-emerald-50/50 shadow-[2px_2px_0px_#111827]">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  ⏰ Time
                </span>
                <span className="font-extrabold text-gray-900 text-sm sm:text-base mt-0.5 block">
                  2:00 PM – 4:00 PM
                </span>
                <span className="text-xs font-semibold text-emerald-800">
                  Demos continue until 5:00 PM
                </span>
              </div>

              {/* Usecase Collection */}
              <div className="p-3.5 rounded-xl border-2 border-gray-900 bg-white shadow-[2px_2px_0px_#111827]">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  🎟️ Usecase Collection
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
                  12:30 PM at AI Lab (Meeting Room 9, near SCB ODC entrance)
                </p>
              </div>

              {/* Platform & Reporting */}
              <div className="p-3.5 rounded-xl border-2 border-gray-900 bg-white shadow-[2px_2px_0px_#111827]">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  💻 Platform & Reporting
                </span>
                <p className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5">
                  Platform: <span className="font-black text-emerald-700">GHCP</span> • Be present 30 mins before start time
                </p>
              </div>

            </div>
          </div>

          {/* Presentation & Demo Guidelines */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-1.5">
              <span>🎤</span> Demo & Presentation Guidelines
            </h3>

            <div className="p-4 rounded-2xl border-2 border-gray-900 bg-amber-50/60 shadow-[3px_3px_0px_#111827] space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <span className="font-bold text-gray-900">⏱️ Demo Duration:</span>
                <span className="font-mono font-black text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
                  5 minutes per team
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p className="font-semibold text-gray-800">
                  <span className="font-black text-gray-900">No PowerPoint presentation is required.</span> Jump straight to demonstrating your solution.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p className="font-semibold text-gray-800">
                  <span className="font-black text-gray-900">Present:</span> Business Problem, Solution Approach, Workflow, and Expected Business Impact.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <p className="font-semibold text-gray-800">
                  <span className="font-black text-gray-900">Judging:</span> The jury's decision will be final.
                </p>
              </div>
            </div>
          </div>

          {/* Sign-off */}
          <div className="text-center pt-1 text-xs text-gray-600 font-medium">
            <p className="font-bold text-gray-800">We look forward to your participation and innovative solutions!</p>
            <p className="text-gray-500 mt-0.5 font-semibold">Thanks & Regards, <span className="text-emerald-800 font-bold">VybeKode Organizing Team</span></p>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 border-t-2 border-gray-900 bg-gray-50 flex justify-end shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl border-2 border-gray-900 shadow-[2px_2px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            Close Guidelines
          </button>
        </div>

      </div>
    </div>
  );
};

