"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore, useFilteredTokens } from "@/store/token-store"
import { TableHeader } from "./table-header"
import { TokenRow } from "./token-row"
import { TableSkeleton } from "@/components/ui/skeleton-row"
import { ErrorBoundary } from "@/components/error-boundary"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TokenTableProps {
  className?: string
}

function TokenTableError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">Failed to load tokens</h3>
      <p className="text-sm text-muted-foreground mb-4">Something went wrong while fetching token data.</p>
      <Button onClick={onRetry} variant="outline">
        Try Again
      </Button>
    </div>
  )
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={12} className="py-16 text-center">
        <p className="text-muted-foreground">No tokens found matching your criteria</p>
      </td>
    </tr>
  )
}

export const TokenTable = memo(function TokenTable({ className }: TokenTableProps) {
  const isLoading = useTokenStore((state) => state.isLoading)
  const error = useTokenStore((state) => state.error)
  const loadTokens = useTokenStore((state) => state.loadTokens)
  const activeCategory = useTokenStore((state) => state.activeCategory)
  const filteredTokens = useFilteredTokens()

  const showMigration = activeCategory === "final-stretch"

  if (error) {
    return <TokenTableError onRetry={loadTokens} />
  }

  return (
    <ErrorBoundary fallback={<TokenTableError onRetry={loadTokens} />}>
      <div className={cn("overflow-x-auto", className)}>
        <table className="w-full min-w-[1000px] border-collapse">
          <TableHeader showMigration={showMigration} />
          <tbody>
            {isLoading ? (
              <TableSkeleton rows={15} columns={12} />
            ) : filteredTokens.length === 0 ? (
              <EmptyState />
            ) : (
              filteredTokens.map((token) => <TokenRow key={token.id} token={token} showMigration={showMigration} />)
            )}
          </tbody>
        </table>
      </div>
    </ErrorBoundary>
  )
})
