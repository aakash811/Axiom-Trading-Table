"use client"

import { Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TokenCategory } from "@/types/token"

interface ColumnHeaderProps {
  title: string
  category: TokenCategory
  filterCount: number
}

export function ColumnHeader({ title, filterCount }: ColumnHeaderProps) {
  return (
    <div className="flex bg-backgroundSecondary rounded-xl sm:rounded-sm overflow-hidden">
      <div className="border-r border-primaryStroke flex flex-1 flex-col h-full justify-start items-center overflow-hidden">
        <div className="sticky top-0 z-30 w-full">
          <div className="hidden sm:flex sticky top-0 z-30 whitespace-nowrap flex-row w-full gap-3 min-h-12 justify-end items-center pr-3 pl-1 lg:pl-3 xl:pl-3 border-b border-primaryStroke">
            <div className="flex flex-row items-center gap-4 flex-1">
              <span className="text-textPrimary text-[16px] font-medium flex-1">{title}</span>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="hidden lg:block">
                <div className="overflow-hidden whitespace-nowrap border-primaryStroke font-normal border flex flex-row h-7 pl-1 gap-1.5 justify-start items-center rounded-full  hover:bg-primaryStroke/35 transition-colors duration-125 cursor-pointer">
                <span className="flex text-[14px] text-textTertiary font-medium">
                  <i className="ri-flashlight-fill"></i>
                </span>
                <div className="flex flex-1 sm:max-w-8 min-w-0">
                  <input
                    defaultValue="0"
                    placeholder="0.0"
                    className="text-[12px] w-full text-textPrimary placeholder:text-textTertiary"
                  />
                </div>
                <img alt="SOL" loading="lazy" width="14" height="14" decoding="async" data-nimg="1" src="/solana.svg" style={{ color: "transparent" }} />
                <div className="border-primaryStroke border-l flex h-full pr-0.5 pl-0.5 gap-0.75 justify-center items-center cursor-pointer">
                  <span className="contents">
                    <button type="button" className="group w-5.5 h-5.5 flex flex-row gap-1 rounded-lg justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryStroke/60">
                      <span className="text-[12px] gap-1 flex flex-row justify-center items-center font-medium transition-colors ease-in-out duration-125 text-textSecondary">P1</span>
                    </button>
                  </span>
                  <span className="contents">
                    <button type="button" className="group w-5.5 h-5.5 flex flex-row gap-1 rounded-lg justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryBlueHover/10">
                      <span className="text-[12px] gap-1 flex flex-row justify-center items-center font-medium transition-colors ease-in-out duration-125 text-primaryBlue hover:text-primaryBlueHover">P2</span>
                    </button>
                  </span>
                  <span className="contents">
                    <button type="button" className="group w-5.5 h-5.5 flex flex-row gap-1 rounded-r-full rounded-l-lg justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryStroke/60">
                      <span className="text-[12px] gap-1 flex flex-row justify-center items-center font-medium transition-colors ease-in-out duration-125 text-textSecondary">P3</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <span className="contents">
              <button type="button" className="flex flex-row p-1 w-6 h-6 justify-center items-center transition-opacity duration-150 ease-in-out cursor-pointer rounded-xl sm:rounded-lg relative hover:bg-primaryStroke/30">
                <i className="ri-equalizer-3-line text-[16px] text-textSecondary"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
