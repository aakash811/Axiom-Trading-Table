"use client"

import { Settings, Star, BarChart2, ChevronDown, Volume2, Bookmark, Grid3X3, Bug, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import DisplayModalContent from "../modals/DisplayModalContent";

export function SubHeader() {
  const [displayModalOpen, setDisplayModalOpen] = useState(false);

  return (
    <div>
      <div className="hidden sm:block">
        <div
          className="grayscale-30 hover:grayscale-0 transition-[filter] relative flex flex-row w-full h-7 gap-2 px-4 pb-px overflow-hidden border-b border-primaryStroke sm:border-primaryStroke/50"
        >
          <div className="flex flex-row h-full items-center z-20 gap-2">
            <span className="contents">
              <button
                type="button"
                className="min-w-6 min-h-6 flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-lg"
              >
                <Settings className="w-3.5" />
              </button>
            </span>
          </div>

          <div className="flex flex-row h-full items-center z-20 gap-2">
            <div className="w-px h-4 bg-primaryStroke" />
          </div>

          <div className="flex flex-row h-full items-center z-20 gap-2">
            <span className="contents">
              <button
                type="button"
                className="min-w-6 min-h-6 flex items-center justify-center text-textSecondary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-lg"
              >
                <Star className=" w-3.5" />
              </button>
            </span>

            <span className="contents">
              <button
                type="button"
                className="min-w-6 min-h-6 flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-lg"
              >
                <LineChart className="w-3.5" />
              </button>
            </span>
          </div>

          <div className="flex flex-row h-full items-center z-20 gap-2">
            <div className="w-px h-4 bg-primaryStroke" />
          </div>

          <div className="flex flex-row justify-start items-center flex-1 overflow-hidden show-bins-container duration-150 ease-in-out">
            <div
              className="h-full flex flex-row gap-px pt-px items-center overflow-x-auto ticker-scroll-container
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] animate-ticker"
            >
              <div
                style={{
                  width: "0px",
                  height: "100%",
                  position: "relative",
                  display: "flex",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-start items-center gap-4 pt-8 px-4 lg:px-6 overflow-hidden">
        <div className="flex-1 flex items-center gap-3">
          <span className="text-textPrimary text-[20px] font-medium">Pulse</span>

          <div className="flex items-center gap-1">
            <span className="contents">
              <button
                type="button"
                aria-label="Switch to Solana"
                className="
                  relative flex items-center justify-center
                  w-8 h-8 rounded-full
                  transition-all duration-150
                  bg-primaryStroke/60 scale-110
                "
              >
                <img
                  alt="SOL"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  src="/solana.svg"
                  style={{ color: "transparent" }}
                />
              </button>
            </span>

            <span className="contents">
              <button
                type="button"
                aria-label="Switch to BNB"
                className="
                  relative flex items-center justify-center
                  w-8 h-8 rounded-full
                  transition-all duration-150
                  hover:bg-primaryStroke/30 opacity-60 hover:opacity-100
                "
              >
                <img
                  alt="BNB"
                  loading="lazy"
                  width="20"
                  height="20"
                  decoding="async"
                  data-nimg="1"
                  className="grayscale-[0.3]"
                  src="/BNB.svg"
                  style={{ color: "transparent" }}
                />
              </button>
            </span>
          </div>
        </div>

        <div className="pr-2" />

        <div className="flex flex-row gap-4 items-center">
          <span className="contents">
            <button type="button" className="flex flex-row w-6 h-6 justify-center items-center">
              <i className="ri-question-line text-[20px] text-textTertiary hover:text-textSecondary transition-all duration-150 ease-in-out" />
            </button>
          </span>

          <div className="relative flex">
            <div data-state="closed" className="w-full" onClick={() => setDisplayModalOpen(true)}>
              <button
                className="
                  bg-primaryStroke flex flex-row h-8 px-3 gap-2
                  justify-center items-center rounded-full
                  hover:bg-secondaryStroke/80 transition-color duration-150 ease-in-out
                "
              >
                <div className="relative">
                  <i className="ri-list-check text-[18px] text-textPrimary" />
                </div>

                <div className="whitespace-nowrap flex flex-row gap-1 justify-start items-center">
                  <span className="text-[14px] font-bold text-textPrimary">Display</span>
                </div>

                <i className="ri-arrow-down-s-line text-[18px] text-textPrimary" />
              </button>
            </div>

            {displayModalOpen && (
              <div className="absolute top-10 right-0 z-50">
                <DisplayModalContent open={displayModalOpen} onClose={() => setDisplayModalOpen(false)} />
              </div>
            )}  
          </div>

          <span className="contents">
            <button
              type="button"
              className="-mr-1.25 group flex items-center justify-center w-8 h-8 bg-background hover:bg-primaryStroke/60 transition-colors relative rounded-full"
            >
              <i className="ri-bookmark-line text-textSecondary group-hover:text-textPrimary" style={{ fontSize: 16 }} />
            </button>
          </span>

          <span className="contents">
            <button
              type="button"
              className="-mr-1.25 group flex items-center justify-center w-8 h-8 relative rounded-full
                hover:bg-primaryStroke/60 bg-transparent transition-all duration-150
                ease-in-out"
            >
              <i className="ri-keyboard-box-line text-[16px] text-textSecondary group-hover:text-textPrimary" />
            </button>
          </span>

          <span className="contents">
            <button
              type="button"
              className="-mr-1.25 group flex items-center justify-center w-8 h-8 bg-background hover:bg-primaryStroke/60 transition-colors relative rounded-full"
            >
              <i className="ri-volume-up-line text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors duration-150 ease-in-out" />
            </button>
          </span>

          <span className="contents">
            <button
              type="button"
              className="group flex items-center justify-center w-8 h-8 bg-background hover:bg-primaryStroke/60 transition-colors relative rounded-full"
            >
              <i className="ri-crosshair-2-line text-textSecondary group-hover:text-textPrimary text-[16px]" />
              <i className="ri-settings-3-line text-[12px] text-textSecondary group-hover:text-textPrimary absolute bottom-0 right-0" />
            </button>
          </span>

          <div className="relative flex">
            <div data-state="closed" className="w-full">
              <span className="contents">
                <button
                  type="button"
                  className="
                    flex border border-primaryStroke group flex-row
                    p-1 pr-3 pl-3 h-8 gap-2
                    justify-center items-center hover:bg-primaryStroke/35
                    transition-colors duration-125 cursor-pointer rounded-full
                  "
                >
                  <div className="flex flex-row gap-1 justify-center items-center">
                    <i className="ri-wallet-line text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors duration-150 ease-in-out cursor-pointer" />
                    <span className="text-[14px] text-textSecondary font-medium group-hover:text-textPrimary transition-colors duration-150 ease-in-out cursor-pointer">
                      1
                    </span>
                  </div>

                  <div className="flex flex-row gap-1 justify-center items-center">
                    <img
                      alt="SOL"
                      loading="lazy"
                      width="16"
                      height="16"
                      decoding="async"
                      data-nimg="1"
                      src="/solana.svg"
                      style={{ color: "transparent" }}
                    />
                    <span className="text-[14px] text-textPrimary font-medium group-hover:text-textPrimary transition-colors duration-150 ease-in-out cursor-pointer">
                      <span>0</span>
                    </span>
                  </div>

                  <i className="ri-arrow-down-s-line text-[18px] text-textSecondary group-hover:text-textPrimary transition-colors duration-150 ease-in-out cursor-pointer" />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
