import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Supabase deshabilitado completamente para evitar errores de conexión
// El cliente nunca se crea, evitando intentos de conexión que causan errores
export const isSupabaseConfigured = false

export const supabase: SupabaseClient | null = null
