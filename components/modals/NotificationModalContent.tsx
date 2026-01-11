"use client"

import { X } from "lucide-react"

interface NotificationsDropdownProps {
  open: boolean
  onClose: () => void
}

export default function NotificationsDropdown({
  open,
  onClose,
}: NotificationsDropdownProps) {
  if (!open) return null
  return (
    <>
      <div
        className="fixed inset-0 z-[9998]"
        onClick={onClose}
      />

      <div
        className="
          fixed
          top-[48px] right-[288px]
          z-[9999]
          translate-y-1
          opacity-100
          rounded-[4px]
          shadow-dropdown
          bg-backgroundTertiary
          border border-secondaryStroke
          origin-top-right
        "
      >
        <div className="flex flex-col w-[300px] h-[396px]">
          <div
            className="
              flex flex-row items-center
              w-full h-[44px]
              pl-[16px] pr-[12px]
              border-b border-secondaryStroke
            "
          >
            <span
              className="
                flex-1
                text-textPrimary text-[14px]
                leading-[20px]
                tracking-[-0.02em]
                font-normal
              "
            >
              Notifications
            </span>

            <button
              className="
                group flex items-center justify-center
                p-[6px] h-[24px] mr-2
                rounded-[4px]
                text-[14px]
                hover:bg-primaryStroke/60
                transition-colors duration-150
              "
            >
              <span className="text-textTertiary group-hover:text-textPrimary">
                Clear All
              </span>
            </button>

            <button
              onClick={onClose}
              className="
                group flex items-center justify-center
                p-[4px] w-[22px] h-[22px]
                rounded-[4px]
                hover:bg-primaryStroke/60
                transition-colors duration-150
              "
            >
              <X className="w-[18px] h-[18px] text-textTertiary group-hover:text-textPrimary" />
            </button>
          </div>

          <div className="flex flex-col flex-1 w-full overflow-y-auto">
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-textSecondary text-[14px] font-medium">
                No notifications
              </span>
              <span className="text-textTertiary text-[12px] max-w-[220px]">
                You’ll see updates about price alerts, trades, and system events here.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
