"use client"

import { memo } from "react"

interface BottomBarActionProps {
  icon: string
  label: string
}

export const BottomBarAction = memo(function BottomBarAction({
  icon,
  label,
}: BottomBarActionProps) {
  return (
    <button className="group relative flex flex-row gap-1 h-6 px-1 items-center rounded-lg cursor-pointer border border-transparent hover:bg-primaryStroke/60">
      <div className="absolute -top-px -right-0.75 w-1.75 h-1.75 bg-decrease rounded-full border border-background" />
      <i
        className={`text-[16px] ${icon} text-textTertiary group-hover:text-textSecondary transition-colors`}
      />
      <span className="text-textSecondary text-[12px] font-medium text-nowrap">
        {label}
      </span>
    </button>
  )
})
