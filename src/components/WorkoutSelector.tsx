
import { Dumbbell } from 'lucide-react';
import { WorkoutType } from '@/pages/Index';

const GluteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8C6 5.79086 7.79086 4 10 4C11.5 4 12.7 4.8 13.5 6C13.8 6 14 6 14 6C14.3 6 14.5 6 14.8 6C15.6 4.8 16.8 4 18.3 4C20.5 4 22.3 5.79086 22.3 8C22.3 9.5 21.7 10.8 20.7 11.7L18 14.5C17 15.5 15.5 16 14 16H10C8.5 16 7 15.5 6 14.5L3.3 11.7C2.3 10.8 1.7 9.5 1.7 8C1.7 5.79086 3.49086 4 5.7 4C7.2 4 8.4 4.8 9.2 6" />
    <ellipse cx="12" cy="16" rx="6" ry="4" />
  </svg>
);

interface WorkoutSelectorProps {
  onWorkoutSelect: (workout: WorkoutType) => void;
}

export const WorkoutSelector = ({ onWorkoutSelect }: WorkoutSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-8 sm:mb-12 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Fitness Tracker
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300">
          Choose your workout routine and start tracking your progress
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
        <div
          onClick={() => onWorkoutSelect('upper')}
          className="group cursor-pointer bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="bg-white/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/30 transition-colors">
            <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Upper Body</h2>
          <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4">
            Shoulders, Biceps & Triceps
          </p>
          <div className="text-xs sm:text-sm text-white/80">
            10 exercises • 30 total sets
          </div>
        </div>

        <div
          onClick={() => onWorkoutSelect('lower')}
          className="group cursor-pointer bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="bg-white/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/30 transition-colors">
            <GluteIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Lower Body</h2>
          <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4">
            Glutes, Legs & Core
          </p>
           <div className="text-xs sm:text-sm text-white/80">
             10 exercises • 30 total sets
           </div>
        </div>
      </div>
    </div>
  );
};
