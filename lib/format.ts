// Formatting utilities for the token table

export function formatPrice(price: number): string {
  if (price < 0.00001) {
    return `$${price.toExponential(2)}`
  }
  if (price < 0.01) {
    return `$${price.toFixed(6)}`
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`
  }
  if (price < 1000) {
    return `$${price.toFixed(2)}`
  }
  return `$${formatCompactNumber(price)}`
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`
  }
  return num.toFixed(2)
}

export function formatMarketCap(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`
  }
  return `$${num.toFixed(0)}`
}

export function formatVolume(num: number): string {
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(0)}M`
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`
  }
  return `$${num.toFixed(0)}`
}

export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

export function formatAge(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)}s`
  }
  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m`
  }
  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h`
  }
  if (seconds < 2592000) {
    return `${Math.floor(seconds / 86400)}d`
  }
  return `${Math.floor(seconds / 2592000)}mo`
}

export function formatAddress(address: string, chars = 4): string {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(Math.floor(num))
}

export function formatFollowers(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

export function formatFee(fee: number): string {
  return fee.toFixed(2)
}
