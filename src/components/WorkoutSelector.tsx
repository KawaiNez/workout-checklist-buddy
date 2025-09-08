
import { Dumbbell, Target } from 'lucide-react';
import { WorkoutType } from '@/pages/Index';

interface WorkoutSelectorProps {
  onWorkoutSelect: (workout: WorkoutType) => void;
}

export const WorkoutSelector = ({ onWorkoutSelect }: WorkoutSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Fitness Tracker
        </h1>
        <p className="text-xl text-gray-300">
          Choose your workout routine and start tracking your progress
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div
          onClick={() => onWorkoutSelect('upper')}
          className="group cursor-pointer bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Upper Body</h2>
          <p className="text-white/90 mb-4">
            Shoulders, Biceps & Triceps
          </p>
          <div className="text-sm text-white/80">
            10 exercises • 30 total sets
          </div>
        </div>

        <div
          onClick={() => onWorkoutSelect('lower')}
          className="group cursor-pointer bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors">
            <Target className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Lower Body</h2>
          <p className="text-white/90 mb-4">
            Glutes, Legs & Core
          </p>
           <div className="text-sm text-white/80">
             10 exercises • 30 total sets
           </div>
        </div>
      </div>
    </div>
  );
};
