"use client"

import { memo } from "react"
import { Pill, Fuel, Coins } from "lucide-react"
import { QUICK_ACTIONS } from "./bottomBar.constants"
import { BottomBarAction } from "./bottomBarAction"

export const BottomBar = memo(function BottomBar() {
  return (
    <div className="hidden sm:block">
      <div className="border-t border-solid border-primaryStroke w-full h-9 min-h-9 text-nowrap">
        <div className="relative flex w-full h-full">
          {/* Right fade overlay (scroll hint) */}
          <div className="absolute right-0 top-0 w-12 h-full z-40 bg-linear-to-l from-background to-transparent flex items-center justify-end pointer-events-none">
            <button
              type="button"
              className="absolute right-0 w-6 h-6 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all duration-125 ease-in-out opacity-0 mx-3"
            >
              <i className="ri-arrow-right-wide-line text-[20px] mb-px" />
            </button>
          </div>

          <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-row justify-between w-full h-full px-6 gap-4 items-center min-w-0">
            {/* LEFT SECTION */}
            <div className="flex flex-row shrink-0 gap-2 justify-start items-center">
              <button className="text-primaryBlue bg-primaryBlue/20 flex flex-row h-6 px-2 gap-1 justify-start items-center rounded-lg hover:bg-primaryBlue/25 transition-colors duration-150 ease-in-out cursor-pointer">
                <i className="ri-list-settings-line text-[16px]" />
                <span className="text-[12px] font-semibold">PRESET 1</span>
              </button>

              {/* Wallet selector */}
              <button className="group/wallets border border-primaryStroke flex flex-row h-6 pl-2 pr-1.25 gap-1.5 justify-start items-center rounded-full hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out cursor-pointer">
                <div className="flex flex-row gap-1 items-center">
                  <i className="ri-wallet-line text-[14px] text-textTertiary group-hover/wallets:text-textSecondary transition-colors duration-125" />
                  <span className="text-[12px] font-medium text-textSecondary">1</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <img alt="SOL" width="14" height="14" src="/solana.svg" />
                  <span className="text-[12px] font-medium text-textSecondary">0</span>
                </div>
                <i className="ri-arrow-down-s-line text-[14px] text-textSecondary" />
              </button>

              <div className="w-px h-5 bg-primaryStroke shrink-0" />

              <button className="min-w-6 min-h-6 flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/40 transition-colors duration-125 rounded-lg">
                <i className="ri-settings-3-line text-[14px]" />
              </button>

              {QUICK_ACTIONS.map(([icon, label]) => (
                <BottomBarAction key={label} icon={icon} label={label} />
              ))}
            </div>

            <div className="hidden 2xl:flex w-px h-5 bg-primaryStroke shrink-0" />

            {/* CENTER PRICES */}
            <div className="flex flex-1 flex-row gap-2">
              <Price src="/BTC.svg" label="$90.4K" color="#F7931A" />
              <Price src="/etherium.svg" label="$3082" color="#497493" />
              <Price src="/solana.svg" label="$135.59" color="#14F195" visible="lg" />
            </div>

            {/* RIGHT STATUS */}
            <div className="flex flex-row gap-2 shrink-0 items-center">
              <Metric icon={<Pill className="w-4" />} />
              <Metric icon={<Fuel className="w-4" />} />
              <Metric icon={<Coins className="w-4" />} />

              <div className="flex flex-row h-6 gap-1 px-1 items-center rounded-md text-primaryGreen xl:bg-primaryGreen/20">
                <div className="bg-primaryGreen/20 w-3 h-3 rounded-full flex items-center justify-center">
                  <div className="bg-primaryGreen w-2 h-2 rounded-full" />
                </div>
                <span className="hidden xl:flex text-xs font-medium">
                  Connection is stable
                </span>
              </div>

              <button className="flex items-center gap-1 px-2 h-6 text-[12px] font-medium rounded hover:bg-secondaryStroke/40 text-textSecondary transition-colors">
                GLOBAL
                <i className="ri-arrow-down-s-line text-[14px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

/* ---------- Small internal helpers (memoized) ---------- */

const Price = memo(function Price({
  src,
  label,
  color,
  visible = "2xl",
}: {
  src: string
  label: string
  color: string
  visible?: string
}) {
  return (
    <button
      className={`hidden ${visible}:flex flex-row shrink-0 h-6 gap-1 items-center hover:brightness-110`}
      style={{ color }}
    >
      <img src={src} width="16" height="16" alt="" />
      <span className="text-[12px] font-normal">{label}</span>
    </button>
  )
})

const Metric = memo(function Metric({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="-mr-2 group flex items-center gap-1 h-6 px-2 text-[12px] font-medium rounded hover:bg-secondaryStroke/40 text-textTertiary transition-colors">
      {icon}
      <span>$55.8K</span>
    </button>
  )
})
