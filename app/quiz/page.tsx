"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { ProgressBar } from "@/components/quiz/progress-bar"
import { QuizCard } from "@/components/quiz/quiz-card"
import { QUIZ_QUESTIONS } from "@/lib/quiz-data"
import { calculateRecommendations, validateResponse } from "@/lib/quiz-engine"
import { saveQuizSession, loadQuizSession, getSessionId } from "@/lib/storage"
import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics"
import type { QuizResponse, QuizSession } from "@/types/quiz"

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize quiz session
  useEffect(() => {
    const existingSession = loadQuizSession()

    if (existingSession && !existingSession.completed) {
      setCurrentStep(existingSession.currentStep)
      setResponses(existingSession.responses)
    } else {
      // Start new session
      trackEvent(ANALYTICS_EVENTS.QUIZ_STARTED)
    }

    setIsLoading(false)
  }, [])

  // Save session on changes
  useEffect(() => {
    if (!isLoading) {
      const session: QuizSession = {
        sessionId: getSessionId(),
        responses,
        currentStep,
        startTime: new Date(),
        completed: false,
      }
      saveQuizSession(session)
    }
  }, [responses, currentStep, isLoading])

  const currentQuestion = QUIZ_QUESTIONS[currentStep]
  const currentResponse = responses.find((r) => r.questionId === currentQuestion?.id)

  const handleAnswer = (value: string | number) => {
    if (!currentQuestion) return

    const newResponse: QuizResponse = {
      questionId: currentQuestion.id,
      value,
      timestamp: new Date(),
    }

    setResponses((prev) => {
      const filtered = prev.filter((r) => r.questionId !== currentQuestion.id)
      return [...filtered, newResponse]
    })

    trackEvent(ANALYTICS_EVENTS.QUESTION_ANSWERED, {
      question_id: currentQuestion.id,
      answer: value,
      question_number: currentStep + 1,
    })
  }

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Quiz completed - calculate results and redirect
      const recommendations = calculateRecommendations(responses)

      trackEvent(ANALYTICS_EVENTS.QUIZ_COMPLETED, {
        total_questions: QUIZ_QUESTIONS.length,
        recommendations: recommendations.map((r) => r.area.id),
      })

      // Store results in sessionStorage for results page
      sessionStorage.setItem(
        "quiz-results",
        JSON.stringify({
          responses,
          recommendations,
        }),
      )

      router.push("/results")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const canGoNext = Boolean(currentResponse && validateResponse(currentQuestion?.id, currentResponse.value))
  const canGoPrevious = currentStep > 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Quiz no encontrado</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProgressBar currentStep={currentStep + 1} totalSteps={QUIZ_QUESTIONS.length} />

          <div role="main" aria-live="polite" aria-label={`Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`}>
            <QuizCard
              question={currentQuestion}
              value={currentResponse?.value || null}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={canGoNext}
              canGoPrevious={canGoPrevious}
              isLastQuestion={currentStep === QUIZ_QUESTIONS.length - 1}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
