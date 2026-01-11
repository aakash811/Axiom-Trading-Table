"use client"

import type React from "react"

import { memo, useCallback, useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore } from "@/store/token-store"
import { Search, X, Loader2 } from "lucide-react"

interface SearchBarProps {
  className?: string
}

export const SearchBar = memo(function SearchBar({ className }: SearchBarProps) {
  const searchQuery = useTokenStore((state) => state.searchQuery)
  const setSearchQuery = useTokenStore((state) => state.setSearchQuery)
  const [localValue, setLocalValue] = useState(searchQuery)
  const [isPending, startTransition] = useTransition()

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalValue(value)
      startTransition(() => {
        setSearchQuery(value)
      })
    },
    [setSearchQuery],
  )

  const handleClear = useCallback(() => {
    setLocalValue("")
    setSearchQuery("")
  }, [setSearchQuery])

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search by token or CA..."
          className={cn(
            "w-full pl-9 pr-9 py-2 bg-input border border-border rounded-lg",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-all duration-200",
          )}
        />
        {(localValue || isPending) && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
})
