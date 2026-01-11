"use client"

import { useEffect, useRef } from "react"
import { SubHeader } from "./layout/sub-header"
import { BottomBar } from "./layout/bottom-bar"
import { TokenColumn } from "./token/token-column"
import { useTokenStore } from "@/store/token-store"
import { generatePriceUpdate } from "@/lib/mock-data"
import dynamic from "next/dynamic"

const Header = dynamic(
  () => import("./layout/header").then((mod) => mod.Header),
  { ssr: false }
)


export function PulseView() {
  const tokens = useTokenStore((state) => state.tokens)
  const isLoading = useTokenStore((state) => state.isLoading)
  const priceFlash = useTokenStore((state) => state.priceFlash)
  const loadTokens = useTokenStore((state) => state.loadTokens)
  const updatePrices = useTokenStore((state) => state.updatePrices)
  const clearPriceFlash = useTokenStore((state) => state.clearPriceFlash)

  const tokensRef = useRef(tokens)
  tokensRef.current = tokens

  // Load initial data
  useEffect(() => {
    loadTokens()
  }, [loadTokens])

  // Simulate real-time updates
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      const currentTokens = tokensRef.current
      const allTokens = [...currentTokens["new-pairs"], ...currentTokens["final-stretch"], ...currentTokens.migrated]

      if (allTokens.length > 0) {
        // Only update a subset of tokens randomly
        const tokensToUpdate = allTokens.filter(() => Math.random() > 0.7).slice(0, 5)
        if (tokensToUpdate.length > 0) {
          const updates = generatePriceUpdate(tokensToUpdate)
          updatePrices(updates)

          // Clear flashes after animation
          updates.forEach((update) => {
            setTimeout(() => {
              clearPriceFlash(update.tokenId)
            }, 500)
          })
        }
      }
    }, 2500)

    return () => clearInterval(interval)
  }, [isLoading, updatePrices, clearPriceFlash])

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <SubHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-axiom-cyan border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading tokens...</span>
          </div>
        </div>
        <BottomBar />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <SubHeader />

      <div className="flex flex-col w-full h-full overflow-hidden">
        <main className="flex flex-1 gap-4 py-6 px-4 lg:px-6 overflow-hidden">
          <div className="flex flex-1 border-primaryStroke bg-backgroundSecondary border flex-col sm:flex-row w-full justify-start items-start rounded-xl sm:rounded-lg overflow-hidden">
            <TokenColumn
              title="New Pairs"
              category="new-pairs"
              tokens={tokens["new-pairs"]}
              filterCount={0}
              priceFlash={priceFlash}
              />
            <TokenColumn
              title="Final Stretch"
              category="final-stretch"
              tokens={tokens["final-stretch"]}
              filterCount={0}
              priceFlash={priceFlash}
              />
            <TokenColumn
              title="Migrated"
              category="migrated"
              tokens={tokens.migrated}
              filterCount={0}
              priceFlash={priceFlash}
              />
            </div>
        </main>
      </div>

      <BottomBar />
    </div>
  )
}
