
import { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { ExerciseCard } from '@/components/ExerciseCard';
import { RestTimer } from '@/components/RestTimer';
import { Button } from '@/components/ui/button';

interface UpperBodyWorkoutProps {
  onBack: () => void;
}

const upperBodyExercises = [
  { name: 'Shoulder Press', sets: 3, reps: 12 },
  { name: 'Arnold Press/Lateral Raise', sets: 3, reps: 12 },
  { name: 'Overhead Triceps Extension', sets: 3, reps: 12 },
  { name: 'Skull Crusher', sets: 3, reps: 12 },
  { name: 'Alternating Bicep Curl', sets: 3, reps: 12 },
  { name: 'Hammer Curls', sets: 3, reps: 12 },
  { name: 'Dumbbell Bent Over Row', sets: 3, reps: 12 },
  { name: 'Reverse Fly', sets: 3, reps: 12 },
  { name: 'Forearm Twist', sets: 3, reps: 12 },
  { name: 'Dumbbell Shrug', sets: 3, reps: 12 },
];

export const UpperBodyWorkout = ({ onBack }: UpperBodyWorkoutProps) => {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>({});
  const [showTimer, setShowTimer] = useState(false);

  const initializeExercise = (exerciseName: string, setCount: number) => {
    if (!completedSets[exerciseName]) {
      setCompletedSets(prev => ({
        ...prev,
        [exerciseName]: new Array(setCount).fill(false)
      }));
    }
  };

  const handleSetToggle = (exerciseName: string, setIndex: number) => {
    const currentSets = completedSets[exerciseName] || [];
    const wasCompleted = currentSets[setIndex];
    
    setCompletedSets(prev => ({
      ...prev,
      [exerciseName]: prev[exerciseName]?.map((completed, index) => 
        index === setIndex ? !completed : completed
      ) || []
    }));
    
    // Show timer when completing a set (not when unchecking)
    if (!wasCompleted) {
      setShowTimer(true);
    }
  };

  const handleResetAll = () => {
    const resetSets: Record<string, boolean[]> = {};
    upperBodyExercises.forEach(exercise => {
      resetSets[exercise.name] = new Array(exercise.sets).fill(false);
    });
    setCompletedSets(resetSets);
  };

  const getTotalProgress = () => {
    const totalSets = upperBodyExercises.reduce((sum, ex) => sum + ex.sets, 0);
    const completedCount = Object.values(completedSets).flat().filter(Boolean).length;
    return Math.round((completedCount / totalSets) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showTimer && <RestTimer onClose={() => setShowTimer(false)} />}
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
          <h1 className="text-4xl font-bold text-white mb-2">Upper Body Routine</h1>
          <p className="text-gray-300">Shoulders, Biceps & Triceps</p>
          <div className="mt-2">
            <div className="text-3xl text-white">Progress: {getTotalProgress()}%</div>
            <div className="w-32 bg-gray-700 rounded-full h-2 mx-auto mt-1">
              <div 
                className="bg-gradient-to-r from-orange-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upperBodyExercises.map((exercise, index) => {
          initializeExercise(exercise.name, exercise.sets);
          return (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              completedSets={completedSets[exercise.name] || []}
              onSetToggle={(setIndex) => handleSetToggle(exercise.name, setIndex)}
              color="from-orange-500 to-pink-600"
            />
          );
        })}
      </div>
    </div>
  );
};
