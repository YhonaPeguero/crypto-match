"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { QuizQuestion } from "@/types/quiz"
import { MultipleChoice } from "./question-types/multiple-choice"
import { SliderInput } from "./question-types/slider-input"
import { RatingScale } from "./question-types/rating-scale"

interface QuizCardProps {
  question: QuizQuestion
  value: string | number | null
  onAnswer: (value: string | number) => void
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isLastQuestion: boolean
}

export function QuizCard({
  question,
  value,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
}: QuizCardProps) {
  const renderQuestionInput = () => {
    switch (question.type) {
      case "multiple-choice":
        return <MultipleChoice options={question.options || []} value={value as string} onSelect={onAnswer} />
      case "slider":
        return (
          <SliderInput
            min={question.min || 1}
            max={question.max || 10}
            step={question.step || 1}
            value={value as number}
            onValueChange={onAnswer}
          />
        )
      case "rating":
        return (
          <RatingScale min={question.min || 1} max={question.max || 5} value={value as number} onSelect={onAnswer} />
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl border-0 bg-card/50 backdrop-blur">
      <CardHeader className="text-center space-y-4 pb-8">
        <CardTitle className="text-2xl md:text-3xl font-bold leading-tight" id="question-title">
          {question.question}
        </CardTitle>
        {question.description && (
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto" id="question-description">
            {question.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent
        className="space-y-8 px-8 pb-8"
        role="group"
        aria-labelledby="question-title"
        aria-describedby="question-description"
      >
        {renderQuestionInput()}
      </CardContent>

      <CardFooter className="flex justify-between items-center p-8 pt-0">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="flex items-center gap-2 bg-transparent"
          aria-label="Ir a la pregunta anterior"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          aria-label={isLastQuestion ? "Completar quiz y obtener resultados" : "Ir a la siguiente pregunta"}
        >
          {isLastQuestion ? "Ver Resultados" : "Siguiente"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
