"use client"

import { memo } from "react"
import Image from "next/image"
import { ChefHat, Boxes, AlignHorizontalDistributeCenter } from "lucide-react"
import { formatAge, formatMarketCap, formatVolume, formatFollowers, formatAddress } from "@/lib/format"
import type { Token } from "@/types/token"
import { cn } from "@/lib/utils"
import { useTokenStore } from "@/store/token-store"
import { usePriceFlash } from "@/hooks/use-price-flash"

interface TokenCardProps {
  token: Token
  category: "new-pairs" | "final-stretch" | "migrated"
  flashDirection?: "up" | "down" | null
}

export const TokenCard = memo(function TokenCard({ token, category, flashDirection }: TokenCardProps) {
  const isWarning = token.devPercent && token.devPercent > 5
  const isHighlighted = category === "final-stretch"

  const metricFlash = useTokenStore((s) => s.metricFlash[token.id])
  
  const metricsFlashClass = (dir?: "up" | "down" | null) => cn(
    "transition-colors duration-500",
    dir === "up" && "text-primaryGreen",
    dir === "down" && "text-primaryRed"
  )

  const rowFlashClass = cn(
    "transition-colors duration-500",
    flashDirection === "up" && "bg-primaryGreen/10",
    flashDirection === "down" && "bg-primaryRed/10"
  )

  return (
    <div className="w-full h-29">
      <div>
        <span className="contents" />
        <span className="contents">
          <div
            className={cn(
              `
                border-primaryStroke/50 border-b
                flex flex-col w-full justify-start items-center cursor-pointer
                relative overflow-hidden hover:bg-primaryStroke/50
                group lg:group xl:hover:bg-primaryStroke/50
                h-[142px] min-h-[142px]
                sm:h-[116px] sm:min-h-[116px]
                md:h-[142px] md:min-h-[142px]
                lg:h-[142px] lg:min-h-[142px]
                xl:h-[116px] xl:min-h-[116px]
              `,
              rowFlashClass
            )}
          >
            <div className="w-full h-full flex flex-col">
              <span className="contents">
                <button
                  type="button"
                  className="
                    absolute z-50 opacity-0 group-hover:opacity-100
                    transition-opacity duration-0
                    text-textTertiary hover:text-primaryBlueHover
                    w-6 h-6 flex items-center justify-center
                    rounded bg-backgroundTertiary
                    border border-secondaryStroke/50
                    top-[6px] left-[6px]
                  "
                >
                  <i className="ri-eye-off-line text-[14px]" />
                </button>
              </span>

              <span className="contents">
                <button
                  type="button"
                  className="
                    absolute z-50 opacity-0 group-hover:opacity-100
                    transition-opacity duration-0
                    bg-backgroundTertiary text-textTertiary
                    hover:text-primaryBlueHover
                    w-6 h-6 flex items-center justify-center
                    rounded border border-secondaryStroke/50
                    top-[32px] left-[6px]
                  "
                >
                  <i className="icon-chefhat-off text-[12px]" />
                </button>
              </span>

              <span className="contents">
                <button
                  type="button"
                  className="
                    absolute z-50 opacity-0 group-hover:opacity-100
                    transition-opacity duration-0
                    bg-backgroundTertiary text-textTertiary
                    hover:text-primaryBlueHover
                    w-6 h-6 flex items-center justify-center
                    rounded border border-secondaryStroke/50
                    top-[58px] left-[6px]
                  "
                >
                  <i className="icon-at-off-line text-[12px]" />
                </button>
              </span>

              {/* QUICK BUY (MOBILE) */}
              <div className="absolute right-3 bottom-2.5 sm:right-4 sm:bottom-3 z-20 block sm:hidden">
                <button
                  type="button"
                  className="
                    bg-primaryBlue hover:bg-primaryBlueHover
                    text-[#090909]
                    flex gap-1 items-center
                    rounded-full h-6 px-[6px]
                    text-[12px] font-bold
                  "
                >
                  <i className="ri-flashlight-fill text-[16px]" />
                  0 SOL
                </button>
              </div>

              {/* QUICK BUY (DESKTOP) */}
              <div className="absolute right-4 bottom-4 z-20 hidden sm:block lg:opacity-0 lg:group-hover:opacity-100 xl:opacity-100 2xl:!opacity-100">
                <button
                  type="button"
                  className="
                    bg-primaryBlue hover:bg-primaryBlueHover
                    text-[#090909]
                    flex gap-1 items-center
                    rounded-full h-6 px-[6px]
                    text-[12px] font-bold
                  "
                >
                  <i className="ri-flashlight-fill text-[16px]" />
                  0 SOL
                </button>
              </div>

              {/* MARKET CAP / VOLUME */}
              <div className="absolute right-4 top-4 z-10">
                <div className="flex flex-col gap-0.5 items-end">
                  <div className="relative">
                    <div className="absolute -top-3 -right-2 bottom-px -left-1 z-0">
                      <div className="absolute inset-0 bg-backgroundSecondary" />
                      <div className="absolute inset-0 group-hover:bg-primaryStroke/50 z-10" />
                    </div>
                    <div className="relative flex gap-2 justify-end items-end z-20">
                      <span className="contents">
                        <div className="flex flex-row h-4.5 gap-1 justify-end items-end">
                          <span className="text-textTertiary text-[12px] font-medium pb-[1.6px]">MC</span>
                          <span className="text-[16px] font-medium text-[#52c5ff]">{formatMarketCap(token.marketCap)}</span>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-3 -right-2 bottom-px -left-1">
                      <div className="absolute inset-0 bg-backgroundSecondary" />
                      <div className="absolute inset-0 group-hover:bg-primaryStroke/50 z-10" />
                    </div>
                    <div className="relative flex gap-2 justify-end items-end z-20">
                      <span className="contents">
                        <div className="flex flex-row h-4.5 gap-1 justify-end items-end">
                          <span className="text-textTertiary text-[12px] font-medium pb-[1.6px] justify-center items-center">V</span>
                          <span className="text-[16px] font-medium text-textPrimary">{formatVolume(token.volume24h)}</span>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="relative flex flex-row gap-2 justify-start items-start -mt-0.5">
                    <div className="absolute z-0 -top-0.5 -right-2 -bottom-1 -left-1">
                      <div className=" group-hover:bg-primaryStroke/50 absolute inset-0 z-5"></div>
                      <div className="bg-backgroundSecondary absolute inset-0 z-0"></div>
                    </div>
                    <span className="contents">
                      <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 group/image text-nowrap z-20">
                        <span className="text-textTertiary text-[11px] font-medium">F</span>
                        <div className="flex flex-row gap-0.5 items-center">
                          <img alt="SOL" loading="lazy" width="14" height="14" decoding="async" data-nimg="1" className="w-3.5 h-3.5 bg-transparent" src="/solana.svg"/>
                          <span className="text-textPrimary text-[12px] font-medium">
                            0.
                            {token.fee}
                            <sub>{Math.floor(Math.random() * 9)}</sub>
                            {Math.floor(Math.random() * 9)}
                          </span>
                        </div>
                      </div>
                    </span>
                    <span className="contents">
                      <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 group/image text-nowrap z-20">
                        <span className="text-textTertiary text-[11px] font-medium">TX <span className="text-textPrimary text-[11px] font-medium">{token.txCount}</span></span>
                        <div className="flex flex-row flex-1 min-w-6 max-w-6 h-0.5 bg-secondaryStroke rounded-full overflow-hidden">
                          <div className="h-0.75 bg-increase w-full"></div>
                          <div className="h-0.75 bg-decrease w-0"></div>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full gap-3 pl-3 pr-3 sm:pr-4 pt-3 pb-0.5 justify-start items-center">
                {/* LEFT: IMAGE + ADDRESS */}
                <div className="flex flex-col items-center gap-1">
                  <div className="relative w-18.5 h-18.5 justify-center items-center">
                    {/* Migration badge
                    {token.migrationProgress !== undefined && (
                      <span className="contents">
                        <div className="flex bg-virtualCurve absolute -bottom-1 -right-1 p-px w-4 h-4 justify-center items-center rounded-full z-30">
                          <div className="flex justify-center items-center bg-background absolute w-3.5 h-3.5 rounded-full z-30">
                            <img
                              alt="Migration"
                              loading="eager"
                              width="10"
                              height="10"
                              decoding="async"
                              src="/virtual-curve.svg"
                              className="text-transparent object-cover"
                            />
                          </div>
                        </div>
                      </span>
                    )} */}

                    {/* Token image */}
                    <div className="bg-virtualCurve/20 absolute flex p-px justify-start items-center rounded-lg z-20">
                      <div className="bg-backgroundSecondary flex p-0.5 justify-start items-center rounded-[3px]">
                        <div className="w-17 h-17 shrink-0 group/image relative">
                          <div className="w-full h-full relative">
                            <div className="pointer-events-none border-textPrimary/10 border absolute w-17 h-17 z-10 rounded-[1px]" />

                            <img
                              alt={token.name}
                              loading="lazy"
                              width="68"
                              height="68"
                              decoding="async"
                              src={token.imageUrl || "/placeholder.svg"}
                              className="rounded-[1px] w-17 h-17 object-cover text-transparent"
                              />

                            <button className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <i className="ri-camera-line text-white text-[24px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress border */}
                    {token.migrationProgress !== undefined && (
                      <div className="absolute top-0 left-0 w-18.5 h-18.5 rounded-lg z-10 flex items-center justify-center">
                        <div className="inline-flex items-center justify-center">
                          <svg width="78" height="78" viewBox="0 0 78 78">
                            <path
                              className="text-virtualCurve opacity-40"
                              stroke="currentColor"
                              fill="transparent"
                              strokeWidth="1"
                              d="
                              M 76 76
                                L 6 76
                                Q 2 76 2 72
                                L 2 6
                                Q 2 2 6 2
                                L 72 2
                                Q 76 2 76 6
                                L 76 72
                                Q 76 76 76 76
                                "
                                />
                            <path
                              className="text-virtualCurve transition-all duration-300 ease-in-out"
                              stroke="currentColor"
                              fill="transparent"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeDasharray="296"
                              strokeDashoffset={296 - (296 * (token.migrationProgress ?? 0)) / 100}
                              d="
                              M 76 76
                                L 6 76
                                Q 2 76 2 72
                                L 2 6
                                Q 2 2 6 2
                                L 72 2
                                Q 76 2 76 6
                                L 76 72
                                Q 76 76 76 76
                                "
                                />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contract address */}
                  <span className="contents">
                    <span className="text-textTertiary text-[12px] font-medium text-center max-w-18.5">
                      <button
                        type="button"
                        className="text-textTertiary hover:text-primaryBlueHover transition-colors duration-125 text-[12px] font-medium text-center max-w-18.5 flex items-center gap-1 group/copy"
                        >
                        <span>{formatAddress(token.contractAddress, 4)}</span>
                      </button>
                    </span>
                  </span>
                </div>

                {/* RIGHT: INFO */}
                <div className="flex flex-col flex-1 h-full justify-between items-start pb-1 overflow-hidden">
                  <div className="flex flex-col w-full gap-0.5 min-w-0">
                    <div className="flex flex-row min-h-4.5 w-full gap-1 justify-between items-start min-w-0">
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 min-w-29.25">
                          {/* Name */}
                          <div className="flex flex-row gap-1 items-center">
                            <div className="truncate text-textPrimary text-[16px] font-medium max-w-30">
                              {token.name}
                            </div>

                            {token.nameAlt && (
                              <div className="min-w-0 flex-1 overflow-hidden">
                                <span className="truncate text-textTertiary text-[14px]">
                                  {token.nameAlt}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Description / Tagline
                          {token.description && (
                            <div className="-mt-[4px] flex gap-[6px] text-[12px] leading-[14px] text-[#f2c366]">
                              <span className="truncate opacity-85">{token.description}</span>
                            </div>
                          )}  */}
                          <div className="flex flex-col flex-1 h-full justify-between items-start pt-0 pb-1 overflow-hidden">
                            {/* <div className="flex flex-col w-full gap-0.5 justify-start items-start min-w-0">
                              <div className="flex flex-row min-h-4.5 w-full gap-1 justify-between items-start min-w-0">
                                <div className="overflow-hidden">
                                  <div className="justify-start items-start min-w-52.5">
                                    <div className="flex flex-row gap-1 justify-start items-center">
                                      <div
                                        className="min-w-0 whitespace-nowrap overflow-hidden truncate text-textPrimary text-[16px] font-medium tracking-[-0.02em]"
                                        style={{ maxWidth: "calc(120px)" }}
                                        >
                                        {token.name}
                                      </div>

                                      <div className="min-w-0 flex-1 overflow-hidden">
                                        <div className="cursor-pointer" role="button" tabIndex={0}>
                                          <span className="flex flex-row gap-1 justify-start items-center text-textTertiary hover:text-primaryBlueHover transition-colors duration-125 min-w-0 overflow-hidden cursor-pointer">
                                            <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-inherit text-[16px] sm:text-[16px] lg:text-[14px] xl:text-[16px] text-left font-medium tracking-[-0.02em] xl:truncate xl:max-w-full block">
                                              {token.nameAlt}
                                            </div>
                                            <i className="text-inherit ri-file-copy-line text-[14px]" />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> */}

                            <div className="flex flex-col w-full gap-0.5">
                              <div className="flex flex-row w-full h-4.5 gap-3 lg:gap-2 xl:gap-3 justify-start items-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-primaryGreen text-[14px] font-medium">{formatAge(token.age)}</span>
                                </div>

                                <div className="flex flex-row shrink-0 gap-2 justify-start items-center [&_i]:text-[16px]">
                                  <a
                                    href="https://x.com/search?q=EMPhHj2p1eCKNGAB9JzTj4EArtBY551NaJTQnsfwH9xZ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                    >
                                    <i className="text-textSecondary ri-search-line text-[16px] hover:text-primaryBlueHover transition-colors duration-125" />
                                  </a>
                                </div>

                                <div className="flex-row flex-1 h-4.5 gap-2 justify-start items-center hidden sm:flex md:hidden lg:hidden xl:flex">
                                  <span className="contents">
                                    <div className="flex flex-row gap-0.5 h-4 justify-start items-center">
                                      <i className="text-textTertiary ri-group-line text-[16px]" />
                                      <span className="text-[12px] font-medium text-textPrimary">{token.holders}</span>
                                    </div>
                                  </span>

                                  <span className="contents">
                                    <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                                      <div className="flex justify-center items-center min-w-4 min-h-4 max-w-4 max-h-4">
                                        <AlignHorizontalDistributeCenter
                                          className="icon-pro-trader text-textTertiary w-4 font-medium"
                                        />
                                      </div>
                                      <span className="text-textPrimary text-[12px] font-medium">{token.proTraders}</span>
                                    </div>
                                  </span>

                                  <span className="contents">
                                    <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                                      <i className="ri-trophy-line text-textTertiary text-[16px]" />
                                      <span className="text-textPrimary text-[12px] font-medium">{token.KOLS}</span>
                                    </div>
                                  </span>

                                  <span className="contents">
                                    <div className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer">
                                      <i className="text-primaryYellow ri-vip-crown-2-line text-[16px] pb-[1.2px]" />
                                      <span className="text-textPrimary text-[12px] font-medium">{token.DevMigrations}/{token.MigrationsCreated}</span>
                                    </div>
                                  </span>
                                </div>
                              </div>

                              <div className="flex flex-row gap-2 items-center text-[11px] mt-px">
                                <span className="contents">
                                  <a href="{token.creatorHandle}" target="_blank" rel="noopener noreferrer" className="text-[#5DBCFF] font-medium font-['IBM_Plex_Sans'] hover:cursor-pointer hover:underline hover:text-[#70c4ff] transition-colors duration-125">
                                    {token.creatorHandle}
                                  </a>
                                </span>
                                <span className="contents">
                                  <span className="text-[#5DBCFF] font-medium flex items-center gap-0.5 cursor-default">
                                    <i className="ri-user-line text-[12px]" />
                                    <span>{token.creatorFollowers}</span>
                                  </span>
                                </span>
                              </div>
                            </div>

                            <div className="flex sm:hidden md:flex lg:flex xl:hidden flex-row flex-1 h-4.5 gap-2 justify-start items-center pt-0.75">
                              <div className="flex flex-row gap-0.5 h-4 justify-start items-center">
                                <i className="text-textTertiary ri-group-line text-[16px]" />
                                <span className="text-[12px] font-medium text-textPrimary">{token.holders}</span>
                              </div>

                              <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                                <img
                                  alt="Pro Traders"
                                  loading="lazy"
                                  width="16"
                                  height="16"
                                  decoding="async"
                                  className="w-4 h-4"
                                  src="https://axiom.trade/images/material-symbols-candlestick-chart.svg?dpl=dpl_4Ca3Zj2XJ91TMtSbofizQkCkrFRS"
                                  style={{ color: "transparent", objectFit: "cover" }}
                                  />
                                <span className="text-textPrimary text-[12px] font-medium">{token.proTraders}</span>
                              </div>

                              <span className="contents">
                                <div className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0">
                                  <i className="ri-trophy-line text-textTertiary text-[16px]" />
                                  <span className="text-textPrimary text-[12px] font-medium">{token.KOLS}</span>
                                </div>
                              </span>

                              <span className="contents">
                                <div className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer">
                                  <i className="text-primaryYellow ri-vip-crown-2-line text-[16px] pb-[1.2px]" />
                                  <span className="text-textPrimary text-[12px] font-medium">{token.DevMigrations}/{token.MigrationsCreated}</span>
                                </div>
                              </span>
                            </div>

                            <div className="hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-6 gap-1 justify-start items-end">
                              <div>
                                <div className="flex flex-row gap-1 shrink-0 h-6 px-1.5 justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border">
                                  <i className={cn("text-[14px] ri-user-star-line", metricsFlashClass(metricFlash?.dev))} />
                                  <span className={cn(
                                    "text-[12px] font-medium",
                                    metricsFlashClass(metricFlash?.dev)
                                  )}>{token.devPercent}%</span>
                                </div>
                              </div>

                              <span className="contents">
                                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-1.25 justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border">
                                  <div className="w-4 h-4 flex items-center justify-center">
                                    <ChefHat className={cn("text-[14px]", metricsFlashClass(metricFlash?.dev))} style={{ fontSize: "12px" }} />
                                  </div>
                                  <span className={cn(
                                    "text-[12px] font-medium",
                                    metricsFlashClass(metricFlash?.dev)
                                  )}>{token.devPercent}%</span>
                                  <span className="text-textSecondary text-[11px] leading-4 font-medium whitespace-nowrap">
                                    {Math.random() > 0.5 ? "1h" : "2h"}
                                  </span>
                                </div>
                              </span>

                              <span className="contents">
                                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-1.25 justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border">
                                  <i className={cn("text-[14px] text-primaryGreen ri-crosshair-2-line", metricsFlashClass(metricFlash?.snipers))} />
                                  <span className={cn(
                                    "text-[12px] font-medium",
                                    metricsFlashClass(metricFlash?.snipers)
                                  )}>{token.snipersCount}%</span>
                                </div>
                              </span>

                              <span className="contents">
                                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-1.25 justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border">
                                  <i className={cn("text-[14px] text-primaryGreen ri-ghost-line", metricsFlashClass(metricFlash?.insiders))} />
                                  <span className={cn(
                                    "text-[12px] font-medium",
                                    metricsFlashClass(metricFlash?.insiders)
                                  )}>{token.insiderPercent}%</span>
                                </div>
                              </span>

                              <span className="contents">
                                <div className="flex flex-row gap-1 shrink-0 w-fit h-6 px-1.25 justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border">
                                  <div className="flex justify-center items-center min-w-3.5 min-h-3.5 max-w-3.5 max-h-3.5">
                                    <Boxes className={cn("text-[14px]", metricsFlashClass(metricFlash?.bundles))} style={{ fontSize: "12px" }} />
                                  </div>
                                  <span className={cn(
                                    "text-[12px] font-medium",
                                    metricsFlashClass(metricFlash?.bundles)
                                  )}>{token.bundlePercent}%</span>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
    </div>
  )

})

function StatItem({
  icon,
  value,
  time,
  isPositive,
}: {
  icon: string
  value: string
  time?: string
  isPositive: boolean
}) {
  return (
    <div className="flex items-center gap-0.5">
      <span>{icon}</span>
      <span className={cn(isPositive ? "text-axiom-green" : "text-axiom-red")}>{isPositive ? "↑" : "↓"}</span>
      <span className={cn(isPositive ? "text-axiom-green" : "text-axiom-red")}>{value}</span>
      {time && <span className="text-muted-foreground">{time}</span>}
    </div>
  )
}
