"use client"

import { memo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { formatPrice, formatCompactNumber, formatAge, formatNumber } from "@/lib/format"
import { TokenCell } from "./token-cell"
import { PriceBadge } from "@/components/ui/price-badge"
import { MigrationBar } from "@/components/ui/migration-bar"
import { usePriceFlash } from "@/hooks/use-price-flash"
import type { Token } from "@/types/token"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface TokenRowProps {
  token: Token
  showMigration?: boolean
  className?: string
}

export const TokenRow = memo(function TokenRow({ token, showMigration = false, className }: TokenRowProps) {
  const priceFlash = usePriceFlash(token.id)

  const flashClass = priceFlash === "up" ? "flash-up" : priceFlash === "down" ? "flash-down" : ""

  const handleQuickBuy = useCallback(() => {
    console.log("[v0] Quick buy clicked for token:", token.symbol)
  }, [token.symbol])

  return (
    <tr className={cn("group border-b border-border table-row-hover", flashClass, className)}>
      {/* Token Info */}
      <td className="px-3 py-2 sticky left-0 bg-card z-10">
        <TokenCell token={token} />
      </td>

      {/* Price */}
      <td className="px-3 py-2 text-right">
        <span className="font-mono text-sm text-foreground">{formatPrice(token.price)}</span>
      </td>

      {/* 5m Change */}
      <td className="px-3 py-2 text-right">
        <PriceBadge value={token.priceChange5m} size="sm" />
      </td>

      {/* 1h Change */}
      <td className="px-3 py-2 text-right">
        <PriceBadge value={token.priceChange1h} size="sm" />
      </td>

      {/* 24h Change */}
      <td className="px-3 py-2 text-right">
        <PriceBadge value={token.priceChange24h} size="sm" />
      </td>

      {/* Volume */}
      <td className="px-3 py-2 text-right">
        <span className="font-mono text-sm text-foreground">${formatCompactNumber(token.volume24h)}</span>
      </td>

      {/* Market Cap */}
      <td className="px-3 py-2 text-right">
        <span className="font-mono text-sm text-foreground">${formatCompactNumber(token.marketCap)}</span>
      </td>

      {/* Liquidity */}
      <td className="px-3 py-2 text-right">
        <span className="font-mono text-sm text-muted-foreground">${formatCompactNumber(token.liquidity)}</span>
      </td>

      {/* Holders */}
      <td className="px-3 py-2 text-right">
        <span className="font-mono text-sm text-muted-foreground">{formatNumber(token.holders)}</span>
      </td>

      {/* Txns */}
      <td className="px-3 py-2 text-right">
        <div className="flex items-center justify-end gap-1 text-xs">
          <span className="text-token-green">{formatCompactNumber(token.buys24h)}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-token-red">{formatCompactNumber(token.sells24h)}</span>
        </div>
      </td>

      {/* Age / Migration */}
      <td className="px-3 py-2 text-right">
        {showMigration && token.migrationProgress !== undefined ? (
          <div className="w-20">
            <MigrationBar progress={token.migrationProgress} />
          </div>
        ) : (
          <span className="font-mono text-sm text-muted-foreground">{formatAge(token.age)}</span>
        )}
      </td>

      {/* Actions */}
      <td className="px-3 py-2">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">Trade {token.symbol}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-mono text-foreground">{formatPrice(token.price)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Market Cap</p>
                    <p className="font-mono text-foreground">${formatCompactNumber(token.marketCap)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Liquidity</p>
                    <p className="font-mono text-foreground">${formatCompactNumber(token.liquidity)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">24h Volume</p>
                    <p className="font-mono text-foreground">${formatCompactNumber(token.volume24h)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-token-green hover:bg-token-green/90 text-primary-foreground"
                    onClick={handleQuickBuy}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-token-red text-token-red hover:bg-token-red/10 bg-transparent"
                  >
                    Sell
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            className="h-7 px-3 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleQuickBuy}
          >
            Buy
          </Button>
        </div>
      </td>
    </tr>
  )
})
