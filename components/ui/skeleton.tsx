// components/ui/skeleton.tsx
import { cn } from "@/lib/utils"

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-secondaryStroke/60",
        className
      )}
    />
  )
}
