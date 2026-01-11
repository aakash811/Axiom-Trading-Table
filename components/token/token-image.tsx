"use client"

import { memo, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface TokenImageProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export const TokenImage = memo(function TokenImage({ src, alt, size = 32, className }: TokenImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold",
          className,
        )}
        style={{ width: size, height: size }}
      >
        {alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      onError={() => setError(true)}
    />
  )
})
