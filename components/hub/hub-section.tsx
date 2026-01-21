"use client"

import { useState, useMemo } from "react"
import { MiniAppCard } from "@/components/hub/mini-app-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Gift, Users, Coins, TrendingUp, Grid3x3 } from "lucide-react"
import { MINI_APPS, CATEGORIES, getAppsByCategory, searchApps, type MiniAppCategory } from "@/lib/hub-data"
import { addAppExplored } from "@/lib/hub-storage"
import { cn } from "@/lib/utils"

export function HubSection() {
  const [selectedCategory, setSelectedCategory] = useState<MiniAppCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter apps
  const filteredApps = useMemo(() => {
    let apps = selectedCategory === 'all' ? MINI_APPS : getAppsByCategory(selectedCategory)
    
    if (searchQuery.trim()) {
      apps = searchApps(searchQuery)
      // Apply category filter if there's a search query
      if (selectedCategory !== 'all') {
        apps = apps.filter((app) => app.category === selectedCategory)
      }
    }

    // Sort: featured first, then by name
    return apps.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.name.localeCompare(b.name)
    })
  }, [selectedCategory, searchQuery])

  const handleAppClick = (appId: string) => {
    addAppExplored(appId)
  }

  const categoryIcons: Record<MiniAppCategory | 'all', React.ReactNode> = {
    'all': <Grid3x3 className="w-4 h-4" />,
    'free': <Gift className="w-4 h-4" />,
    'social': <Users className="w-4 h-4" />,
    'defi': <Coins className="w-4 h-4" />,
    'trading': <TrendingUp className="w-4 h-4" />,
  }

  const categories: Array<{ id: MiniAppCategory | 'all'; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All', icon: categoryIcons['all'] },
    { id: 'trading', label: 'Trading', icon: categoryIcons['trading'] },
    { id: 'free', label: 'Free', icon: categoryIcons['free'] },
    { id: 'defi', label: 'DeFi', icon: categoryIcons['defi'] },
    { id: 'social', label: 'Social', icon: categoryIcons['social'] },
  ]

  return (
    <section className="space-y-8 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Explore <span className="text-blue-fire"> Apps in Base</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Boost your onchain activity with these hand-picked,onchain applications on Base.
          </p>
        </div>

      </div>

      {/* Search and Filters */}
      <div className="grid md:grid-cols-[1fr_auto] gap-4">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 bg-card/30 border-white/10 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            // Get color from CATEGORIES constants, implicit mapping via ID
            const color = category.id === 'all' 
              ? 'hsl(190 100% 50%)' // Default cyan for ALL
              : CATEGORIES[category.id as MiniAppCategory]?.color

            return (
            <Button
              key={category.id}
              variant="ghost" 
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "h-11 px-5 rounded-full text-sm font-semibold transition-all duration-300 border",
                isSelected 
                  ? "text-black font-bold shadow-[0_0_20px_-5px_var(--btn-color)] scale-105 border-transparent hover:scale-110 hover:shadow-[0_0_25px_-5px_var(--btn-color)]" // Active State
                  : "bg-black/20 text-muted-foreground border-white/5 hover:border-[var(--btn-color)] hover:text-[var(--btn-color)] hover:bg-[var(--btn-color)]/10" // Inactive State
              )}
              style={{
                background: isSelected ? `linear-gradient(135deg, ${color}, white)` : undefined, 
                '--btn-color': color 
              } as React.CSSProperties}
            >
              <span className={cn("mr-2 text-lg", isSelected ? "grayscale-0 text-black" : "grayscale opacity-70")}>
                {category.icon}
              </span>
              <span className={cn(isSelected && "text-black")}>{category.label}</span>
            </Button>
            )
          })}
        </div>
      </div>

      {/* Apps Grid */}
      {filteredApps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => (
            <div
              key={app.id}
              className="animate-in slide-in-from-bottom-4 fade-in duration-500"
              style={{ 
                animationDelay: `${Math.min(index * 30, 300)}ms`
              }}
            >
              <MiniAppCard app={app} onAppClick={handleAppClick} />
            </div>
          ))}
        </div>
      ) : (
        <Card className="bg-card/30 border-dashed border-white/10 text-center py-16 rounded-2xl">
          <CardContent className="space-y-4">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto" />
            <div className="space-y-2">
                <p className="text-xl font-bold">No apps found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters to discover more.
                </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom Disclaimer Teaser */}
      <div className="pt-4 flex justify-center">
         <p className="text-xs text-muted-foreground/60 italic">
           Always do your own research (DYOR) before interacting with onchain apps.
         </p>
      </div>
    </section>
  )
}
