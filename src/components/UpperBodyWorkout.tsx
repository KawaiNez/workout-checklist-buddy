import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ExerciseCard } from '@/components/ExerciseCard';
import { RestTimer } from '@/components/RestTimer';
import { Button } from '@/components/ui/button';

interface UpperBodyWorkoutProps {
  onBack: () => void;
}

const upperBodyExercises = [
  // 1️⃣ Big compounds first (shoulders + back)
  { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '8-12' },
  { name: 'Supported Single-Arm Dumbbell Row', sets: 3, reps: '8-12' },
  { name: 'Standing Row w/ Wall Support', sets: 2, reps: '8-10' },

  // 2️⃣ Delts & rear delts (shape + balance)
  { name: 'Lateral Raise', sets: 2, reps: '12-15' },

  // 3️⃣ Biceps focus
  { name: 'Bicep Curl', sets: 3, reps: '10-12' },

  // 4️⃣ Triceps
  { name: 'Triceps Pushdown', sets: 3, reps: '10-12' },

  // 5️⃣ Can alternate these
  { name: 'Hammer Curl', sets: 3, reps: '10-12', optional: true },
  { name: 'Skullcrusher', sets: 3, reps: '10-12', optional: true },
];


export const UpperBodyWorkout = ({ onBack }: UpperBodyWorkoutProps) => {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>({});
  const [showTimer, setShowTimer] = useState(false);
  const [restDuration, setRestDuration] = useState(30);

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

    if (!wasCompleted) {
      setRestDuration(30);
      setShowTimer(true);
    }
  };

  const handleRestClick = () => {
    setRestDuration(90);
    setShowTimer(true);
  };

  const getTotalProgress = () => {
    const totalSets = upperBodyExercises
      .filter(ex => !ex.optional)
      .reduce((sum, ex) => sum + ex.sets, 0);
    const completedCount = Object.entries(completedSets)
      .filter(([name]) => {
        const exercise = upperBodyExercises.find(ex => ex.name === name);
        return exercise && !exercise.optional;
      })
      .flatMap(([_, sets]) => sets)
      .filter(Boolean).length;
    return Math.round((completedCount / totalSets) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {showTimer && <RestTimer onClose={() => setShowTimer(false)} duration={restDuration} />}

      {/* Header - MATCHED TO LOWER BODY */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 gap-4">
        {/* Back button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="sm:absolute sm:left-0 text-white hover:bg-white/20 w-full sm:w-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>

        {/* Center block: title, subtitle, progress */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">Upper Body Routine</h1>
          <p className="text-sm sm:text-base text-gray-300">Shoulders, Biceps & Triceps</p>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl md:text-3xl text-white">Progress: {getTotalProgress()}%</div>
            <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2 mx-auto mt-1">
            <div
                className="bg-gradient-to-r from-cyan-400 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>
          {/* Rest Button and Video Button */}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleRestClick}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Rest (1:30)
            </Button>
            <Button
              onClick={() => window.open('https://www.youtube.com/watch?v=mf6CZ5_7dfc', '_blank')}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              Watch Tutorial
            </Button>
          </div>
        </div>
      </div>
      {/* END Header */}

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upperBodyExercises.map((exercise, index) => {
          initializeExercise(exercise.name, exercise.sets);
          const isHammerCurl = exercise.name === 'Hammer Curl';
          return (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              completedSets={completedSets[exercise.name] || []}
              onSetToggle={(setIndex) => handleSetToggle(exercise.name, setIndex)}
              color="from-cyan-500 to-teal-600"
              className={isHammerCurl ? 'md:col-start-1' : ''}
            />
          );
        })}
      </div>
    </div>
  );
};
