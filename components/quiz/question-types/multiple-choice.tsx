"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface MultipleChoiceProps {
  options: string[]
  value: string | null
  onSelect: (value: string) => void
}

export function MultipleChoice({ options, value, onSelect }: MultipleChoiceProps) {
  return (
    <div className="grid gap-3">
      {options.map((option, index) => (
        <Button
          key={index}
          variant={value === option ? "default" : "outline"}
          className="h-auto p-4 text-left justify-start relative transition-all hover:scale-[1.01] w-full whitespace-normal break-words"
          onClick={() => onSelect(option)}
        >
          <div className="flex items-start gap-3 w-full">
            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                value === option ? "bg-primary border-primary" : "border-muted-foreground/30"
              }`}
            >
              {value === option && <Check className="h-3 w-3 text-primary-foreground" />}
            </div>
            <span className="text-sm leading-relaxed break-words">{option}</span>
          </div>
        </Button>
      ))}
    </div>
  )
}
