import { useState, useEffect } from 'react';
import { Timer, X } from 'lucide-react';

interface RestTimerProps {
  onClose: () => void;
  duration?: number;
}

export const RestTimer = ({ onClose, duration = 30 }: RestTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      playMellowAlarm(3); // Play mellow alarm for 3 seconds
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

  const playMellowAlarm = (duration: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const notes = [440, 523, 587, 659]; // A4, C5, D5, E5 for xylophone vibe
    const noteDuration = 0.25; // 250ms per note
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime); // VOLUME

    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      osc.type = 'sine'; // smooth, mellow tone
      osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * noteDuration);
      osc.connect(gainNode);
      osc.start(audioContext.currentTime + i * noteDuration);
      osc.stop(audioContext.currentTime + (i + 1) * noteDuration);
    });
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;

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
