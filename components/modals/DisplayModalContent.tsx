"use client"

import { Rocket } from "lucide-react"
import { useEffect, useRef } from "react"

interface DisplayModalContentProps {
  open: boolean
  onClose: () => void
}

export default function DisplayModalContent({
  open,
  onClose,
}: DisplayModalContentProps) {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
    ref={modalRef}
    className="
        fixed
        z-[9999]
        right-[335.349px]
        top-[147.982px]
        translate-y-1
        rounded-[4px]
        opacity-100
        shadow-dropdown
        bg-backgroundTertiary
        border border-secondaryStroke
        origin-top-right
    "
    >
    <div className="flex flex-col min-w-[344px] h-full max-h-[564px] overflow-hidden">
        {/* Metrics */}
        <div className="flex flex-col gap-[12px] px-[16px] py-[16px] flex-shrink-0">
        <span className="text-textSecondary text-[12px]">Metrics</span>

        <div className="flex gap-[8px]">
            <button className="flex-1 h-[52px] rounded-[4px] border border-secondaryStroke/50 text-[12px] text-textSecondary font-medium bg-transparent hover:bg-secondaryStroke/40 transition-colors">
            <div className="flex flex-col gap-[4px] items-center">
                <div className="flex gap-[4px] h-[16px] text-textTertiary">
                <span>MC</span>
                <span className="font-medium">77K</span>
                </div>
                <span className="text-textTertiary">Small</span>
            </div>
            </button>

            <button className="flex-1 h-[52px] rounded-[4px] border border-secondaryStroke/50 bg-secondaryStroke text-[12px] text-textSecondary font-medium transition-colors">
            <div className="flex flex-col gap-[4px] items-center">
                <div className="flex gap-[4px] h-[16px] items-end text-textSecondary">
                <span className="pt-[4px]">MC</span>
                <span className="text-[16px] font-medium">77K</span>
                </div>
                <span>Large</span>
            </div>
            </button>
        </div>
        </div>

        {/* Quick Buy */}
        <div className="flex flex-col gap-[12px] px-[16px] flex-shrink-0">
        <span className="text-textSecondary text-[12px]">Quick Buy</span>

        <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
            {[
                { size: "Small", w: "w-[20px] h-[8px]" },
                { size: "Large", w: "w-[24px] h-[10px]" },
                { size: "Mega", w: "w-[32px] h-[14px]" },
            ].map(({ size, w }) => (
                <button
                key={size}
                className="flex-1 h-[52px] rounded-[4px] border border-secondaryStroke/50 text-[12px] text-textSecondary font-medium hover:bg-secondaryStroke/40 transition-colors"
                >
                <div className="flex flex-col gap-[4px] items-center">
                    <div className="flex h-[16px] items-end justify-center">
                    <div className={`${w} bg-primaryBlue rounded-full flex items-center justify-center gap-[1px]`}>
                        <i className="ri-flashlight-fill text-[7px] text-[#090909]" />
                        <span className="text-[7px] font-bold text-[#090909]">7</span>
                    </div>
                    </div>
                    <span className="text-textTertiary">{size}</span>
                </div>
                </button>
            ))}

            {/* Ultra */}
            <button className="flex-1 h-[52px] rounded-[4px] border border-secondaryStroke/50 text-[12px] text-textSecondary font-medium hover:bg-secondaryStroke/40 transition-colors">
                <div className="flex flex-col gap-[4px] items-center">
                <div className="flex h-[16px] items-end justify-center">
                    <div className="relative w-[40px] h-[18px] bg-textTertiary/20 rounded-[1px] flex items-center justify-center overflow-hidden">
                    <div className="absolute w-[24px] h-[12px] bottom-0 right-0 translate-x-1 translate-y-1 rounded-full opacity-10 bg-[radial-gradient(circle,white_0%,transparent_70%)]" />
                    <i className="ri-flashlight-fill text-[8px] text-primaryBlueHover" />
                    <span className="text-[8px] font-bold text-primaryBlueHover">7</span>
                    </div>
                </div>
                <span className="text-textTertiary">Ultra</span>
                </div>
            </button>
            </div>
        </div>
        </div>

        {/* Layout Tabs */}
        <div className="flex gap-[8px] px-[16px] mt-[8px] h-[36px] border-b border-secondaryStroke pb-[3px] flex-shrink-0">
        {["Layout", "Metrics", "Row", "Extras"].map((label, i) => (
            <button
            key={label}
            className={`rounded-full px-[12px] h-[20px] flex items-center ${
                i === 0
                ? "bg-secondaryStroke text-textPrimary"
                : "bg-secondary/80 text-textTertiary"
            }`}
            >
            <span className="text-[14px] font-medium">{label}</span>
            </button>
        ))}
        </div>

        {/* Scrollable Options */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-[0] py-[16px] min-h-0">
        <div className="flex flex-col gap-[12px]">
            <div className="flex flex-col gap-[8px] px-[16px]">
            {[
                "Show Search Bar",
                "No Decimals",
                "Show Hidden Tokens",
                "Unhide on Migrated",
                "Circle Images",
                "Progress Bar",
                "Spaced Tables",
            ].map((label) => (
                <button
                key={label}
                className="flex items-center gap-[8px] px-[12px] h-[36px] hover:bg-secondaryStroke/60 rounded-[4px] transition-colors group"
                >
                <span className="text-[14px] text-textPrimary font-medium">
                    {label}
                </span>
                </button>
            ))}
            </div>
        </div>
        </div>
    </div>
    </div>
  )}
