"use client"

import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SliderInputProps {
  min: number
  max: number
  step: number
  value: number | null
  onValueChange: (value: number) => void
}

export function SliderInput({ min, max, step, value, onValueChange }: SliderInputProps) {
  const currentValue = value ?? min
  const [displayValue, setDisplayValue] = useState(currentValue)

  // Animación suave del valor mostrado
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(currentValue)
    }, 50)
    return () => clearTimeout(timer)
  }, [currentValue])

  // Calcular color basado en el valor
  const getColorClass = (val: number) => {
    const percentage = ((val - min) / (max - min)) * 100
    if (percentage < 33) return "from-green-500 to-emerald-600"
    if (percentage < 66) return "from-yellow-500 to-orange-500"
    return "from-orange-500 to-red-600"
  }

  return (
    <div className="space-y-8">
      {/* Slider mejorado */}
      <div className="px-2 sm:px-4">
        <Slider
          value={[currentValue]}
          onValueChange={([val]) => onValueChange(val)}
          min={min}
          max={max}
          step={step}
          className="w-full cursor-pointer"
        />
      </div>

      {/* Labels mejorados */}
      <div className="flex justify-between items-center text-sm px-2">
        <div className="flex flex-col items-start gap-1">
          <span className="text-muted-foreground">Bajo Riesgo</span>
          <span className="text-xs text-muted-foreground/70">({min})</span>
        </div>
        
        {/* Valor actual destacado */}
        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br text-white text-2xl font-bold shadow-lg transition-all duration-300",
            getColorClass(currentValue)
          )}>
            {displayValue}
          </div>
          <span className="text-xs text-muted-foreground font-medium">Tu selección</span>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className="text-muted-foreground">Alto Riesgo</span>
          <span className="text-xs text-muted-foreground/70">({max})</span>
        </div>
      </div>

      {/* Indicador visual de rango */}
      <div className="flex items-center gap-2 px-2">
        <div className="flex-1 h-2 rounded-full bg-muted/30 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full bg-gradient-to-r transition-all duration-500",
              getColorClass(currentValue)
            )}
            style={{ width: `${((currentValue - min) / (max - min)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
