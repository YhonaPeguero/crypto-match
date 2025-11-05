import { supabase, isSupabaseConfigured } from "./supabase"
import { getSessionId } from "./storage"
import type { AnalyticsEvent, AnalyticsEventType } from "@/types/analytics"
import { ANALYTICS_EVENTS } from "@/types/analytics"

// Re-exportar ANALYTICS_EVENTS para compatibilidad
export { ANALYTICS_EVENTS }

// Sanitiza eventData para evitar envío de PII/secretos y limitar tamaño
function sanitizeEventData(raw: Record<string, any> | undefined): Record<string, any> | undefined {
  if (!raw || typeof raw !== "object") return undefined

  const forbiddenKeys = [
    "key",
    "token",
    "secret",
    "password",
    "jwt",
    "authorization",
    "service_role",
  ]

  const sanitized: Record<string, any> = {}
  for (const [k, v] of Object.entries(raw)) {
    const lower = k.toLowerCase()
    if (forbiddenKeys.some((fk) => lower.includes(fk))) continue
    try {
      // Asegurar datos serializables y pequeños
      const val = typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v
      sanitized[k] = val
    } catch {
      // Omitir valores no serializables
    }
  }

  // Limitar tamaño total a ~2KB
  const json = JSON.stringify(sanitized)
  if (json.length > 2048) {
    return { _truncated: true }
  }
  return sanitized
}

export async function trackEvent(eventType: AnalyticsEventType, eventData?: Record<string, any>): Promise<void> {
  try {
    const sessionId = getSessionId()

    const event: AnalyticsEvent = {
      sessionId,
      eventType,
      eventData: sanitizeEventData(eventData),
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
