// The ONLY place currency is formatted. Prices are stored as plain numbers (PKR).
export const CURRENCY_PREFIX = 'Rs.'

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
const compactFormat = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100
}

export function formatCurrency(amount) {
  const value = Number(amount)
  if (!Number.isFinite(value)) return `${CURRENCY_PREFIX} 0`
  const sign = value < 0 ? '-' : ''
  return `${sign}${CURRENCY_PREFIX} ${numberFormat.format(Math.abs(value))}`
}

// For chart axes, e.g. "Rs. 1.2M"
export function formatCompactCurrency(amount) {
  const value = Number(amount)
  if (!Number.isFinite(value)) return `${CURRENCY_PREFIX} 0`
  return `${CURRENCY_PREFIX} ${compactFormat.format(value)}`
}