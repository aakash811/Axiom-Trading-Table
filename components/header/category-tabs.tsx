"use client"

import type React from "react"

import { memo, useCallback } from "react"
import { cn } from "@/lib/utils"
import { useTokenStore } from "@/store/token-store"
import type { TokenCategory } from "@/types/token"
import { Sparkles, Timer, ArrowRightLeft } from "lucide-react"

interface CategoryConfig {
  id: TokenCategory
  label: string
  icon: React.ReactNode
  description: string
}

const categories: CategoryConfig[] = [
  {
    id: "new-pairs",
    label: "New Pairs",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Recently created tokens",
  },
  {
    id: "final-stretch",
    label: "Final Stretch",
    icon: <Timer className="h-4 w-4" />,
    description: "Tokens about to migrate",
  },
  {
    id: "migrated",
    label: "Migrated",
    icon: <ArrowRightLeft className="h-4 w-4" />,
    description: "Successfully migrated tokens",
  },
]

export const CategoryTabs = memo(function CategoryTabs() {
  const activeCategory = useTokenStore((state) => state.activeCategory)
  const setActiveCategory = useTokenStore((state) => state.setActiveCategory)
  const tokens = useTokenStore((state) => state.tokens)

  const handleCategoryChange = useCallback(
    (category: TokenCategory) => {
      setActiveCategory(category)
    },
    [setActiveCategory],
  )

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg">
      {categories.map((category) => {
        const isActive = activeCategory === category.id
        const count = tokens[category.id].length

        return (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-card/50",
            )}
          >
            {category.icon}
            <span className="hidden sm:inline">{category.label}</span>
            {count > 0 && (
              <span
                className={cn(
                  "px-1.5 py-0.5 text-xs rounded-full",
                  isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                )}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
})
