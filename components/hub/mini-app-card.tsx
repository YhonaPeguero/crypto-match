"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MiniApp } from "@/lib/hub-data"
import { CATEGORIES } from "@/lib/hub-data"
import { useState } from "react"
import Link from "next/link"

interface MiniAppCardProps {
  app: MiniApp
  onAppClick?: (appId: string) => void
}

export function MiniAppCard({ app, onAppClick }: MiniAppCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const categoryInfo = CATEGORIES[app.category]

  const handleClick = () => {
    if (onAppClick) {
      onAppClick(app.id)
    }
    window.open(app.url, '_blank', 'noopener,noreferrer')
  }

  const handleTwitterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(`https://twitter.com/${app.twitterHandle.replace('@', '')}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card
      className={cn(
        "glass-card h-full flex flex-col transition-all duration-500 cursor-pointer group",
        "hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-primary/40",
        app.featured && "border-primary/30 bg-primary/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <CardContent className="p-6 flex flex-col h-full space-y-4">
        {/* Header con logo, nombre y badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {/* Logo placeholder */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0",
                "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20",
                "group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
              )}>
                {app.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors duration-200">
                  {app.name}
                </h3>
                
                {/* Twitter handle */}
                <button
                  onClick={handleTwitterClick}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mt-1"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span className="truncate">{app.twitterHandle}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {app.isGasless && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs font-semibold">
                Gasless
              </Badge>
            )}
            {app.featured && (
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider">
                ⭐ Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Descripción */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
          {app.description}
        </p>

        {/* Tags y categoría */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: `${categoryInfo.color}40`,
              color: categoryInfo.color,
              backgroundColor: `${categoryInfo.color}10`,
            }}
          >
            {categoryInfo.icon} {categoryInfo.label}
          </Badge>
          
          {app.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-white/5 hover:bg-white/10"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          variant="blue-fire"
          className="w-full mt-2 group/btn h-11 rounded-xl"
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
        >
          Open App
          <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardContent>
    </Card>
  )
}
