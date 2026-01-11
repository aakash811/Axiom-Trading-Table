"use client"

import { memo, useState } from "react"
import { Modal } from "../ui/Modal"
import dynamic from "next/dynamic"

const ExchangeModal = dynamic(() => import("../modals/DepositModalContent"))
const WatchListModal = dynamic(() => import("../modals/WatchListModalContent"))
const NotificationModalContent = dynamic(() => import("../modals/NotificationModalContent"))
const WalletModalContent = dynamic(() => import("../modals/WalletModalContent"))
const UserModalContent = dynamic(() => import("../modals/UserModalContent"))

const Bell = dynamic(() => import("lucide-react").then(m => m.Bell))
const Star = dynamic(() => import("lucide-react").then(m => m.Star))
const Wallet = dynamic(() => import("lucide-react").then(m => m.Wallet))
const ChevronDown = dynamic(() => import("lucide-react").then(m => m.ChevronDown))
const ChevronRight = dynamic(() => import("lucide-react").then(m => m.ChevronRight))
const Search = dynamic(() => import("lucide-react").then(m => m.Search))
const UserRoundCog = dynamic(() => import("lucide-react").then(m => m.UserRoundCog))

export const Header = memo(function Header() {
  const navbar = ["Discover", "Pulse", "Trackers", "Perpetuals", "Yield", "Vision", "Portfolio"]
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<"SOL" | "BNB">("SOL");
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [watchListModalOpen, setWatchListModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [userSettingsModalOpen, setUserSettingsModalOpen] = useState(false);

  const options = [
    { label: "Solana", value: "SOL", icon: "/solana.svg" },
    { label: "BNB", value: "BNB", icon: "/BNB.svg" },
  ]

  const newLocal = "hidden sm:flex bg-primaryBlue h-8 px-3 flex-row justify-start items-center rounded-full hover:bg-primaryBlueHover"
  return (
    <header className="h-16 border-b border-border bg-background flex flex-row w-full items-center justify-start px-4 gap-4">
      {/* Logo */}
      <div className="flex flex-row items-center">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 sm:w-9 sm:h-9 text-textPrimary">
            <g clip-path="url(#clip0_88_28967)">
              <path d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z" fill="currentColor"></path>
              <path d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z" fill="currentColor"></path>
            </g>
            <defs>
              <clipPath id="clip0_88_28967">
                <rect width="26" height="22" fill="white" transform="translate(5 7)"></rect>
              </clipPath>
            </defs>
        </svg>
        <svg width="102" height="21" viewBox="0 0 103 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-25.5 hidden 2xl:block text-textPrimary">
          <path d="M56.1914 18.3745V1.33447H59.7434L64.8074 15.3265L69.8714 1.33447H73.4234V18.3745H70.8314V5.89447L66.2474 18.3505H63.3674L58.7834 5.89447V18.3745H56.1914Z" fill="currentColor"></path>
          <path d="M45.9362 18.7584C40.9922 18.7584 37.9922 15.3984 37.9922 9.87844C37.9922 4.35844 40.9922 0.950439 45.9362 0.950439C50.9282 0.950439 53.9042 4.35844 53.9042 9.87844C53.9042 15.3984 50.9282 18.7584 45.9362 18.7584ZM45.9362 16.3824C49.2482 16.3824 51.2162 13.9824 51.2162 9.87844C51.2162 5.77444 49.2482 3.32644 45.9362 3.32644C42.6482 3.32644 40.6802 5.77444 40.6802 9.87844C40.6802 13.9824 42.6482 16.3824 45.9362 16.3824Z" fill="currentColor"></path>
          <path d="M33.1055 18.3745V1.33447H35.6975V18.3745H33.1055Z" fill="currentColor"></path>
          <path d="M16.9023 18.3745L22.5663 9.83047L16.9503 1.33447H19.9983L24.1983 7.81447L28.3263 1.33447H31.3503L25.7343 9.78247L31.4223 18.3745H28.3743L24.1503 11.7985L19.9263 18.3745H16.9023Z" fill="currentColor"></path>
          <path d="M0.980469 18.3745L7.12447 1.33447H10.4125L16.5565 18.3745H13.7965L12.2365 13.9345H5.27647L3.74047 18.3745H0.980469ZM6.09247 11.5825H11.4445L8.75647 3.80647L6.09247 11.5825Z" fill="currentColor"></path>
          <path d="M99.2929 18.6624C97.0311 18.6624 95.5703 16.9661 95.5703 14.3116C95.5703 11.6571 97.0311 9.96069 99.2929 9.96069C101.539 9.96069 103 11.6571 103 14.3116C103 16.9661 101.539 18.6624 99.2929 18.6624ZM99.2929 17.6729C100.926 17.6729 101.916 16.4006 101.916 14.3116C101.916 12.2225 100.926 10.9502 99.2929 10.9502C97.6437 10.9502 96.6541 12.2225 96.6541 14.3116C96.6541 16.4006 97.6437 17.6729 99.2929 17.6729Z" fill="currentColor"></path>
          <path d="M90.9961 18.4742V10.1494H91.8914L91.9385 11.7987C92.2684 10.6835 92.9438 10.1494 94.0276 10.1494H94.7501V11.1547H93.9962C92.7396 11.1547 92.0328 12.0186 92.0328 13.4008V18.4742H90.9961Z" fill="currentColor"></path>
          <path d="M81.2461 18.4741V7.32202H85.1572C87.6075 7.32202 89.0525 8.57859 89.0525 10.6519C89.0525 12.7253 87.6075 13.9818 85.1572 13.9818H82.3142V18.4741H81.2461ZM82.3142 12.9452H85.1572C86.9792 12.9452 87.9216 12.1441 87.9216 10.6519C87.9216 9.14405 86.9792 8.35869 85.1572 8.35869H82.3142V12.9452Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Navigation */}
      <nav className="relative flex hidden sm:flex flex-1 min-w-0">
        <div className="absolute right-0 top-0 w-8 h-full z-40 bg-linear-to-l from-background to-transparent flex items-center justify-end pointer-events-none">
          <button className="absolute right-0 w-6 h-6 flex items-center justify-center text-textSecondary hover:text-textPrimary transition-all duration-125 ease-in-out opacity-0">
            <ChevronRight className="text-[20px] mb-px"></ChevronRight>
          </button>
        </div>
        <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex flex-row gap-1 justify-start items-center">
            {navbar.map((item, index) => (
            <a href="#">
              <button className="flex flex-row h-8 text-nowrap px-2 xl:px-3.5 justify-start items-center [transition:none] duration-0
                hover:bg-[#526fff33] hover:text-[#526fff] hover:[transition:background-color_135ms_ease-in-out,color_135ms_ease-in-out] rounded-lg
                text-textPrimary">
                  <span className="text-sm font-medium">
                    {item}
                  </span>
              </button>
            </a>))}
          </div>
        </div>
      </nav>

      {/* Search */}
      <div className="flex flex-row gap-4 justify-start items-center">
        <div className="relative">
          <div>
            <button type="button" className="hidden sm:flex shrink-0 whitespace-nowrap border-primaryStroke font-normal border flex-row h-8 sm:px-2 md:px-2 lg:px-2 2xl:pl-3 2xl:pr-1.5 gap-2 justify-center items-center rounded-full hover:bg-primaryStroke/35 transition-colors duration-125 cursor-pointer">
              <Search className="w-4.5 text-textPrimary"></Search>
              <span className="text-xs text-textTertiary font-medium hidden 2xl:block">Search by token or CA...</span>
              <div className="hidden 2xl:block border-primaryStroke border text-[12px] h-5 flex-row px-2 gap-2 justify-center items-center rounded-full">
                <span className="text-textPrimary">/</span>
              </div>
            </button>
            </div>
        </div>
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
          />
        )}

        <div>
          <div className="hidden sm:block">
            <div className="relative flex z-50">
              <div data-state={open ? "open" : "closed"} className="w-full">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="hover:brightness-125 border-2 flex shrink-0 flex-row h-8 pl-2 pr-1.5 gap-1.5 justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-[0.96] border-[rgba(20,241,149,0.1)]"
                >
                  <img
                    alt={selected === "SOL" ? "Solana" : "BNB"}
                    loading="lazy"
                    width="20"
                    height="20"
                    src={selected === "SOL" ? "/solana.svg" : "/BNB.svg"}
                    className="bg-transparent"
                  />
                  <span className="text-[14px] text-textPrimary font-medium">
                    {selected}
                  </span>
                  <ChevronDown
                    className={`text-textPrimary text-[18px] transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* DROPDOWN */}
                {open && (
                  <div className="absolute top-10 left-0 z-50 w-full rounded-lg bg-backgroundSecondary border border-primaryStroke shadow-xl overflow-hidden">
                    <button
                      onClick={() => {
                        setSelected("SOL")
                        setOpen(false)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 hover:bg-primaryStroke/50 transition-colors"
                    >
                      <img src="/solana.svg" className="w-4 h-4" />
                      <span className="text-sm text-textPrimary">Solana</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelected("BNB")
                        setOpen(false)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-2 hover:bg-primaryStroke/50 transition-colors"
                    >
                      <img src="/bnb.svg" className="w-4 h-4" />
                      <span className="text-sm text-textPrimary">BNB</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
            onClick={() => setDepositModalOpen(true)}
            className="hidden sm:flex bg-primaryBlue h-8 px-3 flex-row justify-start items-center rounded-full hover:bg-primaryBlueHover"
          >
            <span className="text-nowrap text-background text-[14px] font-bold">
              Deposit
            </span>
          </button>

        {depositModalOpen && (
          <Modal
            open={depositModalOpen}
            onClose={() => setDepositModalOpen(false)}
          >
            <ExchangeModal onClose={() => setDepositModalOpen(false)} />
          </Modal>
        )}
        <div className="hidden sm:flex items-center gap-2 lg:gap-4">
          <button className="bg-primaryStroke hover:bg-secondaryStroke/80 flex w-8 h-8 items-center justify-center rounded-full">
            <Star onClick={() => setWatchListModalOpen(true)} className="w-4.5 text-textPrimary" />
          </button>

          {watchListModalOpen && (
            <Modal
              open={watchListModalOpen}
              onClose={() => setWatchListModalOpen(false)}
            >
              <WatchListModal onClose={() => setWatchListModalOpen(false)} />
            </Modal>
          )}

          <div className="relative flex">
            <div data-state="closed" className="w-full">
              <button className="relative bg-primaryStroke hover:bg-secondaryStroke/80 flex w-8 h-8 items-center justify-center rounded-full">
                <Bell onClick={() => setNotificationModalOpen(true)} className="w-4.5 text-textPrimary" />
              </button>

              {notificationModalOpen && (
              <Modal
                open={notificationModalOpen}
                onClose={() => setNotificationModalOpen(false)}
              >
                <NotificationModalContent open={notificationModalOpen} onClose={() => setNotificationModalOpen(false)} />
              </Modal>
            )}
            </div>
          </div>
        </div>
        <div className="relative flex">
          <div
            className="w-full"
            data-state="closed"
            onClick={() => setWalletModalOpen(true)}
          >
            <div className="shrink-0">
              <button
                type="button"
                className="w-fit min-w-max bg-primaryStroke flex flex-row h-8 px-3 py-2 gap-2 justify-center items-center rounded-full hover:bg-opacity-80 transition-colors hover:bg-secondaryStroke/80"
              >
                <Wallet className="text-textPrimary w-4.5" />

                <div className="hidden xl:flex shrink-0 whitespace-nowrap flex-row gap-1 justify-start items-center">
                  <img src="/solana.svg" alt="SOL" width={16} height={16} />
                  <span className="text-[14px] font-semibold text-textPrimary">0</span>
                </div>

                <div className="hidden xl:block shrink-0 w-px h-full bg-secondaryStroke" />

                <div className="hidden xl:flex shrink-0 whitespace-nowrap flex-row gap-1 justify-start items-center">
                  <img src="/cash.svg" alt="USDC" width={18} height={28} />
                  <span className="text-[14px] font-semibold text-textPrimary">0</span>
                </div>

                <ChevronDown className="text-textPrimary w-4.5" />
              </button>
            </div>
          </div>
        </div>

        {walletModalOpen && (
            <Modal
                open={walletModalOpen}
                onClose={() => setWalletModalOpen(false)}
              >
                <WalletModalContent open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
            </Modal>
        )}


        <span className="contents">
          <button type="button" className="flex flex-row w-7 h-7 justify-center items-center rounded-full relative overflow-visible transition-all duration-150 ease-in-out active:scale-[0.96]
          border-transparent bg-primaryStroke hover:bg-secondaryStroke/80 hover:border-transparent">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <div className="absolute inset-0 w-full h-full border-white/10 border z-15 pointer-events-none rounded-full"></div>
              <img alt="User" draggable="false" loading="lazy" decoding="async" data-nimg="fill" 
              className="object-cover transition-all duration-150 brightness-100 hover:brightness-110 absolute h-full w-full inset-0 bg-transparent;" 
              src="data:image/svg+xml,%0A%20%20%20%20%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22grad-1674782997%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3Ahsl(357%2C%2077%25%2C%2057%25)%3Bstop-opacity%3A1%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3Ahsl(134%2C%2077%25%2C%2047%25)%3Bstop-opacity%3A1%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22url(%23grad-1674782997)%22%20%2F%3E%0A%20%20%20%20%20%20%3Ctext%0A%20%20%20%20%20%20%20%20x%3D%2250%25%22%0A%20%20%20%20%20%20%20%20y%3D%2250%25%22%0A%20%20%20%20%20%20%20%20dominant-baseline%3D%22central%22%0A%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%0A%20%20%20%20%20%20%20%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%0A%20%20%20%20%20%20%20%20font-size%3D%2248%22%0A%20%20%20%20%20%20%20%20font-weight%3D%22600%22%0A%20%20%20%20%20%20%20%20fill%3D%22white%22%0A%20%20%20%20%20%20%20%20opacity%3D%220.95%22%0A%20%20%20%20%20%20%3E4C%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20"/>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-background z-20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primaryGreen"></div>
            </div>
          </button>
        </span>
        <div className="relative flex">
          <div data-state="closed" className="w-full">
            <button onClick={() => setUserSettingsModalOpen(true)} className="relative bg-primaryStroke hover:bg-secondaryStroke/80 flex w-8 h-8 items-center justify-center rounded-full">
              <UserRoundCog className="w-4.5 text-textPrimary" />
            </button>

            {userSettingsModalOpen && (
              <Modal
                  open={userSettingsModalOpen}
                  onClose={() => setUserSettingsModalOpen(false)}
                >
                  <UserModalContent open={userSettingsModalOpen} onClose={() => setUserSettingsModalOpen(false)} />
              </Modal>
            )}
          </div>
        </div>
      </div>
    </header>
  )
})
