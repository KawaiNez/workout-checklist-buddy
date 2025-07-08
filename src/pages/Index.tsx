
import { useState } from 'react';
import { WorkoutSelector } from '@/components/WorkoutSelector';
import { UpperBodyWorkout } from '@/components/UpperBodyWorkout';
import { LowerBodyWorkout } from '@/components/LowerBodyWorkout';

export type WorkoutType = 'upper' | 'lower' | null;

const Index = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType>(null);

  const handleWorkoutSelect = (workout: WorkoutType) => {
    setSelectedWorkout(workout);
  };

  const handleBackToSelection = () => {
    setSelectedWorkout(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {selectedWorkout === null && (
          <WorkoutSelector onWorkoutSelect={handleWorkoutSelect} />
        )}
        
        {selectedWorkout === 'upper' && (
          <UpperBodyWorkout onBack={handleBackToSelection} />
        )}
        
        {selectedWorkout === 'lower' && (
          <LowerBodyWorkout onBack={handleBackToSelection} />
        )}
      </div>
    </div>
  );
};

export default Index;
