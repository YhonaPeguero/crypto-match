"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultipleChoiceProps {
  options: string[]
  value: string | null
  onSelect: (value: string) => void
}

export function MultipleChoice({ options, value, onSelect }: MultipleChoiceProps) {
  return (
    <div className="grid gap-4">
      {options.map((option, index) => {
        const isSelected = value === option
        return (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={cn(
              "group relative h-auto p-5 md:p-6 text-left w-full rounded-xl border-2 transition-all duration-300",
              "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isSelected
                ? "bg-primary/10 border-primary shadow-[0_0_20px_hsla(var(--primary)/0.3)] text-foreground"
                : "bg-card/50 border-border hover:border-primary/30 hover:bg-card/70 text-foreground dark:border-white/10"
            )}
          >
            <div className="flex items-start gap-4 w-full">
              {/* Radio button mejorado */}
              <div
                className={cn(
                  "h-6 w-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 transition-all duration-300",
                  isSelected
                    ? "bg-primary border-primary shadow-[0_0_12px_hsla(var(--primary)/0.6)]"
                    : "border-muted-foreground/40 group-hover:border-primary/50"
                )}
              >
                {isSelected && (
                  <Check className="h-4 w-4 text-white animate-in zoom-in duration-200" />
                )}
              </div>
              
              {/* Texto de la opción */}
              <span className={cn(
                "text-base md:text-lg leading-relaxed break-words flex-1",
                isSelected ? "text-foreground font-medium" : "text-foreground/90"
              )}>
                {option}
              </span>
            </div>
            
            {/* Glow effect cuando está seleccionado */}
            {isSelected && (
              <div className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none animate-pulse-slow" />
            )}
          </button>
        )
      })}
    </div>
  )
}
