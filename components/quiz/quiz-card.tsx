"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
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
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Decorative Glow Mejorado */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-2xl opacity-40 animate-pulse-slow"></div>
      
      <Card className="glass-panel border-border shadow-2xl relative backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 dark:border-white/10">
        <CardHeader className="text-center space-y-8 pb-10 md:pb-12 pt-10 md:pt-12 px-6 sm:px-12">
            {/* Icono animado */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-4 shadow-lg border border-primary/20 animate-pulse-slow">
                <Zap className="w-8 h-8 text-secondary animate-pulse" />
            </div>
            
          <CardTitle 
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground drop-shadow-sm" 
            id="question-title"
          >
            {question.question}
          </CardTitle>
          
          {question.description && (
            <CardDescription 
              className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed" 
              id="question-description"
            >
              {question.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent
          className="space-y-10 px-6 sm:px-12 pb-10"
          role="group"
          aria-labelledby="question-title"
          aria-describedby="question-description"
        >
          {renderQuestionInput()}
        </CardContent>

        <CardFooter className="flex justify-between items-center px-6 sm:px-12 pb-10 pt-4 border-t border-border/60 dark:border-white/5">
          <Button
            variant="ghost-tech"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2 h-11 px-6 transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Go to previous question"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <Button
            onClick={onNext}
            disabled={!canGoNext}
            variant="neon"
            size="lg"
            className="flex items-center gap-2 min-w-[160px] h-12 px-8 text-base font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isLastQuestion ? "Complete quiz and view results" : "Go to next question"}
          >
            {isLastQuestion ? "View Results" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
