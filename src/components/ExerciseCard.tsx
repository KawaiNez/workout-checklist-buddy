
import { Check } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string | number;
}

interface ExerciseCardProps {
  exercise: Exercise;
  completedSets: boolean[];
  onSetToggle: (setIndex: number) => void;
  color: string;
}

export const ExerciseCard = ({ exercise, completedSets, onSetToggle, color }: ExerciseCardProps) => {
  const completedCount = completedSets.filter(Boolean).length;
  const progressPercentage = (completedCount / exercise.sets) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-5xl font-semibold text-white mb-1">{exercise.name}</h3>
          <p className="text-sm text-gray-300">
            {exercise.sets} sets × {exercise.reps} reps
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">
            {completedCount}/{exercise.sets} sets
          </div>
          <div className="w-20 bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {Array.from({ length: exercise.sets }, (_, index) => (
          <button
            key={index}
            onClick={() => onSetToggle(index)}
            className={`group relative w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
              completedSets[index]
                ? `bg-gradient-to-r ${color} border-transparent shadow-lg`
                : 'border-gray-500 hover:border-gray-400 bg-transparent'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {completedSets[index] ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                  {index + 1}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
