"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTokenStore } from "@/store/token-store"
import { generatePriceUpdate } from "@/lib/mock-data"

export function useWebSocketMock() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const tokens = useTokenStore((state) => state.tokens)
  const updatePrices = useTokenStore((state) => state.updatePrices)

  const startMockUpdates = useCallback(() => {
    if (intervalRef.current) return

    intervalRef.current = setInterval(() => {
      const allTokens = [...tokens["new-pairs"], ...tokens["final-stretch"], ...tokens["migrated"]]

      if (allTokens.length === 0) return

      // Update a random subset of tokens
      const tokensToUpdate = allTokens.filter(() => Math.random() > 0.7).slice(0, 10)

      if (tokensToUpdate.length > 0) {
        const updates = generatePriceUpdate(tokensToUpdate)
        updatePrices(updates)
      }
    }, 2000)
  }, [tokens, updatePrices])

  const stopMockUpdates = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopMockUpdates()
    }
  }, [stopMockUpdates])

  return { startMockUpdates, stopMockUpdates }
}
