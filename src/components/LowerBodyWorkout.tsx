import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Button } from '@/components/ui/button';

interface LowerBodyWorkoutProps {
  onBack: () => void;
}

const lowerBodyExercises = [
  { name: 'Squats', sets: 4, reps: '12-15' },
  { name: 'Leg Extensions', sets: 3, reps: 15 },
  { name: 'Glute Bridges/Hip Thrusts', sets: 4, reps: '15-20' },
  { name: 'RDL', sets: 3, reps: '10-12' },
  { name: 'Leg Raises', sets: 3, reps: 15 },
  { name: 'Russian Twists', sets: 3, reps: '20 (10 each side)' },
  { name: 'Plank Hold', sets: 3, reps: '30-45 sec' },
];

export const LowerBodyWorkout = ({ onBack }: LowerBodyWorkoutProps) => {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>({});

  const initializeExercise = (exerciseName: string, setCount: number) => {
    if (!completedSets[exerciseName]) {
      setCompletedSets(prev => ({
        ...prev,
        [exerciseName]: new Array(setCount).fill(false)
      }));
    }
  };

  const handleSetToggle = (exerciseName: string, setIndex: number) => {
    setCompletedSets(prev => ({
      ...prev,
      [exerciseName]: prev[exerciseName]?.map((completed, index) => 
        index === setIndex ? !completed : completed
      ) || []
    }));
  };

  const handleResetAll = () => {
    const resetSets: Record<string, boolean[]> = {};
    lowerBodyExercises.forEach(exercise => {
      resetSets[exercise.name] = new Array(exercise.sets).fill(false);
    });
    setCompletedSets(resetSets);
  };

  const getTotalProgress = () => {
    const totalSets = lowerBodyExercises.reduce((sum, ex) => sum + ex.sets, 0);
    const completedCount = Object.values(completedSets).flat().filter(Boolean).length;
    return Math.round((completedCount / totalSets) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Lower Body + Core</h1>
          <p className="text-gray-300">Glutes, Legs & Core</p>
          <div className="mt-2">
            <div className="text-sm text-gray-400">Progress: {getTotalProgress()}%</div>
            <div className="w-32 bg-gray-700 rounded-full h-2 mx-auto mt-1">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleResetAll}
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lowerBodyExercises.map((exercise, index) => {
          initializeExercise(exercise.name, exercise.sets);
          return (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              completedSets={completedSets[exercise.name] || []}
              onSetToggle={(setIndex) => handleSetToggle(exercise.name, setIndex)}
              color="from-blue-500 to-purple-600"
            />
          );
        })}
      </div>
    </div>
  );
};
