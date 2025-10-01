
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
  disabled?: boolean;
}

export const ExerciseCard = ({ exercise, completedSets, onSetToggle, color, disabled = false }: ExerciseCardProps) => {
  const completedCount = completedSets.filter(Boolean).length;
  const progressPercentage = (completedCount / exercise.sets) * 100;

  return (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 transition-all duration-300 ${
      disabled ? 'opacity-50 bg-gray-800/20' : ''
    }`}>
      {disabled && (
        <div className="mb-3 text-center">
          <span className="text-xs sm:text-sm text-orange-400 bg-orange-400/10 px-2 sm:px-3 py-1 rounded-full">
            Choose 3 from 4 abs exercises - limit reached
          </span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div className="flex-1">
          <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-1 ${disabled ? 'text-gray-400' : 'text-white'}`}>
            {exercise.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            {exercise.sets} sets × {exercise.reps} reps
          </p>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <div className={`text-lg sm:text-xl mb-1 ${disabled ? 'text-gray-400' : 'text-white'}`}>
            {completedCount}/{exercise.sets} sets
          </div>
          <div className="w-full sm:w-20 bg-gray-700 rounded-full h-2">
            <div 
              className={`bg-gradient-to-r ${disabled ? 'from-gray-500 to-gray-600' : color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {Array.from({ length: exercise.sets }, (_, index) => (
          <button
            key={index}
            onClick={() => !disabled && onSetToggle(index)}
            disabled={disabled}
            className={`group relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 transition-all duration-200 ${
              disabled 
                ? 'border-gray-600 bg-gray-700/50 cursor-not-allowed'
                : completedSets[index]
                ? `bg-gradient-to-r ${color} border-transparent shadow-lg`
                : 'border-gray-500 hover:border-gray-400 bg-transparent'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {completedSets[index] ? (
                <Check className={`w-4 h-4 sm:w-5 sm:h-5 ${disabled ? 'text-gray-400' : 'text-white'}`} />
              ) : (
                <span className={`text-xs sm:text-sm font-medium ${
                  disabled 
                    ? 'text-gray-500' 
                    : 'text-gray-400 group-hover:text-gray-300'
                }`}>
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
