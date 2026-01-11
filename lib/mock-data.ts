import type { Token, PriceUpdate } from "@/types/token"

const tokenNames = [
  { name: "川普", nameAlt: "四川普通话", symbol: "Trump", handle: "@angle754445", followers: 2 },
  { name: "Jambu", nameAlt: "Jambu", symbol: "Jambu", handle: "@gabomclv", followers: 227 },
  { name: "WKND", nameAlt: "WKND", symbol: "WKND", handle: "@thewknd", followers: 107000 },
  { name: "Apple", nameAlt: "Apple", symbol: "Apple", handle: "@tim_cook", followers: 14500000 },
  { name: "Tesla AI", nameAlt: "Tesla AI", symbol: "Tesla", handle: "", followers: 0 },
  { name: "SpaceX", nameAlt: "SpaceX", symbol: "SpaceX", handle: "@SpaceX", followers: 40600000 },
  { name: "Google AI", nameAlt: "Google AI Coin", symbol: "Google", handle: "@Google", followers: 31600000 },
  { name: "Miny", nameAlt: "JustAGoldMine", symbol: "Miny", handle: "@JustAGoldMine", followers: 22 },
  { name: "PP", nameAlt: "Purple Pika", symbol: "PP", handle: "@purplepikaoff", followers: 9 },
]

const sources: Token["source"][] = ["pumpfun", "raydium", "jupiter", "meteora"]
const destinations: Token["destination"][] = ["raydium", "jupiter", "meteora"]

const round2 = (n: number) => Math.round(n * 100) / 100

function randomIntDelta(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateContractAddress(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"
  let result = ""
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function generateWalletAddress(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789"
  let result = ""
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function generateToken(index: number, category: "new-pairs" | "final-stretch" | "migrated"): Token {
  const tokenInfo = tokenNames[index % tokenNames.length]
  const source = sources[Math.floor(Math.random() * sources.length)]

  let isMigrated = false
  let migrationProgress: number | undefined
  let destination: Token["destination"] | undefined
  let age: number

  if (category === "new-pairs") {
    age = Math.floor(randomInRange(0, 300)) // 0-5 minutes for new pairs
  } else if (category === "final-stretch") {
    age = Math.floor(randomInRange(300, 7200)) // 5 min to 2 hours
    migrationProgress = Math.floor(randomInRange(70, 99))
    destination = destinations[Math.floor(Math.random() * destinations.length)]
  } else {
    age = Math.floor(randomInRange(1, 120)) // 1-120 seconds for migrated (showing as seconds)
    isMigrated = true
    destination = destinations[Math.floor(Math.random() * destinations.length)]
  }

  const marketCap = category === "migrated" ? randomInRange(50000, 2000000) : randomInRange(3000, 50000)
  const price = marketCap / randomInRange(100000000, 1000000000)

  return {
    id: `token-${category}-${index}`,
    name: tokenInfo.name,
    nameAlt: tokenInfo.nameAlt,
    symbol: tokenInfo.symbol,
    contractAddress: generateContractAddress(),
    imageUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${tokenInfo.symbol}`,
    price,
    priceChange24h: randomInRange(-80, 150),
    priceChange1h: randomInRange(-50, 100),
    priceChange5m: randomInRange(-20, 50),
    volume24h: randomInRange(50, 50000),
    marketCap,
    liquidity: marketCap * randomInRange(0.1, 0.4),
    holders: Math.floor(randomInRange(50, 5000)),
    txns24h: Math.floor(randomInRange(2, 400)),
    buys24h: Math.floor(randomInRange(1, 200)),
    sells24h: Math.floor(randomInRange(1, 200)),
    proTraders: Math.floor(randomInRange(0, 100)),
    KOLS: Math.floor(randomInRange(0, 50)),
    DevMigrations: Math.floor(randomInRange(0, 10)),
    MigrationsCreated: Math.floor(randomInRange(0, 20)),
    age,
    source,
    destination,
    migrationProgress,
    isMigrated,
    createdAt: new Date(Date.now() - age * 1000),
    devWallet: generateWalletAddress(),
    creatorHandle: tokenInfo.handle,
    creatorFollowers: tokenInfo.followers,
    fee: Math.random() > 0.5 ? 1 : 0,
    txCount: Math.floor(randomInRange(2, 400)),
    holdRatio: `${Math.floor(randomInRange(0, 3))}/${Math.floor(randomInRange(1, 20))}`,
    insiderPercent: Math.floor(randomInRange(0, 10)),
    bundlePercent: Math.floor(randomInRange(0, 10)),
    top10Percent: Math.floor(randomInRange(0, 100)),
    devPercent: Math.floor(randomInRange(0, 80)),
    snipersCount: Math.floor(randomInRange(0, 5)),
    volumePercent: Math.floor(randomInRange(0, 100)),
    topHolders: Array.from({ length: 5 }, (_, i) => ({
      address: generateWalletAddress(),
      percentage: randomInRange(1, i === 0 ? 15 : 5),
      isCreator: i === 0,
    })),
    socialLinks: {
      twitter: Math.random() > 0.3 ? `https://twitter.com/${tokenInfo.symbol.toLowerCase()}` : undefined,
      telegram: Math.random() > 0.4 ? `https://t.me/${tokenInfo.symbol.toLowerCase()}` : undefined,
      website: Math.random() > 0.5 ? `https://${tokenInfo.symbol.toLowerCase()}.io` : undefined,
    },
  }
}

export function generateMockTokens(): {
  newPairs: Token[]
  finalStretch: Token[]
  migrated: Token[]
} {
  return {
    newPairs: Array.from({ length: 5 }, (_, i) => generateToken(i, "new-pairs")),
    finalStretch: Array.from({ length: 5 }, (_, i) => generateToken(i + 5, "final-stretch")),
    migrated: Array.from({ length: 6 }, (_, i) => generateToken(i, "migrated")),
  }
}

export function generatePriceUpdate(tokens: Token[]): PriceUpdate[] {
  return tokens.map((token) => ({
    tokenId: token.id,

    price: round2(token.price * (1 + randomInRange(-0.03, 0.03))),
    priceChange5m: round2(token.priceChange5m + randomInRange(-2, 2)),
    volume24h: round2(token.volume24h * (1 + randomInRange(-0.02, 0.02))),

    devPercent: Math.max(
      0,
      (token.devPercent ?? 0) + randomIntDelta(-1, 1)
    ),

    snipersCount: Math.max(
      0,
      (token.snipersCount ?? 0) + randomIntDelta(-1, 1)
    ),

    insidersPercent: Math.max(
      0,
      (token.insiderPercent ?? 0) + randomIntDelta(-1, 1)
    ),

    bundlePercent: Math.max(
      0,
      (token.bundlePercent ?? 0) + randomIntDelta(-1, 1)
    ),
    timestamp: Date.now(),
  }))
}

