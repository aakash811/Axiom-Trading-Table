"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"
import { formatAddress } from "@/lib/format"
import { TokenImage } from "./token-image"
import { CopyButton } from "@/components/ui/copy-button"
import { SourceBadge } from "@/components/ui/source-badge"
import type { Token } from "@/types/token"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ExternalLink, Twitter } from "lucide-react"

interface TokenCellProps {
  token: Token
  className?: string
}

export const TokenCell = memo(function TokenCell({ token, className }: TokenCellProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <TokenImage src={token.imageUrl} alt={token.symbol} size={32} />
            <div className="flex flex-col items-start">
              <span className="font-medium text-foreground text-sm leading-tight">{token.symbol}</span>
              <span className="text-xs text-muted-foreground leading-tight truncate max-w-[100px]">{token.name}</span>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent side="right" align="start" className="w-72 bg-popover border-border p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TokenImage src={token.imageUrl} alt={token.symbol} size={48} />
              <div>
                <h4 className="font-semibold text-foreground">{token.name}</h4>
                <p className="text-sm text-muted-foreground">{token.symbol}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contract</span>
                <div className="flex items-center gap-1">
                  <code className="text-xs font-mono text-foreground">{formatAddress(token.contractAddress, 6)}</code>
                  <CopyButton text={token.contractAddress} />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Source</span>
                <SourceBadge source={token.source} destination={token.destination} />
              </div>

              {token.devWallet && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dev Wallet</span>
                  <div className="flex items-center gap-1">
                    <code className="text-xs font-mono text-foreground">{formatAddress(token.devWallet, 4)}</code>
                    <CopyButton text={token.devWallet} />
                  </div>
                </div>
              )}
            </div>

            {token.socialLinks && (
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                {token.socialLinks.twitter && (
                  <a
                    href={token.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-3.5 w-3.5" />
                    Twitter
                  </a>
                )}
                {token.socialLinks.website && (
                  <a
                    href={token.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <CopyButton text={token.contractAddress} className="opacity-0 group-hover:opacity-100" />
    </div>
  )
})
