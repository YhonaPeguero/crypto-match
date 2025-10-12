import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware deshabilitado para evitar modificar URL
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Middleware deshabilitado
     */
    // '/',
  ],
}
