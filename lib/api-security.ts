// Middleware de seguridad para API routes

import { NextRequest, NextResponse } from 'next/server'
import { 
  checkRateLimit, 
  isValidEthereumAddress, 
  validatePaymentAmount,
  logSecurityEvent,
  sanitizeString 
} from './security'

// Headers de seguridad
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https: wss:;",
}

// Validación de requests
export function validateRequest(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')
  const origin = request.headers.get('origin')
  
  // Validar User-Agent
  if (!userAgent || userAgent.length < 10) {
    logSecurityEvent('INVALID_USER_AGENT', { userAgent })
    return false
  }
  
  // Validar Origin (si es necesario)
  if (origin && !origin.includes('cryptomatch.vercel.app') && !origin.includes('localhost')) {
    logSecurityEvent('INVALID_ORIGIN', { origin })
    return false
  }
  
  return true
}

// Rate limiting por IP
export function checkIPRateLimit(request: NextRequest, maxRequests: number = 100, windowMs: number = 60000) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  return checkRateLimit(`ip_${ip}`, maxRequests, windowMs)
}

// Validación de datos de pago
export function validatePaymentRequest(data: any) {
  if (!data || typeof data !== 'object') {
    logSecurityEvent('INVALID_PAYMENT_DATA', { data })
    return false
  }
  
  const { mentorId, amount, walletAddress } = data
  
  // Validar mentor ID
  if (!mentorId || typeof mentorId !== 'string') {
    logSecurityEvent('INVALID_MENTOR_ID', { mentorId })
    return false
  }
  
  // Validar monto
  if (!validatePaymentAmount(amount)) {
    logSecurityEvent('INVALID_PAYMENT_AMOUNT', { amount })
    return false
  }
  
  // Validar dirección de wallet
  if (walletAddress && !isValidEthereumAddress(walletAddress)) {
    logSecurityEvent('INVALID_WALLET_ADDRESS', { walletAddress })
    return false
  }
  
  return true
}

// Middleware de seguridad
export function securityMiddleware(request: NextRequest) {
  // Agregar headers de seguridad
  const response = NextResponse.next()
  
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Validar request
  if (!validateRequest(request)) {
    return new NextResponse('Request inválido', { status: 400 })
  }
  
  // Rate limiting por IP
  if (!checkIPRateLimit(request)) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED_IP', { 
      ip: request.ip || request.headers.get('x-forwarded-for'),
      userAgent: request.headers.get('user-agent')
    })
    return new NextResponse('Demasiadas requests', { status: 429 })
  }
  
  return response
}

// Sanitización de respuesta
export function sanitizeResponse(data: any) {
  if (typeof data === 'string') {
    return sanitizeString(data)
  }
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeResponse(item))
  }
  
  if (data && typeof data === 'object') {
    const sanitized: any = {}
    for (const [key, value] of Object.entries(data)) {
      sanitized[sanitizeString(key)] = sanitizeResponse(value)
    }
    return sanitized
  }
  
  return data
}

// Validación de sesión
export function validateSession(sessionData: any) {
  if (!sessionData || typeof sessionData !== 'object') return false
  
  const { sessionId, timestamp, signature } = sessionData
  
  if (!sessionId || typeof sessionId !== 'string') return false
  if (!timestamp || typeof timestamp !== 'number') return false
  
  // Verificar que la sesión no sea muy antigua (24 horas)
  const sessionAge = Date.now() - timestamp
  if (sessionAge > 24 * 60 * 60 * 1000) return false
  
  // Si hay signature, validarla
  if (signature && !/^0x[a-fA-F0-9]{130}$/.test(signature)) return false
  
  return true
}

// Logging de eventos de API
export function logAPIEvent(event: string, request: NextRequest, details: any = {}) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  logSecurityEvent(event, {
    ip,
    userAgent,
    url: request.url,
    method: request.method,
    ...details
  })
}
