"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const progress = Math.round(((currentStep - 1) / totalSteps) * 100)

  // Animación suave del progreso
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center text-sm font-medium">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Question</span>
          <span className="text-2xl font-bold text-primary tabular-nums">
            {currentStep}
          </span>
          <span className="text-muted-foreground">of {totalSteps}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary tabular-nums animate-pulse-slow">
            {animatedProgress}%
          </span>
          <span className="text-muted-foreground text-xs">complete</span>
        </div>
      </div>
      
      {/* Barra de progreso mejorada con gradiente animado */}
      <div className="relative">
        <div className="h-2.5 rounded-full bg-black/30 overflow-hidden backdrop-blur-sm">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-cyan-400 to-secondary transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${animatedProgress}%` }}
          >
            {/* Efecto de brillo animado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        
        {/* Indicador de paso actual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_12px_hsla(var(--primary)/0.6)] transition-all duration-500 ease-out"
          style={{ left: `calc(${animatedProgress}% - 8px)` }}
        />
      </div>
    </div>
  )
}
