import { useState, useEffect } from 'react';
import { Timer, X } from 'lucide-react';

interface RestTimerProps {
  onClose: () => void;
}

export const RestTimer = ({ onClose }: RestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      playAlarmSound(3); // Play alarm for 5 seconds
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, onClose]);

  const playAlarmSound = (duration: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a siren-like "beep-beep" effect by sweeping frequency
    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);

    for (let i = 0; i < duration * 2; i++) {
      const t = audioContext.currentTime + i * 0.25; // every 0.25s switch
      oscillator.frequency.setValueAtTime(i % 2 === 0 ? 800 : 500, t);
      gainNode.gain.setValueAtTime(0.21, t); //decrease volume
      gainNode.gain.setValueAtTime(0.0, t + 0.2); // short beep
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  const progressPercentage = ((30 - timeLeft) / 30) * 100;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm min-w-[280px]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">Rest Timer</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <div className="text-white/80 text-sm mb-3">
            Rest time: {timeLeft > 0 ? `${timeLeft} seconds` : "Complete!"}
          </div>
          
          {/* Timer progress bar */}
          <div className="w-full bg-white/20 rounded-full h-3 mb-2">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {timeLeft <= 0 && (
            <div className="text-green-400 text-sm font-semibold animate-pulse">
              Timer Complete! 🔔 (Closing...)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
