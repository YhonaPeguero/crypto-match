// Storage utilities para gamificación del Hub

const STORAGE_KEY = 'cryptomatch-hub-stats'

export interface HubStats {
  appsExplored: string[] // IDs de apps visitadas
  lastUpdated: string
}

export function getHubStats(): HubStats {
  if (typeof window === 'undefined') {
    return { appsExplored: [], lastUpdated: new Date().toISOString() }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading hub stats:', error)
  }

  return { appsExplored: [], lastUpdated: new Date().toISOString() }
}

export function addAppExplored(appId: string): void {
  if (typeof window === 'undefined') return

  try {
    const stats = getHubStats()
    if (!stats.appsExplored.includes(appId)) {
      stats.appsExplored.push(appId)
      stats.lastUpdated = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
    }
  } catch (error) {
    console.error('Error saving hub stats:', error)
  }
}

export function getAppsExploredCount(): number {
  return getHubStats().appsExplored.length
}

export function getOnchainActivityScore(): number {
  // Simula actividad onchain basada en apps exploradas
  // Cada app explorada = ~2-3 transacciones sugeridas
  const appsCount = getAppsExploredCount()
  return appsCount * 2.5 // Promedio de 2.5 txns por app
}

export function resetHubStats(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error resetting hub stats:', error)
  }
}
