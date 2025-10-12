export interface Mentor {
  id: string
  name: string
  strategy: string
  strategyId: string
  description: string
  experience: string
  rating: number
  reviews: number
  priceUSDC: number
  duration: string
  specializations: string[]
  avatar: string
  verified: boolean
}

export const MENTORS: Mentor[] = [
  {
    id: "mentor-defi-001",
    name: "Alex Chen",
    strategy: "DeFi Expert",
    strategyId: "defi",
    description: "Especialista en yield farming y protocolos DeFi. He ayudado a más de 500 personas a generar ingresos pasivos seguros.",
    experience: "5+ años en DeFi",
    rating: 4.9,
    reviews: 127,
    priceUSDC: 25,
    duration: "30 min",
    specializations: ["Yield Farming", "Liquidity Pools", "Staking", "Risk Management"],
    avatar: "AC",
    verified: true
  },
  {
    id: "mentor-airdrops-001",
    name: "Sofia Rodriguez",
    strategy: "Airdrop Hunter",
    strategyId: "airdrops",
    description: "Experta en airdrops y tokens gratuitos. He ganado más de $50K en airdrops y enseño las mejores estrategias.",
    experience: "3+ años cazando airdrops",
    rating: 4.8,
    reviews: 89,
    priceUSDC: 20,
    duration: "25 min",
    specializations: ["Airdrop Farming", "Early Adoption", "Community Building", "Token Analysis"],
    avatar: "SR",
    verified: true
  },
  {
    id: "mentor-spot-001",
    name: "Michael Johnson",
    strategy: "Spot Trading Pro",
    strategyId: "spotHolding",
    description: "Estratega de inversión a largo plazo. Especialista en DCA y análisis fundamental para principiantes.",
    experience: "8+ años en crypto",
    rating: 4.9,
    reviews: 203,
    priceUSDC: 30,
    duration: "45 min",
    specializations: ["Dollar Cost Averaging", "Fundamental Analysis", "Portfolio Management", "Risk Assessment"],
    avatar: "MJ",
    verified: true
  },
  {
    id: "mentor-futures-001",
    name: "Elena Volkov",
    strategy: "Futures Specialist",
    strategyId: "futuresTrading",
    description: "Trader profesional con 6 años de experiencia en derivados. Enfoque en gestión de riesgo y psicología del trading.",
    experience: "6+ años trading",
    rating: 4.7,
    reviews: 156,
    priceUSDC: 50,
    duration: "60 min",
    specializations: ["Technical Analysis", "Risk Management", "Psychology", "Derivatives"],
    avatar: "EV",
    verified: true
  }
]

export function getMentorsByStrategy(strategyId: string): Mentor[] {
  return MENTORS.filter(mentor => mentor.strategyId === strategyId)
}

export function getTopMentors(limit: number = 3): Mentor[] {
  return MENTORS
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export function getMentorById(id: string): Mentor | undefined {
  return MENTORS.find(mentor => mentor.id === id)
}
