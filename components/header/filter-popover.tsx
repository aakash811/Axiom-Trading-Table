"use client"

import { memo, useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore } from "@/store/token-store"
import type { TokenFilter } from "@/types/token"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SlidersHorizontal, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const sourceOptions = [
  { id: "pumpfun", label: "Pump.fun" },
  { id: "raydium", label: "Raydium" },
  { id: "jupiter", label: "Jupiter" },
  { id: "meteora", label: "Meteora" },
] as const

export const FilterPopover = memo(function FilterPopover() {
  const filters = useTokenStore((state) => state.filters)
  const setFilters = useTokenStore((state) => state.setFilters)
  const [open, setOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<TokenFilter>(filters)

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true),
  )

  const handleApply = useCallback(() => {
    setFilters(localFilters)
    setOpen(false)
  }, [localFilters, setFilters])

  const handleClear = useCallback(() => {
    setLocalFilters({})
    setFilters({})
  }, [setFilters])

  const handleSourceChange = useCallback((sourceId: string, checked: boolean) => {
    setLocalFilters((prev) => {
      const currentSources = prev.source || []
      const newSources = checked
        ? [...currentSources, sourceId as TokenFilter["source"][0]]
        : currentSources.filter((s) => s !== sourceId)
      return { ...prev, source: newSources.length > 0 ? newSources : undefined }
    })
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={cn("gap-2", hasActiveFilters && "border-primary text-primary")}>
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="flex items-center justify-center h-5 w-5 text-xs bg-primary text-primary-foreground rounded-full">
              {Object.values(filters).filter((v) => v !== undefined).length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 bg-popover border-border p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Filters</h4>
            {hasActiveFilters && (
              <button
                onClick={handleClear}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Market Cap</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={localFilters.minMarketCap || ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      minMarketCap: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="h-8 text-sm bg-input"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={localFilters.maxMarketCap || ""}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      maxMarketCap: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="h-8 text-sm bg-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Min Liquidity</Label>
              <Input
                type="number"
                placeholder="0"
                value={localFilters.minLiquidity || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    minLiquidity: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-8 text-sm bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Min Volume</Label>
              <Input
                type="number"
                placeholder="0"
                value={localFilters.minVolume || ""}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    minVolume: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className="h-8 text-sm bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Source</Label>
              <div className="grid grid-cols-2 gap-2">
                {sourceOptions.map((source) => (
                  <label key={source.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={localFilters.source?.includes(source.id) || false}
                      onCheckedChange={(checked) => handleSourceChange(source.id, checked as boolean)}
                    />
                    <span className="text-sm text-foreground">{source.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
})
