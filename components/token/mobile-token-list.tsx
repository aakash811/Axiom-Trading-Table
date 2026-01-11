"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore, useFilteredTokens } from "@/store/token-store"
import { MobileTokenCard } from "./mobile-token-card"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileTokenListProps {
  className?: string
}

function MobileLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-20 rounded shimmer" />
              <div className="h-3 w-32 rounded shimmer" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 rounded shimmer" />
              <div className="h-5 w-14 rounded shimmer" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="space-y-1">
                <div className="h-3 w-8 mx-auto rounded shimmer" />
                <div className="h-3 w-12 mx-auto rounded shimmer" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-10 w-10 text-destructive mb-3" />
      <h3 className="text-base font-medium text-foreground mb-2">Failed to load tokens</h3>
      <p className="text-sm text-muted-foreground mb-4">Something went wrong.</p>
      <Button onClick={onRetry} variant="outline" size="sm">
        Try Again
      </Button>
    </div>
  )
}

function MobileEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground">No tokens found</p>
    </div>
  )
}

export const MobileTokenList = memo(function MobileTokenList({ className }: MobileTokenListProps) {
  const isLoading = useTokenStore((state) => state.isLoading)
  const error = useTokenStore((state) => state.error)
  const loadTokens = useTokenStore((state) => state.loadTokens)
  const activeCategory = useTokenStore((state) => state.activeCategory)
  const filteredTokens = useFilteredTokens()

  const showMigration = activeCategory === "final-stretch"

  if (error) {
    return <MobileErrorState onRetry={loadTokens} />
  }

  if (isLoading) {
    return <MobileLoadingSkeleton />
  }

  if (filteredTokens.length === 0) {
    return <MobileEmptyState />
  }

  return (
    <div className={cn("space-y-3", className)}>
      {filteredTokens.map((token) => (
        <MobileTokenCard key={token.id} token={token} showMigration={showMigration} />
      ))}
    </div>
  )
})
