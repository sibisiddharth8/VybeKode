import React, { useState } from 'react';
import type { Usecase } from '../types/usecase';
import { RobotMascot } from './RobotMascot';
import { UsecaseCard } from './UsecaseCard';
import { ShuffleIcon, TerminalIcon, ArrowRightIcon } from './Icons';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { runTextScramble } from '../utils/textScramble';

interface RevealStationProps {
  usecases: Usecase[];
}

export const RevealStation: React.FC<RevealStationProps> = ({ usecases }) => {
  const [inputVal, setInputVal] = useState('');
  const [activeUsecase, setActiveUsecase] = useState<Usecase | null>(null);
  const [revealingState, setRevealingState] = useState<'idle' | 'decrypting' | 'revealed' | 'error'>('idle');
  const [scrambledTitle, setScrambledTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Find usecase by number
  const parseUsecase = (query: string): Usecase | null => {
    const cleaned = query.trim().replace(/^#+/, '').trim();
    if (!cleaned) return null;

    const num = parseInt(cleaned, 10);
    if (!isNaN(num)) {
      return usecases.find((u) => u.id === num) || null;
    }

    const lower = cleaned.toLowerCase();
    return (
      usecases.find((u) => u.title.toLowerCase().includes(lower)) || null
    );
  };

  const triggerReveal = (target: Usecase) => {
    sound.playBeep(440);
    setRevealingState('decrypting');
    setErrorMessage('');
    setActiveUsecase(target);
    setScrambledTitle('####################');

    // Scramble effect
    runTextScramble(
      target.title,
      (text) => setScrambledTitle(text),
      () => sound.playScrambleTick(),
      () => {
        setRevealingState('revealed');
        sound.playRevealFanfare();
        fireConfetti(2800);
      },
      1100
    );
  };

  const handleRevealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const matched = parseUsecase(inputVal);
    if (matched) {
      triggerReveal(matched);
    } else {
      sound.playError();
      setRevealingState('error');
      setErrorMessage(`Usecase "${inputVal}" was not found. Please choose between 1 and ${usecases.length}.`);
    }
  };

  const handleSurpriseMe = () => {
    sound.playClick();
    const randomIndex = Math.floor(Math.random() * usecases.length);
    const chosen = usecases[randomIndex];
    setInputVal(chosen.id.toString());
    triggerReveal(chosen);
  };

  const handleQuickSelect = (num: number) => {
    sound.playClick();
    setInputVal(num.toString());
    const matched = usecases.find((u) => u.id === num);
    if (matched) {
      triggerReveal(matched);
    }
  };

  const handleReset = () => {
    setActiveUsecase(null);
    setRevealingState('idle');
    setInputVal('');
    setScrambledTitle('');
    setErrorMessage('');
  };

  const handlePrev = () => {
    if (!activeUsecase) return;
    const currentIndex = usecases.findIndex((u) => u.id === activeUsecase.id);
    if (currentIndex > 0) {
      const prev = usecases[currentIndex - 1];
      setActiveUsecase(prev);
      setInputVal(prev.id.toString());
      triggerReveal(prev);
    }
  };

  const handleNext = () => {
    if (!activeUsecase) return;
    const currentIndex = usecases.findIndex((u) => u.id === activeUsecase.id);
    if (currentIndex < usecases.length - 1) {
      const next = usecases[currentIndex + 1];
      setActiveUsecase(next);
      setInputVal(next.id.toString());
      triggerReveal(next);
    }
  };

  const activeIndex = activeUsecase ? usecases.findIndex((u) => u.id === activeUsecase.id) : -1;

  // If revealed, show the wide full-screen card directly to maximize space and eliminate scrolling!
  if (revealingState === 'revealed' && activeUsecase) {
    return (
      <div className="w-full h-full flex items-center justify-center animate-fadeIn min-h-0">
        <UsecaseCard
          usecase={activeUsecase}
          onReset={handleReset}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < usecases.length - 1}
          scrambledTitle={scrambledTitle}
        />
      </div>
    );
  }

  // If decrypting, show full-screen cinematic decrypting console
  if (revealingState === 'decrypting') {
    return (
      <div className="w-full max-w-2xl mx-auto flex items-center justify-center animate-fadeIn">
        <div className="w-full bg-gray-950 text-emerald-400 border-3 border-gray-900 rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#111827] text-center space-y-4 animate-pulse">
          <div className="font-mono text-xs tracking-widest text-emerald-500 uppercase">
            ⚡ Decoding Challenge #{inputVal} ⚡
          </div>
          <div className="text-2xl sm:text-4xl font-mono font-black text-emerald-300 tracking-wider">
            {scrambledTitle}
          </div>
          <p className="text-xs sm:text-sm font-mono text-gray-400">
            Fetching prompt specifications and problem context...
          </p>
        </div>
      </div>
    );
  }

  // Initial Screen (Input Console & Quick Select)
  return (
    <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-5 animate-fadeIn">
      {/* Centered Hero Header */}
      <div className="text-center space-y-1 sm:space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-[11px] uppercase tracking-wider">
          <span>⚡ VybeKode 2026</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight uppercase leading-none">
          <span className="text-emerald-700">Reveal Your</span> Usecase
        </h2>

        <p className="text-xs sm:text-sm font-semibold text-gray-600">
          Enter your assigned number to reveal your challenge.
        </p>
      </div>

      {/* Centered Robot Mascot */}
      <div className="flex justify-center">
        <RobotMascot status={revealingState} />
      </div>

      {/* Main Input Card */}
      <div className="bg-white border-3 border-gray-900 rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_#111827] space-y-4">
        <form onSubmit={handleRevealSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-700 text-center">
              Enter Usecase Number
            </label>

            <div className="relative flex items-center">
              <span className="absolute left-4 font-mono font-black text-2xl text-emerald-700 select-none">
                #
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="e.g. 1, 2, 3..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-3 border-gray-900 bg-emerald-50/40 text-gray-950 font-black text-2xl sm:text-3xl placeholder:text-gray-400 placeholder:text-xl focus:outline-none focus:ring-4 focus:ring-emerald-400/40 focus:bg-white shadow-inner font-mono tracking-wider transition-all"
                autoFocus
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-2.5 bg-red-50 border-2 border-red-500 rounded-xl text-red-700 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-300 text-white font-black text-sm rounded-2xl border-3 border-gray-900 shadow-[3px_3px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed uppercase tracking-wider"
            >
              <TerminalIcon className="w-4 h-4 text-emerald-300" />
              <span>Reveal Usecase</span>
              <ArrowRightIcon className="w-4 h-4 ml-0.5" />
            </button>

            <button
              type="button"
              onClick={handleSurpriseMe}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-400 hover:bg-amber-500 text-gray-950 font-black text-sm rounded-2xl border-3 border-gray-900 shadow-[3px_3px_0px_#111827] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer uppercase tracking-wider"
            >
              <ShuffleIcon className="w-4 h-4 text-gray-950" />
              <span>Surprise Me 🎲</span>
            </button>
          </div>
        </form>

        {/* Quick Dial Number Pills */}
        <div className="pt-2.5 border-t-2 border-gray-100">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 block mb-1.5 text-center">
            Quick Select Number:
          </span>
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {usecases.map((u) => (
              <button
                key={u.id}
                onClick={() => handleQuickSelect(u.id)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border-2 border-gray-900 font-mono font-black text-xs flex items-center justify-center transition-all cursor-pointer ${inputVal === u.id.toString()
                  ? 'bg-emerald-600 text-white shadow-[2px_2px_0px_#111827]'
                  : 'bg-white hover:bg-emerald-100 text-gray-900 shadow-[2px_2px_0px_#111827]'
                  } active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`}
              >
                {u.numberDisplay}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
