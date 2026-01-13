"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingScaleProps {
  min: number
  max: number
  value: number | null
  onSelect: (value: number) => void
}

export function RatingScale({ min, max, value, onSelect }: RatingScaleProps) {
  const ratings = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {ratings.map((rating) => {
          const isSelected = value === rating
          return (
            <button
              key={rating}
              onClick={() => onSelect(rating)}
              className={cn(
                "group relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl p-0 transition-all duration-300",
                "hover:scale-110 active:scale-95",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(var(--primary)/0.4)] scale-110"
                  : "bg-card/50 border-2 border-white/10 text-foreground hover:border-primary/50 hover:bg-card/70"
              )}
            >
              <div className="flex flex-col items-center justify-center gap-2 h-full">
                <Star
                  className={cn(
                    "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-all duration-300",
                    isSelected
                      ? "fill-current text-primary-foreground animate-in zoom-in"
                      : "text-muted-foreground group-hover:text-primary/70"
                  )}
                />
                <span className={cn(
                  "text-sm sm:text-base md:text-lg font-bold tabular-nums",
                  isSelected ? "text-primary-foreground" : "text-foreground/80"
                )}>
                  {rating}
                </span>
              </div>
              
              {/* Glow effect cuando está seleccionado */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl bg-primary/20 pointer-events-none animate-pulse-slow" />
              )}
            </button>
          )
        })}
      </div>

      {/* Labels mejorados */}
      <div className="flex justify-between items-center text-sm md:text-base px-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-muted-foreground font-medium">No confortable</span>
          <span className="text-xs text-muted-foreground/70">({min})</span>
        </div>
        
        {value !== null && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Star className="h-4 w-4 text-primary fill-current" />
            <span className="text-primary font-bold">{value}</span>
          </div>
        )}
        
        <div className="flex flex-col items-end gap-1">
          <span className="text-muted-foreground font-medium">Muy confortable</span>
          <span className="text-xs text-muted-foreground/70">({max})</span>
        </div>
      </div>
    </div>
  )
}
