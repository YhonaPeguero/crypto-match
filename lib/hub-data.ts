export type MiniAppCategory = 'free' | 'social' | 'defi' | 'trading'

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
    description: 'Free NFT mints on Base. Discover and mint free NFTs easily.',
    url: 'https://mint.fun/base',
    twitterHandle: '@mintdotfun',
    category: 'free',
    isGasless: true,
    tags: ['nft', 'free', 'mint'],
    featured: true,
  },
  {
    id: 'zora',
    name: 'Zora',
    description: 'Art and NFT mints. A creative platform for artists and collectors.',
    url: 'https://zora.co',
    twitterHandle: '@ourzora',
    category: 'free',
    isGasless: true,
    tags: ['nft', 'art', 'creative'],
    featured: true,
  },
  {
    id: 'basepaint',
    name: 'BasePaint',
    description: 'Daily collaborative art. Contribute to collective onchain artworks.',
    url: 'https://basepaint.xyz',
    twitterHandle: '@basepaint_',
    category: 'free',
    isGasless: true,
    tags: ['art', 'collaborative', 'nft'],
  },
  {
    id: 'paragraph',
    name: 'Paragraph',
    description: 'Collect posts onchain. Permanently save and collect onchain content.',
    url: 'https://paragraph.xyz',
    twitterHandle: '@paragraph_xyz',
    category: 'free',
    isGasless: true,
    tags: ['social', 'content', 'onchain'],
  },
  {
    id: 'sound-protocol',
    name: 'Sound Protocol',
    description: 'Mint music onchain. Discover and collect music as NFTs.',
    url: 'https://www.sound.xyz',
    twitterHandle: '@soundprotocol',
    category: 'free',
    isGasless: true,
    tags: ['music', 'nft', 'audio'],
  },
  {
    id: '0xppl',
    name: '0xPPL',
    description: 'Onchain social feed. Connect with the Base crypto community.',
    url: 'https://0xppl.com',
    twitterHandle: '@0xppl',
    category: 'free',
    isGasless: true,
    tags: ['social', 'feed', 'community'],
  },
  
  // Paga Baja - DeFi
  {
    id: 'aerodrome',
    name: 'Aerodrome Finance',
    description: 'Swaps and liquidity on Base. Leading DEX with low fees and high liquidity.',
    url: 'https://aerodrome.finance',
    twitterHandle: '@AerodromeFi',
    category: 'trading',
    isGasless: false,
    tags: ['swap', 'liquidity', 'dex'],
    featured: true,
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'Simple and secure swaps. The most popular DEX, now on Base.',
    url: 'https://app.uniswap.org/swap?chain=base',
    twitterHandle: '@Uniswap',
    category: 'trading',
    isGasless: false,
    tags: ['swap', 'dex', 'trading'],
  },
  {
    id: 'aave',
    name: 'Aave',
    description: 'Lending and borrowing. Lend and borrow crypto securely.',
    url: 'https://app.aave.com/?marketName=proto_base_v3',
    twitterHandle: '@aave',
    category: 'defi',
    isGasless: false,
    tags: ['lending', 'borrowing', 'yield'],
  },
  {
    id: 'compound',
    name: 'Compound',
    description: 'Lending protocol. Generate yield by lending your crypto assets.',
    url: 'https://app.compound.finance',
    twitterHandle: '@compoundfinance',
    category: 'defi',
    isGasless: false,
    tags: ['lending', 'yield', 'defi'],
  },
  {
    id: 'moonwell',
    name: 'Moonwell',
    description: 'Optimized yield and lending. DeFi protocol with attractive returns.',
    url: 'https://app.moonwell.fi',
    twitterHandle: '@MoonwellDeFi',
    category: 'defi',
    isGasless: false,
    tags: ['yield', 'lending', 'defi'],
  },
  {
    id: 'seamless',
    name: 'Seamless Protocol',
    description: 'Frictionless borrowing and lending. DeFi simplified for everyone.',
    url: 'https://www.seamless.fi',
    twitterHandle: '@SeamlessFi',
    category: 'defi',
    isGasless: false,
    tags: ['lending', 'borrowing', 'defi'],
  },
  {
    id: 'extra-finance',
    name: 'Extra Finance',
    description: 'Yield farming. Optimize returns with advanced strategies.',
    url: 'https://extra.fi',
    twitterHandle: '@extra_fi',
    category: 'defi',
    isGasless: false,
    tags: ['farming', 'yield', 'defi'],
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    description: 'Optimized stable pools. Trade stablecoins with low slippage.',
    url: 'https://curve.fi/#/base/pools',
    twitterHandle: '@CurveFinance',
    category: 'trading',
    isGasless: false,
    tags: ['stablecoins', 'pools', 'trading'],
  },
  
  // Social
  {
    id: 'warpcast',
    name: 'Warpcast',
    description: 'Social + onchain frames. The crypto social network with interactive frames.',
    url: 'https://warpcast.com',
    twitterHandle: '@warpcast',
    category: 'social',
    isGasless: false,
    tags: ['social', 'farcaster', 'frames'],
    featured: true,
  },
]

export const CATEGORIES: Record<MiniAppCategory, { label: string; color: string; icon: string }> = {
  free: {
    label: 'Free',
    color: 'hsl(142 76% 36%)',
    icon: '🎁',
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
  trading: {
    label: 'Trading',
    color: 'hsl(217 100% 60%)',
    icon: '📈',
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
