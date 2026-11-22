import React from "react";
import { Check, Compass, Sliders, Palette, Layers, HelpCircle } from "lucide-react";

interface WorkflowStepperProps {
  steps: { id: string; label: string; icon: React.ReactNode }[];
  currentStepIndex: number;
  completedSteps: number[];
  onStepSelect: (index: number) => void;
}

export default function WorkflowStepper({
  steps,
  currentStepIndex,
  completedSteps,
  onStepSelect,
}: WorkflowStepperProps) {
  const progressPercent = Math.min(
    Math.round(((completedSteps.length) / steps.length) * 100),
    100
  );

  return (
    <div className="space-y-4">
      {/* Progress Bar Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-zinc-500">
        <span>Wizard Progress</span>
        <span className="text-amber-600 font-bold">{progressPercent}% Completed</span>
      </div>
      <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-400 to-amber-600 h-1.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps List rendering */}
      <div className="flex gap-2 justify-between">
        {steps.map((step, idx) => {
          const isActive = idx === currentStepIndex;
          const isCompleted = completedSteps.includes(idx);

          return (
            <button
              key={step.id}
              onClick={() => {
                if (isCompleted || idx <= Math.max(...completedSteps, 0) + 1) {
                  onStepSelect(idx);
                }
              }}
              disabled={!isCompleted && idx > Math.max(...completedSteps, -1) + 1}
              id={`step-indicator-${step.id}`}
              className={`flex-1 flex flex-col items-center p-2.5 rounded-xl border transition-all text-center ${
                isActive
                  ? "border-amber-400 bg-amber-50/40 shadow-xs"
                  : isCompleted
                  ? "border-zinc-200 bg-zinc-50 cursor-pointer hover:bg-zinc-100/50"
                  : "border-zinc-100 bg-white opacity-45 cursor-not-allowed"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : isCompleted
                    ? "bg-emerald-500 text-white"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.icon}
              </div>
              <span
                className={`text-[9px] font-bold tracking-tight mt-1.5 select-none hidden sm:block ${
                  isActive
                    ? "text-amber-700"
                    : isCompleted
                    ? "text-emerald-700"
                    : "text-zinc-400"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
