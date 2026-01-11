"use client"

import { memo, useEffect, useState } from "react"
import { ColumnHeader } from "./column-header"
import { TokenCard } from "./token-card"
import { TokenCardSkeleton } from "./token-card-skeleton"
import { useTokenStore } from "@/store/token-store"
import type { Token, TokenCategory } from "@/types/token"

interface TokenColumnProps {
  title: string
  category: TokenCategory
  tokens: Token[]
  filterCount?: number
  priceFlash?: Record<string, "up" | "down" | null>
}

export const TokenColumn = memo(function TokenColumn({
  title,
  category,
  tokens,
  filterCount = 0,
  priceFlash = {},
}: TokenColumnProps) {
  const isLoading = useTokenStore((s) => s.isLoading)

  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setShowSkeleton(false), 1200)
      return () => clearTimeout(t)
    } else {
      setShowSkeleton(true)
    }
  }, [isLoading])

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full border-r border-border last:border-r-0">
      <ColumnHeader title={title} category={category} filterCount={filterCount} />

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {showSkeleton
          ? Array.from({ length: 6 }).map((_, i) => (
              <TokenCardSkeleton key={i} />
            ))
          : tokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                category={category}
                flashDirection={priceFlash[token.id]}
              />
            ))}
      </div>
    </div>
  )
})
