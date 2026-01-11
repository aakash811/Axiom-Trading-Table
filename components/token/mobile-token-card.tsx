"use client"

import { memo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { formatPrice, formatCompactNumber, formatAge } from "@/lib/format"
import { TokenImage } from "./token-image"
import { PriceBadge } from "@/components/ui/price-badge"
import { MigrationBar } from "@/components/ui/migration-bar"
import { SourceBadge } from "@/components/ui/source-badge"
import { CopyButton } from "@/components/ui/copy-button"
import { usePriceFlash } from "@/hooks/use-price-flash"
import type { Token } from "@/types/token"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { formatAddress } from "@/lib/format"

interface MobileTokenCardProps {
  token: Token
  showMigration?: boolean
  className?: string
}

export const MobileTokenCard = memo(function MobileTokenCard({
  token,
  showMigration = false,
  className,
}: MobileTokenCardProps) {
  const priceFlash = usePriceFlash(token.id)

  const flashClass = priceFlash === "up" ? "flash-up" : priceFlash === "down" ? "flash-down" : ""

  const handleQuickBuy = useCallback(() => {
    console.log("[v0] Quick buy clicked for token:", token.symbol)
  }, [token.symbol])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={cn(
            "p-3 bg-card border border-border rounded-lg cursor-pointer",
            "active:bg-accent transition-colors",
            flashClass,
            className,
          )}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <TokenImage src={token.imageUrl} alt={token.symbol} size={36} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground text-sm">{token.symbol}</span>
                  <SourceBadge source={token.source} className="scale-90" />
                </div>
                <span className="text-xs text-muted-foreground truncate block">{token.name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm text-foreground">{formatPrice(token.price)}</div>
              <PriceBadge value={token.priceChange24h} size="sm" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-xs text-muted-foreground">MC</div>
              <div className="text-xs font-mono text-foreground">${formatCompactNumber(token.marketCap)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Vol</div>
              <div className="text-xs font-mono text-foreground">${formatCompactNumber(token.volume24h)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Liq</div>
              <div className="text-xs font-mono text-foreground">${formatCompactNumber(token.liquidity)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{showMigration ? "Prog" : "Age"}</div>
              {showMigration && token.migrationProgress !== undefined ? (
                <div className="text-xs font-mono text-foreground">{token.migrationProgress.toFixed(0)}%</div>
              ) : (
                <div className="text-xs font-mono text-foreground">{formatAge(token.age)}</div>
              )}
            </div>
          </div>

          {/* Migration Progress Bar */}
          {showMigration && token.migrationProgress !== undefined && (
            <div className="mt-2">
              <MigrationBar progress={token.migrationProgress} />
            </div>
          )}
        </div>
      </SheetTrigger>

      <SheetContent side="bottom" className="bg-card border-border h-auto max-h-[80vh] rounded-t-2xl">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-3">
            <TokenImage src={token.imageUrl} alt={token.symbol} size={48} />
            <div>
              <div className="text-lg font-bold text-foreground">{token.name}</div>
              <div className="text-sm text-muted-foreground">{token.symbol}</div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 pb-6">
          {/* Price Section */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <div className="text-xs text-muted-foreground">Current Price</div>
              <div className="text-2xl font-mono font-bold text-foreground">{formatPrice(token.price)}</div>
            </div>
            <div className="space-y-1 text-right">
              <PriceBadge value={token.priceChange5m} size="sm" />
              <PriceBadge value={token.priceChange1h} size="sm" />
              <PriceBadge value={token.priceChange24h} size="sm" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="text-sm font-mono text-foreground">${formatCompactNumber(token.marketCap)}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">24h Volume</div>
              <div className="text-sm font-mono text-foreground">${formatCompactNumber(token.volume24h)}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">Liquidity</div>
              <div className="text-sm font-mono text-foreground">${formatCompactNumber(token.liquidity)}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">Holders</div>
              <div className="text-sm font-mono text-foreground">{token.holders.toLocaleString()}</div>
            </div>
          </div>

          {/* Contract Address */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">Contract Address</div>
            <div className="flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-foreground truncate">
                {formatAddress(token.contractAddress, 8)}
              </code>
              <CopyButton text={token.contractAddress} />
            </div>
          </div>

          {/* Transaction Stats */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-xs text-muted-foreground mb-2">24h Transactions</div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="text-token-green text-sm font-medium">{token.buys24h.toLocaleString()} buys</div>
                <div
                  className="h-1 bg-token-green/30 rounded-full mt-1"
                  style={{ width: `${(token.buys24h / token.txns24h) * 100}%` }}
                />
              </div>
              <div className="flex-1">
                <div className="text-token-red text-sm font-medium">{token.sells24h.toLocaleString()} sells</div>
                <div
                  className="h-1 bg-token-red/30 rounded-full mt-1"
                  style={{ width: `${(token.sells24h / token.txns24h) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 h-12 bg-token-green hover:bg-token-green/90 text-primary-foreground font-semibold"
              onClick={handleQuickBuy}
            >
              Buy {token.symbol}
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 border-token-red text-token-red hover:bg-token-red/10 font-semibold bg-transparent"
            >
              Sell
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
})
