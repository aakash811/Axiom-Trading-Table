"use client"

import { Rocket } from "lucide-react"
import { useEffect, useRef } from "react"

interface UserModalContentProps {
  open: boolean
  onClose: () => void
}

export default function UserModalContent({
  open,
  onClose,
}: UserModalContentProps) {
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
        right-[24px]
        top-[48px]
        translate-y-1
        rounded-[4px]
        shadow-dropdown
        bg-backgroundTertiary
        border border-secondaryStroke
        origin-top-right
      "
    >
      <div className="flex flex-col gap-[4px] p-[4px] w-[216px]">
        {/* Account & Security */}
        <button
          type="button"
          className="
            flex items-center gap-[8px]
            px-[12px]
            h-[40px] sm:h-[36px]
            w-full text-left justify-start
            rounded-[8px] sm:rounded-[4px]
            hover:bg-secondaryStroke/60
            transition-colors
            group
          "
        >
          <i className="ri-user-line text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors" />
          <span className="text-textPrimary text-[14px] font-medium group-hover:text-textPrimary transition-colors">
            Account and Security
          </span>
        </button>

        {/* Settings */}
        <button
          type="button"
          className="
            flex items-center gap-[8px]
            px-[12px]
            h-[40px] sm:h-[36px]
            w-full text-left justify-start
            rounded-[8px] sm:rounded-[4px]
            hover:bg-secondaryStroke/60
            transition-colors
            group
          "
        >
          <i className="ri-settings-2-line text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors" />
          <span className="text-textPrimary text-[14px] font-medium group-hover:text-textPrimary transition-colors">
            Settings
          </span>
        </button>

        {/* Auto Translate */}
        <button
          type="button"
          className="
            flex items-center gap-[8px]
            px-[12px]
            h-[40px] sm:h-[36px]
            w-full text-left justify-start
            rounded-[8px] sm:rounded-[4px]
            hover:bg-secondaryStroke/60
            transition-colors
            group
          "
        >
          <i className="ri-translate-2 text-[16px] text-textSecondary group-hover:text-textPrimary transition-colors" />
          <span className="text-textPrimary text-[14px] font-medium group-hover:text-textPrimary transition-colors">
            Auto Translate
          </span>
        </button>

        {/* Feature Updates */}
        <button
          type="button"
          className="
            flex items-center gap-[8px]
            px-[12px]
            h-[40px] sm:h-[36px]
            w-full text-left justify-start
            rounded-[8px] sm:rounded-[4px]
            hover:bg-secondaryStroke/60
            transition-colors
            group
          "
        >
          <Rocket className="w-4 text-textSecondary group-hover:text-textPrimary transition-colors" />
          <span className="text-textPrimary text-[14px] font-medium group-hover:text-textPrimary transition-colors">
            Feature Updates
          </span>
        </button>

        {/* Logout */}
        <button
          type="button"
          className="
            mt-[4px]
            flex items-center gap-[8px]
            px-[12px]
            h-[40px] sm:h-[36px]
            w-full text-left justify-start
            rounded-[8px] sm:rounded-[4px]
            hover:bg-secondaryStroke/60
            transition-colors
            group
          "
        >
          <i className="ri-logout-box-line text-[16px] text-decrease group-hover:text-decrease transition-colors" />
          <span className="text-decrease text-[14px] font-medium">
            Log Out
          </span>
        </button>
      </div>
    </div>
  )
}
