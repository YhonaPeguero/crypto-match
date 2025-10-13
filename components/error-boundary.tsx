"use client"

import { Component, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Bug } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
    
    // Log additional context for debugging
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 Error Details')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Component Stack:', errorInfo.componentStack)
      console.groupEnd()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      const isFarcasterError = this.state.error?.message?.includes('farcaster') || 
                              this.state.error?.message?.includes('miniapp') ||
                              this.state.error?.message?.includes('sdk')

      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500" />
              </div>
              <CardTitle>
                {isFarcasterError ? 'Error de Mini App' : 'Algo salió mal'}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {isFarcasterError 
                  ? 'Hubo un problema con la integración de Farcaster. Esto puede ser temporal.'
                  : 'Encontramos un error inesperado. Por favor intenta refrescar la página.'
                }
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-muted/50 p-3 rounded-lg">
                  <summary className="cursor-pointer text-sm font-medium flex items-center gap-2">
                    <Bug className="h-4 w-4" />
                    Detalles del error (desarrollo)
                  </summary>
                  <pre className="text-xs mt-2 overflow-auto text-red-600">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refrescar Página
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/")}>
                  Ir al Inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
