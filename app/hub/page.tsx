"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/layout/header"
import { MiniAppCard } from "@/components/hub/mini-app-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Sparkles, TrendingUp, Zap, Gift, DollarSign, Users, Coins, Image as ImageIcon, Grid3x3 } from "lucide-react"
import { MINI_APPS, CATEGORIES, getAppsByCategory, searchApps, type MiniAppCategory } from "@/lib/hub-data"
import { getAppsExploredCount, getOnchainActivityScore, addAppExplored } from "@/lib/hub-storage"
import { cn } from "@/lib/utils"

export default function HubPage() {
  const [selectedCategory, setSelectedCategory] = useState<MiniAppCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [appsExplored, setAppsExplored] = useState(0)
  const [activityScore, setActivityScore] = useState(0)

  // Load stats on mount
  useEffect(() => {
    setAppsExplored(getAppsExploredCount())
    setActivityScore(Math.round(getOnchainActivityScore()))
  }, [])

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
    setAppsExplored(getAppsExploredCount())
    setActivityScore(Math.round(getOnchainActivityScore()))
  }

  const categoryIcons: Record<MiniAppCategory | 'all', React.ReactNode> = {
    'all': <Grid3x3 className="w-4 h-4" />,
    'gratis': <Gift className="w-4 h-4" />,
    'paga-baja': <DollarSign className="w-4 h-4" />,
    'social': <Users className="w-4 h-4" />,
    'defi': <Coins className="w-4 h-4" />,
    'nft': <ImageIcon className="w-4 h-4" />,
  }

  const categories: Array<{ id: MiniAppCategory | 'all'; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'All', icon: categoryIcons['all'] },
    { id: 'gratis', label: 'Free', icon: categoryIcons['gratis'] },
    { id: 'paga-baja', label: 'Low Cost', icon: categoryIcons['paga-baja'] },
    { id: 'social', label: 'Social', icon: categoryIcons['social'] },
    { id: 'defi', label: 'DeFi', icon: categoryIcons['defi'] },
    { id: 'nft', label: 'NFT', icon: categoryIcons['nft'] },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Ambience - Improved colors */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-[#0052FF]/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#0066FF]/5 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: "2s"}}></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section - Reduced text size */}
          <div className="text-center space-y-5 animate-in slide-in-from-bottom-4 duration-500 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/30 text-[#0052FF] text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Base Onchain Hub</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Explore Verified Apps on{" "}
              <span className="text-[#0052FF]">
                Base
              </span>
            </h1>
          </div>

          {/* Search and Filters - Improved */}
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search apps by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 text-sm bg-card/50 border-white/10 focus:border-[#0052FF]/50 focus:ring-[#0052FF]/20 transition-all duration-200"
              />
            </div>

            {/* Filters - Improved with icons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "neon" : "ghost-tech"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "h-9 px-4 text-sm transition-all duration-200",
                    selectedCategory === category.id 
                      ? "bg-[#0052FF] text-white border-[#0052FF] shadow-[0_0_15px_hsla(0,82%,51%,0.3)] scale-105" 
                      : "hover:border-[#0052FF]/30 hover:bg-[#0052FF]/5"
                  )}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Apps Grid - Improved animations */}
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredApps.map((app, index) => (
                <div
                  key={app.id}
                  className="animate-in slide-in-from-bottom-3 fade-in"
                  style={{ 
                    animationDelay: `${Math.min(index * 30, 300)}ms`,
                    animationDuration: '400ms'
                  }}
                >
                  <MiniAppCard app={app} onAppClick={handleAppClick} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="glass-panel text-center py-12 border-dashed">
              <CardContent>
                <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground mb-2">No apps found</p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
              </CardContent>
            </Card>
          )}

          {/* Disclaimer - Improved */}
          <Card className="glass-panel border-yellow-500/20 bg-yellow-500/5">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> These apps are verified but always do your own research (DYOR). 
                BaseMatch is not a financial advisor. Interact with apps at your own risk.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
