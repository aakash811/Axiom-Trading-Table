import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import type {
  Token,
  TokenCategory,
  SortConfig,
  TokenFilter,
  PriceUpdate,
} from "@/types/token"
import { generateMockTokens } from "@/lib/mock-data"

type FlashDirection = "up" | "down" | null

type MetricFlash = {
  dev?: FlashDirection
  snipers?: FlashDirection
  insiders?: FlashDirection
  bundles?: FlashDirection
}

interface TokenState {
  tokens: {
    "new-pairs": Token[]
    "final-stretch": Token[]
    migrated: Token[]
  }

  activeCategory: TokenCategory
  sortConfig: SortConfig
  filters: TokenFilter
  searchQuery: string
  isLoading: boolean
  error: string | null

  /** Row-level price flash */
  priceFlash: Record<string, FlashDirection>

  /** Metric-level flash */
  metricFlash: Record<string, MetricFlash>

  setActiveCategory: (category: TokenCategory) => void
  setSortConfig: (config: SortConfig) => void
  setFilters: (filters: TokenFilter) => void
  setSearchQuery: (query: string) => void

  loadTokens: () => Promise<void>
  updatePrices: (updates: PriceUpdate[]) => void

  clearPriceFlash: (tokenId: string) => void
  clearMetricFlash: (tokenId: string) => void
}

export const useTokenStore = create<TokenState>()(
  subscribeWithSelector((set, get) => ({
    tokens: {
      "new-pairs": [],
      "final-stretch": [],
      migrated: [],
    },

    activeCategory: "new-pairs",
    sortConfig: { field: "age", direction: "asc" },
    filters: {},
    searchQuery: "",
    isLoading: false,
    error: null,

    priceFlash: {},
    metricFlash: {},

    setActiveCategory: (category) => set({ activeCategory: category }),
    setSortConfig: (config) => set({ sortConfig: config }),
    setFilters: (filters) => set({ filters }),
    setSearchQuery: (query) => set({ searchQuery: query }),

    loadTokens: async () => {
      set({ isLoading: true, error: null })
      await new Promise((r) => setTimeout(r, 800))

      const mockData = generateMockTokens()

      set({
        tokens: {
          "new-pairs": mockData.newPairs,
          "final-stretch": mockData.finalStretch,
          migrated: mockData.migrated,
        },
        isLoading: false,
      })
    },

    updatePrices: (updates) => {
      const { tokens, priceFlash, metricFlash } = get()

      const nextPriceFlash = { ...priceFlash }
      const nextMetricFlash = { ...metricFlash }

      const updateCategory = (list: Token[]): Token[] =>
        list.map((token) => {
          const update = updates.find((u) => u.tokenId === token.id)
          if (!update) return token

          // ---------- PRICE FLASH ----------
          const priceDir: FlashDirection =
            update.price > token.price
              ? "up"
              : update.price < token.price
              ? "down"
              : null

          if (priceDir) nextPriceFlash[token.id] = priceDir

          // ---------- METRIC FLASH ----------
          const prevDev = token.devPercent ?? 0
          const prevSnipers = token.snipersCount ?? 0
          const prevInsiders = token.insiderPercent ?? 0
          const prevBundles = token.bundlePercent ?? 0

          const nextDev = update.devPercent ?? prevDev
          const nextSnipers = update.snipersCount ?? prevSnipers
          const nextInsiders = update.insidersPercent ?? prevInsiders
          const nextBundles = update.bundlePercent ?? prevBundles

          // ---------- METRIC FLASH ----------
          nextMetricFlash[token.id] = {
            dev:
              nextDev > prevDev ? "up" :
              nextDev < prevDev ? "down" : null,

            snipers:
              nextSnipers > prevSnipers ? "up" :
              nextSnipers < prevSnipers ? "down" : null,

            insiders:
              nextInsiders > prevInsiders ? "up" :
              nextInsiders < prevInsiders ? "down" : null,

            bundles:
              nextBundles > prevBundles ? "up" :
              nextBundles < prevBundles ? "down" : null,
          }

          return {
            ...token,
            price: update.price,
            priceChange5m: update.priceChange5m,
            volume24h: update.volume24h,

            devPercent: nextDev,
            snipersCount: nextSnipers,
            insiderPercent: nextInsiders,
            bundlePercent: nextBundles,
          }
        })

      set({
        tokens: {
          "new-pairs": updateCategory(tokens["new-pairs"]),
          "final-stretch": updateCategory(tokens["final-stretch"]),
          migrated: updateCategory(tokens["migrated"]),
        },
        priceFlash: nextPriceFlash,
        metricFlash: nextMetricFlash,
      })
    },

    clearPriceFlash: (tokenId) =>
      set((s) => ({
        priceFlash: { ...s.priceFlash, [tokenId]: null },
      })),

    clearMetricFlash: (tokenId) =>
      set((s) => ({
        metricFlash: { ...s.metricFlash, [tokenId]: {} },
      })),
  }))
)
