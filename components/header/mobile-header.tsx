"use client"

import { memo, useState } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore } from "@/store/token-store"
import type { TokenCategory } from "@/types/token"
import { SearchBar } from "./search-bar"
import { FilterPopover } from "./filter-popover"
import { Zap, Activity, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categoryLabels: Record<TokenCategory, string> = {
  "new-pairs": "New Pairs",
  "final-stretch": "Final Stretch",
  migrated: "Migrated",
}

interface MobileHeaderProps {
  className?: string
}

export const MobileHeader = memo(function MobileHeader({ className }: MobileHeaderProps) {
  const activeCategory = useTokenStore((state) => state.activeCategory)
  const setActiveCategory = useTokenStore((state) => state.setActiveCategory)
  const tokens = useTokenStore((state) => state.tokens)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className={cn("space-y-3", className)}>
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-tight">Pulse</h1>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-token-green/10 rounded-full">
            <Activity className="h-2.5 w-2.5 text-token-green animate-pulse" />
            <span className="text-[10px] font-medium text-token-green">Live</span>
          </div>
        </div>

        <FilterPopover />
      </div>

      {/* Search */}
      <SearchBar className="w-full" />

      {/* Category Dropdown */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5",
              "bg-muted/50 border border-border rounded-lg",
              "text-sm font-medium text-foreground",
            )}
          >
            <span>{categoryLabels[activeCategory]}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{tokens[activeCategory].length} tokens</span>
              <ChevronDown
                className={cn("h-4 w-4 text-muted-foreground transition-transform", dropdownOpen && "rotate-180")}
              />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[calc(100vw-2rem)] bg-popover border-border">
          {(Object.keys(categoryLabels) as TokenCategory[]).map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn("flex items-center justify-between py-3", activeCategory === category && "bg-accent")}
            >
              <span>{categoryLabels[category]}</span>
              <span className="text-xs text-muted-foreground">{tokens[category].length}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
})
