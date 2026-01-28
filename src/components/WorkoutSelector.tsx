
import { Dumbbell, Target } from 'lucide-react';
import { WorkoutType } from '@/pages/Index';

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
            Biceps, Shoulders, Back & Triceps
          </p>
          <div className="text-xs sm:text-sm text-white/80">
            9 exercises • 27 total sets
          </div>
        </div>

        <div
          onClick={() => onWorkoutSelect('lower')}
          className="group cursor-pointer bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-6 sm:p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="bg-white/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-white/30 transition-colors">
            <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Lower Body</h2>
          <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4">
            Glutes, Legs & Core
          </p>
           <div className="text-xs sm:text-sm text-white/80">
             5 exercises • 15 total sets
           </div>
        </div>
      </div>
    </div>
  );
};
