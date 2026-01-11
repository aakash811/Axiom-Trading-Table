"use client"

import { memo } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { TokenTable } from "@/components/token/token-table"
import { MobileTokenList } from "@/components/token/mobile-token-list"
import { PulseHeader } from "@/components/header/pulse-header"
import { MobileHeader } from "@/components/header/mobile-header"

export const ResponsiveTokenView = memo(function ResponsiveTokenView() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-3 py-4 space-y-4">
          <MobileHeader />
          <MobileTokenList />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
        <PulseHeader />
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <TokenTable />
        </div>
      </div>
    </div>
  )
})
