import { useState } from 'react';
import { ArrowLeft, RotateCcw, Zap } from 'lucide-react';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface LowerBodyWorkoutProps {
  onBack: () => void;
}

const lowerBodyExercises = [
  { name: 'Squats', sets: 4, reps: '12-15' },
  { name: 'Leg Extensions', sets: 3, reps: 15 },
  { name: 'Glute Bridges/Hip Thrusts', sets: 4, reps: '15-20' },
  { name: 'RDL', sets: 3, reps: '10-12' },
  { name: 'Side Leg Raise', sets: 3, reps: 12 },
  { name: 'Calf Raise', sets: 3, reps: 15 },
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
            <div className="text-3xl text-white">Progress: {getTotalProgress()}%</div>
            <div className="w-32 bg-gray-700 rounded-full h-2 mx-auto mt-1">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>

      <div className="flex justify-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Warm up
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-4">
                Lower Body and Core Warm-Up Routine
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-blue-600">Dynamic Stretching:</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Leg Swings:</strong> 10 reps each leg, forward and backward.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Hip Circles:</strong> 10 reps clockwise and counterclockwise.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Walking Lunges:</strong> 10 lunges per leg.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">Activation Exercises:</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Bodyweight Squats:</strong> 2 sets of 12 reps.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Hip Bridges:</strong> 2 sets of 12 reps.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span><strong>Plank with Shoulder Taps:</strong> 2 sets of 15 taps (each side).</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-purple-600">Stretching:</h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Hamstring Stretch:</strong> Hold for 30 seconds each leg.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Quad Stretch:</strong> Hold for 30 seconds each leg.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Calf Stretch:</strong> Hold for 30 seconds each leg.</span>
                  </li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
