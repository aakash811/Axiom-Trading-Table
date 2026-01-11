"use client"

import { memo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore } from "@/store/token-store"
import type { SortField } from "@/types/token"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ColumnConfig {
  key: SortField | "actions"
  label: string
  tooltip?: string
  align?: "left" | "right" | "center"
  sortable?: boolean
  width?: string
  sticky?: boolean
}

const columns: ColumnConfig[] = [
  {
    key: "name",
    label: "Token",
    tooltip: "Token name and symbol",
    align: "left",
    sortable: true,
    width: "w-48",
    sticky: true,
  },
  { key: "price", label: "Price", tooltip: "Current token price in USD", align: "right", sortable: true },
  { key: "priceChange5m", label: "5m", tooltip: "5 minute price change", align: "right", sortable: true },
  { key: "priceChange1h", label: "1h", tooltip: "1 hour price change", align: "right", sortable: true },
  { key: "priceChange24h", label: "24h", tooltip: "24 hour price change", align: "right", sortable: true },
  { key: "volume24h", label: "Volume", tooltip: "24 hour trading volume", align: "right", sortable: true },
  { key: "marketCap", label: "MC", tooltip: "Market capitalization", align: "right", sortable: true },
  { key: "liquidity", label: "Liq", tooltip: "Available liquidity", align: "right", sortable: true },
  { key: "holders", label: "Holders", tooltip: "Number of token holders", align: "right", sortable: true },
  { key: "txns24h", label: "Txns", tooltip: "24h transactions (buys/sells)", align: "right", sortable: true },
  { key: "age", label: "Age", tooltip: "Time since token creation", align: "right", sortable: true },
  { key: "actions", label: "", align: "right", sortable: false, width: "w-24" },
]

interface TableHeaderProps {
  showMigration?: boolean
}

export const TableHeader = memo(function TableHeader({ showMigration }: TableHeaderProps) {
  const sortConfig = useTokenStore((state) => state.sortConfig)
  const setSortConfig = useTokenStore((state) => state.setSortConfig)

  const handleSort = useCallback(
    (field: SortField) => {
      setSortConfig({
        field,
        direction: sortConfig.field === field && sortConfig.direction === "desc" ? "asc" : "desc",
      })
    },
    [sortConfig, setSortConfig],
  )

  const displayColumns = showMigration
    ? columns.map((col) => (col.key === "age" ? { ...col, label: "Progress", tooltip: "Migration progress" } : col))
    : columns

  return (
    <thead className="bg-card sticky top-0 z-20">
      <tr className="border-b border-border">
        {displayColumns.map((column) => {
          const isSorted = sortConfig.field === column.key
          const isSortable = column.sortable && column.key !== "actions"

          return (
            <th
              key={column.key}
              className={cn(
                "px-3 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                column.align === "right" && "text-right",
                column.align === "center" && "text-center",
                column.width,
                column.sticky && "sticky left-0 bg-card z-10",
                isSortable && "cursor-pointer hover:text-foreground transition-colors select-none",
              )}
              onClick={() => isSortable && handleSort(column.key as SortField)}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn("inline-flex items-center gap-1", column.align === "right" && "justify-end")}>
                      {column.label}
                      {isSortable &&
                        isSorted &&
                        (sortConfig.direction === "desc" ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ))}
                    </div>
                  </TooltipTrigger>
                  {column.tooltip && (
                    <TooltipContent side="top" className="bg-popover text-popover-foreground">
                      <p className="text-xs">{column.tooltip}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </th>
          )
        })}
      </tr>
    </thead>
  )
})
