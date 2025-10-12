// Utilidades de seguridad para wallet connections y pagos crypto

// Validaciones de direcciones Ethereum
export const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/
export const ETH_SIGNATURE_REGEX = /^0x[a-fA-F0-9]{130}$/

// Validaciones de seguridad
export function isValidEthereumAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false
  return ETH_ADDRESS_REGEX.test(address)
}

export function isValidEthereumSignature(signature: string): boolean {
  if (!signature || typeof signature !== 'string') return false
  return ETH_SIGNATURE_REGEX.test(signature)
}

// Sanitización de datos
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/[<>]/g, '') // Remover caracteres HTML peligrosos
    .replace(/javascript:/gi, '') // Remover javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remover event handlers
    .trim()
    .slice(0, 1000) // Limitar longitud
}

export function sanitizeNumber(input: any): number {
  const num = Number(input)
  if (isNaN(num) || !isFinite(num)) return 0
  return Math.max(0, Math.min(num, 999999999)) // Limitar rango
}

// Rate limiting simple
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  key: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000 // 1 minuto
): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(key)
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }
  
  if (entry.count >= maxRequests) {
    return false
  }
  
  entry.count++
  return true
}

// Validaciones de transacciones
export function validatePaymentAmount(amount: string | number): boolean {
  const num = Number(amount)
  if (isNaN(num) || !isFinite(num)) return false
  if (num <= 0) return false
  if (num > 10000) return false // Límite máximo de $10,000 USDC
  return true
}

export function validateMentorId(mentorId: string): boolean {
  if (!mentorId || typeof mentorId !== 'string') return false
  if (!/^mentor-[a-z]+-\d{3}$/.test(mentorId)) return false
  return true
}

// Validaciones de provider
export function isValidProvider(provider: any): boolean {
  if (!provider) return false
  if (typeof provider.request !== 'function') return false
  if (typeof provider.isConnected !== 'function') return false
  return true
}

// Sanitización de URLs
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

export function sanitizeUrl(url: string): string {
  if (!isValidUrl(url)) return ''
  return url
}

// Validaciones de datos de mentor
export function validateMentorData(mentor: any): boolean {
  if (!mentor || typeof mentor !== 'object') return false
  
  const requiredFields = ['id', 'name', 'strategy', 'priceUSDC']
  for (const field of requiredFields) {
    if (!mentor[field]) return false
  }
  
  if (!isValidEthereumAddress(mentor.id)) return false
  if (!validatePaymentAmount(mentor.priceUSDC)) return false
  
  return true
}

// Prevención de XSS
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') return ''
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  
  return text.replace(/[&<>"']/g, (m) => map[m])
}

// Validación de sesión
export function isValidSession(sessionData: any): boolean {
  if (!sessionData || typeof sessionData !== 'object') return false
  
  const requiredFields = ['sessionId', 'timestamp']
  for (const field of requiredFields) {
    if (!sessionData[field]) return false
  }
  
  // Verificar que la sesión no sea muy antigua (24 horas)
  const sessionAge = Date.now() - sessionData.timestamp
  if (sessionAge > 24 * 60 * 60 * 1000) return false
  
  return true
}

// Logging de seguridad
export function logSecurityEvent(event: string, details: any = {}) {
  console.warn(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    ...details
  })
}

// Validación de input de usuario
export function validateUserInput(input: any, type: 'string' | 'number' | 'email'): boolean {
  if (input === null || input === undefined) return false
  
  switch (type) {
    case 'string':
      return typeof input === 'string' && input.length > 0 && input.length < 1000
    case 'number':
      const num = Number(input)
      return !isNaN(num) && isFinite(num) && num >= 0
    case 'email':
      if (typeof input !== 'string') return false
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
    default:
      return false
  }
}
