"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface RatingScaleProps {
  min: number
  max: number
  value: number | null
  onSelect: (value: number) => void
}

export function RatingScale({ min, max, value, onSelect }: RatingScaleProps) {
  const ratings = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-2">
        {ratings.map((rating) => (
          <Button
            key={rating}
            variant={value === rating ? "default" : "outline"}
            size="lg"
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full p-0 transition-all hover:scale-110"
            onClick={() => onSelect(rating)}
          >
            <div className="flex flex-col items-center gap-1">
              <Star
                className={`h-5 w-5 ${
                  value === rating ? "fill-current text-primary-foreground" : "text-muted-foreground"
                }`}
              />
              <span className="text-xs font-semibold">{rating}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="flex justify-between text-sm text-muted-foreground px-2">
        <span>No confortable</span>
        <span>Muy confortable</span>
      </div>
    </div>
  )
}
