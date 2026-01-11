import { cn } from "@/lib/utils"

interface TokenCardSkeletonProps {
  className?: string
}

export function TokenCardSkeleton({ className }: TokenCardSkeletonProps) {
  return (
    <div className="w-full h-29">
      <div>
        <span className="contents" />
        <span className="contents">
          <div
            className={cn(
              `
                border-primaryStroke/50 border-b
                flex flex-col w-full justify-start items-center
                relative overflow-hidden
                h-[142px] min-h-[142px]
                sm:h-[116px] sm:min-h-[116px]
                md:h-[142px] md:min-h-[142px]
                lg:h-[142px] lg:min-h-[142px]
                xl:h-[116px] xl:min-h-[116px]
              `,
              className,
            )}
          >
            <div className="w-full h-full flex flex-col">
              {/* MARKET CAP / VOLUME skeleton */}
              <div className="absolute right-4 top-4 z-10">
                <div className="flex flex-col gap-0.5 items-end">
                  <div className="relative">
                    <div className="absolute -top-3 -right-2 bottom-px -left-1 z-0">
                      <div className="absolute inset-0 bg-backgroundSecondary" />
                    </div>
                    <div className="relative flex gap-2 justify-end items-end z-20">
                      <div className="flex flex-row h-4.5 gap-1 justify-end items-end">
                        {/* <span className="text-textTertiary text-[12px] font-medium pb-[1.6px]">MC</span> */}
                        <div className="h-4 w-14 bg-primaryStroke/50 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -top-3 -right-2 bottom-px -left-1">
                      <div className="absolute inset-0 bg-backgroundSecondary" />
                    </div>
                    <div className="relative flex gap-2 justify-end items-end z-20">
                      <div className="flex flex-row h-4.5 gap-1 justify-end items-end">
                        {/* <span className="text-textTertiary text-[12px] font-medium pb-[1.6px]">V</span> */}
                        <div className="h-4 w-12 bg-primaryStroke/50 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-row gap-2 justify-start items-start mt-0.5">
                    <div className="absolute z-0 -top-0.5 -right-2 -bottom-1 -left-1">
                      <div className="bg-backgroundSecondary absolute inset-0 z-0" />
                    </div>
                    <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 z-20">
                      {/* <span className="text-textTertiary text-[11px] font-medium">F</span> */}
                      <div className="h-3 w-10 bg-primaryStroke/50 rounded animate-pulse" />
                    </div>
                    <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 z-20">
                      {/* <span className="text-textTertiary text-[11px] font-medium">TX</span> */}
                      <div className="h-3 w-6 bg-primaryStroke/50 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full gap-3 pl-3 pr-3 sm:pr-4 pt-3 pb-0.5 justify-start items-center">
                {/* LEFT: IMAGE skeleton */}
                <div className="flex flex-col items-center gap-1">
                  <div className="relative w-18.5 h-18.5 justify-center items-center">
                    <div className="bg-primaryStroke/30 absolute flex p-px justify-start items-center rounded-lg z-20">
                      <div className="bg-backgroundSecondary flex p-0.5 justify-start items-center rounded-[3px]">
                        <div className="w-17 h-17 shrink-0 relative">
                          <div className="w-full h-full bg-primaryStroke/50 rounded-[1px] animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contract address skeleton */}
                  <div className="h-4 w-16 bg-primaryStroke/50 rounded animate-pulse mt-0.5" />
                </div>

                {/* RIGHT: INFO skeleton */}
                <div className="flex flex-col flex-1 h-full justify-between items-start pb-1 overflow-hidden">
                  <div className="flex flex-col w-full gap-0.5 min-w-0">
                    <div className="flex flex-row min-h-4.5 w-full gap-1 justify-between items-start min-w-0">
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 min-w-29.25">
                          {/* Name skeleton */}
                          <div className="flex flex-row gap-1 items-center">
                            <div className="h-5 w-24 bg-primaryStroke/50 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-primaryStroke/30 rounded animate-pulse" />
                          </div>

                          <div className="flex flex-col flex-1 h-full justify-between items-start pt-0 pb-1 overflow-hidden">
                            <div className="flex flex-col w-full gap-0.5">
                              {/* Age and icons row skeleton */}
                              <div className="flex flex-row w-full h-4.5 gap-3 lg:gap-2 xl:gap-3 justify-start items-center">
                                <div className="h-4 w-8 bg-primaryGreen/30 rounded animate-pulse" />
                                <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />

                                <div className="flex-row flex-1 h-4.5 gap-2 justify-start items-center hidden sm:flex md:hidden lg:hidden xl:flex">
                                  <div className="flex flex-row gap-0.5 h-4 items-center">
                                    <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                    <div className="h-3 w-6 bg-primaryStroke/50 rounded animate-pulse" />
                                  </div>
                                  <div className="flex flex-row gap-0.5 h-4 items-center">
                                    <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                    <div className="h-3 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                  </div>
                                  <div className="flex flex-row gap-0.5 h-4 items-center">
                                    <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                    <div className="h-3 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                  </div>
                                  <div className="flex flex-row gap-0.5 h-4 items-center">
                                    <div className="h-4 w-4 bg-primaryYellow/30 rounded animate-pulse" />
                                    <div className="h-3 w-8 bg-primaryStroke/50 rounded animate-pulse" />
                                  </div>
                                </div>
                              </div>

                              {/* Creator handle skeleton */}
                              <div className="flex flex-row gap-2 items-center text-[11px] mt-px">
                                <div className="h-3 w-20 bg-[#5DBCFF]/30 rounded animate-pulse" />
                                <div className="h-3 w-12 bg-[#5DBCFF]/30 rounded animate-pulse" />
                              </div>
                            </div>

                            {/* Mobile stats row skeleton */}
                            <div className="flex sm:hidden md:flex lg:flex xl:hidden flex-row flex-1 h-4.5 gap-2 justify-start items-center pt-0.75">
                              <div className="flex flex-row gap-0.5 h-4 items-center">
                                <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                <div className="h-3 w-6 bg-primaryStroke/50 rounded animate-pulse" />
                              </div>
                              <div className="flex flex-row gap-0.5 h-4 items-center">
                                <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                <div className="h-3 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                              </div>
                              <div className="flex flex-row gap-0.5 h-4 items-center">
                                <div className="h-4 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                                <div className="h-3 w-4 bg-primaryStroke/50 rounded animate-pulse" />
                              </div>
                              <div className="flex flex-row gap-0.5 h-4 items-center">
                                <div className="h-4 w-4 bg-primaryYellow/30 rounded animate-pulse" />
                                <div className="h-3 w-8 bg-primaryStroke/50 rounded animate-pulse" />
                              </div>
                            </div>

                            {/* Badge pills skeleton */}
                            <div className="hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-6 gap-1 justify-start items-end">
                              <div className="h-6 w-14 bg-backgroundSecondary border-primaryStroke/50 border rounded-full animate-pulse" />
                              <div className="h-6 w-18 bg-backgroundSecondary border-primaryStroke/50 border rounded-full animate-pulse" />
                              <div className="h-6 w-14 bg-backgroundSecondary border-primaryStroke/50 border rounded-full animate-pulse" />
                              <div className="h-6 w-14 bg-backgroundSecondary border-primaryStroke/50 border rounded-full animate-pulse" />
                              <div className="h-6 w-14 bg-backgroundSecondary border-primaryStroke/50 border rounded-full animate-pulse" />
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
}
