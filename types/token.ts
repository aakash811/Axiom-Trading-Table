// Core token types for the trading table
export interface Token {
  id: string
  name: string
  nameAlt?: string 
  symbol: string
  contractAddress: string
  imageUrl: string
  price: number
  priceChange24h: number
  priceChange1h: number
  priceChange5m: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  txns24h: number
  buys24h: number
  sells24h: number
  proTraders?: number
  KOLS?: number
  DevMigrations?:number
  MigrationsCreated?:number
  age: number // in seconds
  source: "pumpfun" | "raydium" | "jupiter" | "meteora"
  destination?: "raydium" | "jupiter" | "meteora"
  migrationProgress?: number 
  isMigrated: boolean
  createdAt: Date
  devWallet?: string
  creatorHandle?: string
  creatorFollowers?: number
  topHolders?: TopHolder[]
  socialLinks?: SocialLinks
  fee?: number
  txCount?: number
  holdRatio?: string
  insiderPercent?: number
  bundlePercent?: number
  top10Percent?: number
  devPercent?: number
  snipersCount?: number
  ageDisplay?: string
  volumePercent?: number
  hasAudit?: boolean
  isVerified?: boolean
}

export interface TopHolder {
  address: string
  percentage: number
  isCreator: boolean
}

export interface SocialLinks {
  twitter?: string
  telegram?: string
  website?: string
  discord?: string
}

export type TokenCategory = "new-pairs" | "final-stretch" | "migrated"

export type SortField =
  | "name"
  | "price"
  | "priceChange24h"
  | "priceChange1h"
  | "priceChange5m"
  | "volume24h"
  | "marketCap"
  | "liquidity"
  | "holders"
  | "txns24h"
  | "age"

export type SortDirection = "asc" | "desc"

export interface SortConfig {
  field: SortField
  direction: SortDirection
}

export interface TokenFilter {
  minMarketCap?: number
  maxMarketCap?: number
  minLiquidity?: number
  minVolume?: number
  minHolders?: number
  source?: Token["source"][]
}

export interface PriceUpdate {
  tokenId: string
  price: number
  priceChange5m: number
  volume24h: number
  timestamp: number
  devMigrations?: number
  migrationsCreated?: number  
  devPercent?: number
  snipersCount?: number
  insidersPercent?: number
  bundlePercent?: number
}
