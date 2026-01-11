"use client"

import { useEffect } from "react"
import { useTokenStore } from "@/store/token-store"

export function usePriceFlash(tokenId: string) {
  const priceFlash = useTokenStore((state) => state.priceFlash[tokenId])
  const clearPriceFlash = useTokenStore((state) => state.clearPriceFlash)

  useEffect(() => {
    if (priceFlash) {
      const timeout = setTimeout(() => {
        clearPriceFlash(tokenId)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [priceFlash, tokenId, clearPriceFlash])

  return priceFlash
}
