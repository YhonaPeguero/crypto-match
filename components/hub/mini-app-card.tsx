/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MiniApp } from "@/lib/hub-data"
import { CATEGORIES } from "@/lib/hub-data"
import { useState } from "react"

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

  // Fallback for missing images - although Google Favicons is very reliable
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(app.url).hostname}&sz=128`

  return (
    <Card
      className={cn(
        "glass-card h-full flex flex-col transition-all duration-500 cursor-pointer group relative overflow-visible",
        "border border-white/5 hover:border-primary/50",
        "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]",
        "bg-gradient-to-b from-white/5 to-transparent",
        app.featured && "ring-1 ring-primary/20 bg-primary/5"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Featured Ribbon/Glow */}
      {app.featured && (
         <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
      )}

      <CardContent className="p-6 flex flex-col h-full space-y-4">
        {/* Header con Real Icon, nombre y Labels */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {/* Real App Icon */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center p-0.5 shrink-0 bg-black/40 border border-white/10",
                "shadow-[0_0_15px_-3px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]",
                "transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30"
              )}>
                <img 
                  src={faviconUrl} 
                  alt={`${app.name} icon`}
                  className="w-full h-full rounded-[10px] object-cover"
                  loading="lazy"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-foreground truncate group-hover:text-blue-fire transition-colors duration-300">
                  {app.name}
                </h3>
                
                {/* Twitter handle */}
                <button
                  onClick={handleTwitterClick}
                  className="flex items-center gap-1 text-xs text-muted-foreground/80 hover:text-primary transition-colors duration-200 mt-0.5"
                >
                  <Twitter className="w-3 h-3" />
                  <span className="truncate">{app.twitterHandle}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Labels */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {app.featured && (
              <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                Featured
              </Badge>
            )}
             {app.isGasless && (
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
                Gasless
              </Badge>
            )}
          </div>
        </div>

        {/* Descripción Clean */}
        <p className="text-sm text-muted-foreground/90 leading-relaxed flex-1 line-clamp-2group-hover:text-muted-foreground transition-colors">
          {app.description}
        </p>

        {/* Categories & Tags - Glass style */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
          <Badge
            variant="outline"
            className="text-xs h-6 px-2.5 backdrop-blur-md"
            style={{
              borderColor: `${categoryInfo.color}30`,
              color: categoryInfo.color,
              backgroundColor: `${categoryInfo.color}05`,
              boxShadow: `0 0 10px ${categoryInfo.color}15`
            }}
          >
            <span className="mr-1.5 opacity-80">{categoryInfo.icon}</span> {categoryInfo.label}
          </Badge>
          
          {app.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] h-6 px-2 bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/5"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        {/* CTA Button Premium */}
        <Button
          className="w-full mt-3 btn-premium-fire h-12 rounded-xl group/btn overflow-visible"
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-wide text-sm">
            Launch {app.name}
            <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </Button>
      </CardContent>
    </Card>
  )
}
