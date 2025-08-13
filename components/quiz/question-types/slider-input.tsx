"use client"

import { Slider } from "@/components/ui/slider"

interface SliderInputProps {
  min: number
  max: number
  step: number
  value: number | null
  onValueChange: (value: number) => void
}

export function SliderInput({ min, max, step, value, onValueChange }: SliderInputProps) {
  const currentValue = value ?? min

  return (
    <div className="space-y-6">
      <div className="px-4">
        <Slider
          value={[currentValue]}
          onValueChange={([val]) => onValueChange(val)}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>

      <div className="flex justify-between text-sm text-muted-foreground px-2">
        <span>Bajo Riesgo ({min})</span>
        <span className="font-semibold text-foreground">Current: {currentValue}</span>
        <span>Alto Riesgo ({max})</span>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white text-xl font-bold">
          {currentValue}
        </div>
      </div>
    </div>
  )
}
