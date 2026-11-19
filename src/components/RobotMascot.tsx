import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface RobotMascotProps {
  status: 'idle' | 'decrypting' | 'revealed' | 'error';
  customMessage?: string;
}

const IDLE_MESSAGES = [
  "Enter your usecase number to reveal! ✨",
  "Ready to vibe code? Let's decode! 💻",
  "Click 'Surprise Me' if you dare! 🎲",
  "VybeKode 2026 is LIVE! 🚀",
];

export const RobotMascot: React.FC<RobotMascotProps> = ({ status, customMessage }) => {
  const [userQuote, setUserQuote] = useState<string | null>(null);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleRobotClick = () => {
    sound.playBeep(920);
    const randomMsg = IDLE_MESSAGES[Math.floor(Math.random() * IDLE_MESSAGES.length)];
    setUserQuote(randomMsg);
  };

  const bubbleText = customMessage
    ? customMessage
    : status === 'decrypting'
    ? 'Decrypting challenge... ⚡'
    : status === 'revealed'
    ? 'Usecase unlocked! Let\'s vibe code! 🚀'
    : status === 'error'
    ? "Usecase not found! Try 1 to 12. 🔍"
    : userQuote || IDLE_MESSAGES[0];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 select-none">
      {/* Robot Head */}
      <div
        onClick={handleRobotClick}
        className="relative group cursor-pointer animate-soft-float"
        title="Click me!"
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white border-3 border-gray-900 rounded-2xl p-1.5 shadow-[3px_3px_0px_#111827] flex flex-col items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
          {/* Top Antenna */}
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 border-2 border-gray-900 animate-pulse" />
            <div className="w-0.5 h-1.5 bg-gray-900" />
          </div>

          {/* Ears */}
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-emerald-600 border border-gray-900 rounded-l-sm" />
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-1.5 h-3 bg-emerald-600 border border-gray-900 rounded-r-sm" />

          {/* Face Screen */}
          <div className="w-full h-full bg-emerald-950 rounded-xl flex items-center justify-center border border-gray-900 overflow-hidden">
            {blinking ? (
              <span className="text-emerald-400 font-mono font-bold text-[10px]">-- --</span>
            ) : status === 'decrypting' ? (
              <span className="text-emerald-400 font-mono font-extrabold text-xs animate-pulse">⚡_⚡</span>
            ) : status === 'revealed' ? (
              <span className="text-emerald-300 font-mono font-black text-xs animate-bounce">^ _ ^</span>
            ) : status === 'error' ? (
              <span className="text-amber-400 font-mono font-bold text-[10px]">&gt; _ &lt;</span>
            ) : (
              <span className="text-emerald-400 font-mono font-black text-xs">&lt;/&gt;</span>
            )}
          </div>
        </div>
      </div>

      {/* Comic Speech Bubble */}
      <div className="relative max-w-xs sm:max-w-sm bg-white border-2 border-gray-900 rounded-2xl px-3.5 py-2 shadow-[3px_3px_0px_#111827]">
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-900" />
        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[7px] border-r-white" />

        <p className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
          {bubbleText}
        </p>
      </div>
    </div>
  );
};
