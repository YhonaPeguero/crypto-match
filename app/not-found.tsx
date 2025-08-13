"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Search, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />

      <main className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Search className="h-16 w-16 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link href="/">
                <Button className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
