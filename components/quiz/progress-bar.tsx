"use client"

import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const progress = Math.round(((currentStep - 1) / totalSteps) * 100)

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
           Pregunta {currentStep} de {totalSteps}
        </span>
        <span>{progress}% completado</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
