export type MiniAppCategory = 'gratis' | 'paga-baja' | 'social' | 'defi' | 'nft'

export interface MiniApp {
  id: string
  name: string
  description: string
  url: string
  twitterHandle: string
  category: MiniAppCategory
  isGasless: boolean
  tags: string[]
  featured?: boolean
}

export const MINI_APPS: MiniApp[] = [
  // Gratis/Gasless
  {
    id: 'mint-fun',
    name: 'mint.fun',
    description: 'Free mints NFT en Base. Descubre y mintea NFTs gratuitos de forma sencilla.',
    url: 'https://mint.fun/base',
    twitterHandle: '@mintdotfun',
    category: 'gratis',
    isGasless: true,
    tags: ['nft', 'gratis', 'mint'],
    featured: true,
  },
  {
    id: 'zora',
    name: 'Zora',
    description: 'Mints de arte y NFT. Plataforma creativa para artistas y coleccionistas.',
    url: 'https://zora.co',
    twitterHandle: '@ourzora',
    category: 'gratis',
    isGasless: true,
    tags: ['nft', 'arte', 'creativo'],
    featured: true,
  },
  {
    id: 'basepaint',
    name: 'BasePaint',
    description: 'Arte colaborativo diario. Contribuye a obras de arte colectivas onchain.',
    url: 'https://basepaint.xyz',
    twitterHandle: '@basepaint_',
    category: 'gratis',
    isGasless: true,
    tags: ['arte', 'colaborativo', 'nft'],
  },
  {
    id: 'paragraph',
    name: 'Paragraph',
    description: 'Collect posts onchain. Guarda y colecciona contenido onchain de forma permanente.',
    url: 'https://paragraph.xyz',
    twitterHandle: '@paragraph_xyz',
    category: 'gratis',
    isGasless: true,
    tags: ['social', 'contenido', 'onchain'],
  },
  {
    id: 'sound-protocol',
    name: 'Sound Protocol',
    description: 'Mint música onchain. Descubre y colecciona música como NFT.',
    url: 'https://www.sound.xyz',
    twitterHandle: '@soundprotocol',
    category: 'gratis',
    isGasless: true,
    tags: ['música', 'nft', 'audio'],
  },
  {
    id: '0xppl',
    name: '0xPPL',
    description: 'Social onchain feed. Conecta con la comunidad crypto en Base.',
    url: 'https://0xppl.com',
    twitterHandle: '@0xppl',
    category: 'gratis',
    isGasless: true,
    tags: ['social', 'feed', 'comunidad'],
  },
  
  // Paga Baja - DeFi
  {
    id: 'aerodrome',
    name: 'Aerodrome Finance',
    description: 'Swaps y liquidity en Base. DEX principal con bajos fees y alta liquidez.',
    url: 'https://aerodrome.finance',
    twitterHandle: '@AerodromeFi',
    category: 'defi',
    isGasless: false,
    tags: ['swap', 'liquidity', 'dex'],
    featured: true,
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'Swaps simples y seguros. El DEX más popular, ahora en Base.',
    url: 'https://app.uniswap.org/swap?chain=base',
    twitterHandle: '@Uniswap',
    category: 'defi',
    isGasless: false,
    tags: ['swap', 'dex', 'trading'],
  },
  {
    id: 'aave',
    name: 'Aave',
    description: 'Lending y borrowing. Presta y pide prestado cripto con seguridad.',
    url: 'https://app.aave.com/?marketName=proto_base_v3',
    twitterHandle: '@aave',
    category: 'defi',
    isGasless: false,
    tags: ['lending', 'borrowing', 'yield'],
  },
  {
    id: 'compound',
    name: 'Compound',
    description: 'Lending protocol. Genera yield prestando tus criptos.',
    url: 'https://app.compound.finance',
    twitterHandle: '@compoundfinance',
    category: 'defi',
    isGasless: false,
    tags: ['lending', 'yield', 'defi'],
  },
  {
    id: 'moonwell',
    name: 'Moonwell',
    description: 'Yield y lending optimizado. Protocolo DeFi con altos rendimientos.',
    url: 'https://app.moonwell.fi',
    twitterHandle: '@MoonwellDeFi',
    category: 'defi',
    isGasless: false,
    tags: ['yield', 'lending', 'defi'],
  },
  {
    id: 'seamless',
    name: 'Seamless Protocol',
    description: 'Borrow y lend sin fricción. DeFi simplificado para todos.',
    url: 'https://www.seamless.fi',
    twitterHandle: '@SeamlessFi',
    category: 'defi',
    isGasless: false,
    tags: ['lending', 'borrowing', 'defi'],
  },
  {
    id: 'extra-finance',
    name: 'Extra Finance',
    description: 'Farming de yield. Optimiza tus rendimientos con estrategias avanzadas.',
    url: 'https://extra.fi',
    twitterHandle: '@extra_fi',
    category: 'defi',
    isGasless: false,
    tags: ['farming', 'yield', 'defi'],
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    description: 'Pools estables optimizados. Trading de stablecoins con bajas slippage.',
    url: 'https://curve.fi/#/base/pools',
    twitterHandle: '@CurveFinance',
    category: 'defi',
    isGasless: false,
    tags: ['stablecoins', 'pools', 'trading'],
  },
  
  // Social
  {
    id: 'warpcast',
    name: 'Warpcast',
    description: 'Social + frames onchain. La red social crypto con frames interactivos.',
    url: 'https://warpcast.com',
    twitterHandle: '@warpcast',
    category: 'social',
    isGasless: false,
    tags: ['social', 'farcaster', 'frames'],
    featured: true,
  },
]

export const CATEGORIES: Record<MiniAppCategory, { label: string; color: string; icon: string }> = {
  gratis: {
    label: 'Gratis',
    color: 'hsl(142 76% 36%)',
    icon: '🎁',
  },
  'paga-baja': {
    label: 'Paga Baja',
    color: 'hsl(38 92% 50%)',
    icon: '💰',
  },
  social: {
    label: 'Social',
    color: 'hsl(265 89% 66%)',
    icon: '👥',
  },
  defi: {
    label: 'DeFi',
    color: 'hsl(200 100% 60%)',
    icon: '💎',
  },
  nft: {
    label: 'NFT',
    color: 'hsl(340 75% 55%)',
    icon: '🖼️',
  },
}

export function getAppsByCategory(category: MiniAppCategory | 'all'): MiniApp[] {
  if (category === 'all') {
    return MINI_APPS
  }
  return MINI_APPS.filter((app) => app.category === category)
}

export function getFeaturedApps(): MiniApp[] {
  return MINI_APPS.filter((app) => app.featured)
}

export function searchApps(query: string): MiniApp[] {
  const lowerQuery = query.toLowerCase()
  return MINI_APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(lowerQuery) ||
      app.description.toLowerCase().includes(lowerQuery) ||
      app.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      app.twitterHandle.toLowerCase().includes(lowerQuery)
  )
}
