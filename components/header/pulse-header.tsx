"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"
import { CategoryTabs } from "./category-tabs"
import { SearchBar } from "./search-bar"
import { FilterPopover } from "./filter-popover"
import { Activity, Zap } from "lucide-react"

interface PulseHeaderProps {
  className?: string
}

export const PulseHeader = memo(function PulseHeader({ className }: PulseHeaderProps) {
  return (
    <header className={cn("space-y-4", className)}>
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Pulse</h1>
              <p className="text-xs text-muted-foreground">Token Discovery</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5 ml-4 px-2 py-1 bg-token-green/10 rounded-full">
            <Activity className="h-3 w-3 text-token-green animate-pulse" />
            <span className="text-xs font-medium text-token-green">Live</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar className="w-64 hidden md:block" />
          <FilterPopover />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden">
        <SearchBar className="w-full" />
      </div>

      {/* Category Tabs */}
      <CategoryTabs />
    </header>
  )
})
