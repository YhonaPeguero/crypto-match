import { supabase, isSupabaseConfigured } from "./supabase"
import { getSessionId } from "./storage"
import type { AnalyticsEvent, AnalyticsEventType } from "@/types/analytics"

export const ANALYTICS_EVENTS = {
  QUIZ_STARTED: "quiz_started",
  QUESTION_ANSWERED: "question_answered",
  QUIZ_COMPLETED: "quiz_completed",
  RESULTS_VIEWED: "results_viewed",
  RECOMMENDATION_CLICKED: "recommendation_clicked",
  QUIZ_SHARED: "quiz_shared",
  QUIZ_RETAKEN: "quiz_retaken",
  PAGE_VIEW: "page_view",
} as const

export async function trackEvent(eventType: AnalyticsEventType, eventData?: Record<string, any>): Promise<void> {
  try {
    const sessionId = getSessionId()

    const event: AnalyticsEvent = {
      sessionId,
      eventType,
      eventData,
      timestamp: new Date(),
    }

    // Guardar en Supabase si está configurado
    if (isSupabaseConfigured && supabase) {
      await supabase.from("analytics_events").insert({
        session_id: event.sessionId,
        event_type: event.eventType,
        event_data: event.eventData,
      })
    }

    // Optional: Also send to Google Analytics if available
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventType, eventData)
    }
  } catch (error) {
    console.error("Failed to track event:", error)
  }
}

export function trackPageView(page: string): void {
  trackEvent("page_view", { page })
}
