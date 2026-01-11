"use client"

import { useState } from "react"
import { X, Copy, Check } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface ExchangeModalProps {
  onClose: () => void
}

export default function ExchangeModal({ onClose }: ExchangeModalProps) {
  const [activeTab, setActiveTab] = useState("deposit")
  const [copied, setCopied] = useState(false)

  const depositAddress = "0x31ba0b9d2feaee79aa6f5f70e0c7e6ecf11adfb2"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(depositAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-105 bg-[#1a1a1e] rounded-2xl p-5 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-medium">Exchange</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#27272a] rounded-lg p-1 mb-4">
        {["Convert", "Deposit", "Buy"].map((tab) => {
          const value = tab.toLowerCase()
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(value)}
              className={`flex-1 py-2 text-sm font-medium rounded-md ${
                activeTab === value
                  ? "bg-[#3f3f46] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3 mb-4">
        <button className="flex items-center gap-2 bg-[#27272a] rounded-lg px-4 py-2.5 flex-1">
          <div className="w-6 h-6 rounded-full bg-[#f0b90b] flex items-center justify-center text-black font-bold">
            B
          </div>
          <span className="text-sm font-medium">BNB</span>
        </button>

        <div className="flex items-center gap-2 bg-[#27272a] rounded-lg px-4 py-2.5">
          <span className="text-sm text-gray-400">Balance:</span>
          <span className="text-sm font-medium">0 BNB</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-5">
        Only deposit BNB through the BSC network for this address.
      </p>

      <div className="flex gap-5 mb-6">
        <div className="bg-white rounded-xl p-3 w-35 h-35 flex items-center justify-center">
          <QRCodeSVG value={depositAddress} size={120} />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-sm text-gray-400 mb-1">Deposit Address</span>
          <div className="flex items-start gap-2">
            <p className="text-sm font-mono break-all max-w-45">
              {depositAddress}
            </p>
            <button onClick={handleCopy} className="text-gray-400 hover:text-white">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleCopy}
        className="w-full py-3.5 bg-[#5865f2] hover:bg-[#4752c4] rounded-full font-medium"
      >
        {copied ? "Copied!" : "Copy Address"}
      </button>
    </div>
  )
}
