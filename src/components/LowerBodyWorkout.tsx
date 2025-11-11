import { useState } from "react";
import { ArrowLeft, Zap, Clock } from "lucide-react";
import { ExerciseCard } from "@/components/ExerciseCard";
import { RestTimer } from "@/components/RestTimer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LowerBodyWorkoutProps {
  onBack: () => void;
}

const lowerBodyExercises = [
  // 1️⃣ Main compounds – quads + glutes + overall growth
  { name: "Squats", sets: 3, reps: "8-12" },
  { name: "RDL", sets: 3, reps: "8-12" },

  // 2️⃣ Glute / butt focus
  { name: "Glute Bridges", sets: 3, reps: "12-15" },
 
  // 3️⃣ Balance quads & hamstrings
  { name: "Leg Extensions DB", sets: 2, reps: "12-15" }, // keep, but slightly reduced

  // 3️⃣ Hip dip area – side glutes / glute med
  { name: "Side Leg Raise", sets: 3, reps: "15-20" },

  // 4️⃣ Calves
  { name: "Calf Raise", sets: 3, reps: "12-15" },

  // 6️⃣  Core finisher (toned abs without ruining big lifts)
  { name: "Dumbbell Crunch", sets: 3, reps: "10-12" },
  { name: "Dumbbell Leg Raises", sets: 3, reps: "12-15" },
  { name: "Russian Twists", sets: 3, reps: "20 (10 each side)" },
];

const absExercises = [
  "Dumbbell Leg Raises",
  "Russian Twists",
  "Cable crunches with dumbbell",
];

export const LowerBodyWorkout = ({ onBack }: LowerBodyWorkoutProps) => {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>(
    {}
  );
  const [showTimer, setShowTimer] = useState(false);
  const [restDuration, setRestDuration] = useState(30);

  const initializeExercise = (exerciseName: string, setCount: number) => {
    if (!completedSets[exerciseName]) {
      setCompletedSets((prev) => ({
        ...prev,
        [exerciseName]: new Array(setCount).fill(false),
      }));
    }
  };

  const getCompletedAbsExercises = () => {
    return absExercises.filter((exerciseName) => {
      const sets = completedSets[exerciseName] || [];
      const exercise = lowerBodyExercises.find(
        (ex) => ex.name === exerciseName
      );
      return (
        sets.length === exercise?.sets && sets.every((set) => set === true)
      );
    });
  };

  const isAbsExerciseDisabled = (exerciseName: string) => {
    const completedAbs = getCompletedAbsExercises();
    const isThisExerciseCompleted = completedAbs.includes(exerciseName);
    return completedAbs.length >= 3 && !isThisExerciseCompleted;
  };

  const handleSetToggle = (exerciseName: string, setIndex: number) => {
    if (
      absExercises.includes(exerciseName) &&
      isAbsExerciseDisabled(exerciseName)
    ) {
      return;
    }

    const currentSets = completedSets[exerciseName] || [];
    const wasCompleted = currentSets[setIndex];

    setCompletedSets((prev) => ({
      ...prev,
      [exerciseName]:
        prev[exerciseName]?.map((completed, index) =>
          index === setIndex ? !completed : completed
        ) || [],
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
    const totalSets = lowerBodyExercises.reduce((sum, ex) => sum + ex.sets, 0);
    const completedCount = Object.values(completedSets)
      .flat()
      .filter(Boolean).length;
    return Math.round((completedCount / totalSets) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {showTimer && <RestTimer onClose={() => setShowTimer(false)} duration={restDuration} />}

      {/* Header */}
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

        {/* Centered Title, Subtitle & Progress */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Lower Body + Core
          </h1>
          <p className="text-sm sm:text-base text-gray-300">Glutes, Legs & Core</p>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl md:text-3xl text-white">
              Progress: {getTotalProgress()}%
            </div>
            <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2 mx-auto mt-1">
            <div
                className="bg-gradient-to-r from-purple-400 to-violet-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getTotalProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up, Rest, and Tutorial buttons */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <Dialog>
          <DialogTrigger asChild>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto">
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
              {" "}
              <div>
                {" "}
                <h3 className="text-lg font-semibold mb-3 text-blue-600">
                  Dynamic Stretching:
                </h3>{" "}
                <ul className="space-y-2 ml-4">
                  {" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-blue-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Leg Swings:</strong> 10 reps each leg, forward and
                      backward.
                    </span>{" "}
                  </li>{" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-blue-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Hip Circles:</strong> 10 reps clockwise and
                      counterclockwise.
                    </span>{" "}
                  </li>{" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-blue-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Walking Lunges:</strong> 10 lunges per leg.
                    </span>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-lg font-semibold mb-3 text-green-600">
                  Activation Exercises:
                </h3>{" "}
                <ul className="space-y-2 ml-4">
                  {" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-green-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Bodyweight Squats:</strong> 2 sets of 12 reps.
                    </span>{" "}
                  </li>{" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-green-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Hip Bridges:</strong> 2 sets of 12 reps.
                    </span>{" "}
                  </li>{" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-green-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Plank with Shoulder Taps:</strong> 2 sets of 15
                      taps (each side).
                    </span>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-lg font-semibold mb-3 text-purple-600">
                  Stretching:
                </h3>{" "}
                <ul className="space-y-2 ml-4">
                  {" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-purple-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Hamstring Stretch:</strong> Hold for 30 seconds
                      each leg.
                    </span>{" "}
                  </li>{" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-purple-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Quad Stretch:</strong> Hold for 30 seconds each
                      leg.
                    </span>{" "}
                  </li>{" "}
                  <li className="flex items-start">
                    {" "}
                    <span className="text-purple-500 mr-2">•</span>{" "}
                    <span>
                      <strong>Calf Stretch:</strong> Hold for 30 seconds each
                      leg.
                    </span>{" "}
                  </li>{" "}
                </ul>{" "}
              </div>{" "}
            </div>{" "}
          </DialogContent>{" "}
        </Dialog>
        <Button 
          onClick={handleRestClick}
          className="bg-teal-500 hover:bg-teal-600 text-white w-full sm:w-auto"
        >
          <Clock className="w-4 h-4 mr-2" />
          Rest (1:30)
        </Button>
        <Button
          onClick={() => window.open('https://www.youtube.com/watch?v=QLkLKfL_7F0', '_blank')}
          className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
        >
          Watch Tutorial
        </Button>
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lowerBodyExercises.map((exercise) => {
          initializeExercise(exercise.name, exercise.sets);
          return (
            <ExerciseCard
              key={exercise.name}
              exercise={exercise}
              completedSets={completedSets[exercise.name] || []}
              onSetToggle={(setIndex) =>
                handleSetToggle(exercise.name, setIndex)
              }
              color="from-purple-500 to-violet-600"
              disabled={
                absExercises.includes(exercise.name)
                  ? isAbsExerciseDisabled(exercise.name)
                  : false
              }
            />
          );
        })}
      </div>
    </div>
  );
};
