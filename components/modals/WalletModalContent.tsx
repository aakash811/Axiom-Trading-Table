"use client"

import { useEffect, useRef } from "react"
import { Copy, ArrowLeftRight } from "lucide-react"

interface WalletModalContentProps {
  open: boolean
  onClose: () => void
}

export default function WalletModalContent({
  open,
  onClose,
}: WalletModalContentProps) {
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
        fixed z-[9999]
        right-[116px] top-[48px]
        translate-y-1
        rounded-[4px]
        shadow-dropdown
        bg-backgroundTertiary
        border border-secondaryStroke
        origin-top-right
      "
    >
      <div className="flex flex-col w-[264px]">
        {/* Header */}
        <div className="border-b border-secondaryStroke">
          <div className="flex flex-col gap-[4px] p-[16px]">
            <div className="flex justify-between items-center">
              <span className="text-textSecondary text-[12px] border-b border-dashed border-textTertiary/20 hover:border-textTertiary">
                Total Value
              </span>

              <div className="flex gap-1">
                <button className="flex items-center gap-1 px-1 h-6 rounded hover:bg-primaryStroke/60">
                  <Copy className="w-3 h-3 text-textTertiary" />
                  <span className="text-[12px] text-textSecondary">Solana</span>
                </button>

                <button className="flex items-center gap-1 px-1 h-6 rounded hover:bg-primaryStroke/60">
                  <Copy className="w-3 h-3 text-textTertiary" />
                  <span className="text-[12px] text-textSecondary">Perps</span>
                </button>
              </div>
            </div>

            <span className="text-textPrimary text-[18px]">$0</span>
          </div>
        </div>

        {/* Balances */}
        <div className="group h-[48px] border-b border-secondaryStroke/50 hover:bg-secondaryStroke/40 cursor-pointer">
          <div className="flex p-[16px] justify-between items-center">
            <div className="flex gap-1 items-center">
              <img src="/solana.svg" width={18} height={18} alt="SOL" />
              <span className="text-textPrimary font-medium">0</span>
            </div>

            <ArrowLeftRight className="w-4 h-4 text-textSecondary group-hover:text-textPrimary" />

            <div className="flex gap-1 items-center">
              <img src="/cash.svg" width={18} height={18} alt="USDC" />
              <span className="text-textPrimary font-medium">0</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex p-[16px] pb-[20px] gap-[16px]">
          <button className="bg-primaryBlue flex-1 h-[28px] rounded-full hover:bg-primaryBlueHover">
            <span className="text-background text-[12px] font-bold">Deposit</span>
          </button>

          <button className="bg-secondaryStroke flex-1 h-[28px] rounded-full hover:bg-secondaryStroke/80">
            <span className="text-textPrimary text-[12px] font-bold">Withdraw</span>
          </button>
        </div>
      </div>
    </div>
  )
}
