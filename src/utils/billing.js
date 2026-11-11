import { DEFAULT_SETTINGS } from '@/data/settings'
import { roundMoney } from './currency'

export const EXTRA_SERVICES = [
  { id: 'airport', label: 'Airport transfer', price: 3000 },
  { id: 'breakfast', label: 'Breakfast buffet', price: 1500 },
]

// Nights × Room Price = Subtotal; + services; + service charge; + tax. All PKR.
export function calcBill({ price, nights, services = 0 }, settings = DEFAULT_SETTINGS) {
  const subtotal = roundMoney(price * nights)
  const base = subtotal + services
  const serviceCharge = roundMoney((base * settings.serviceChargePercent) / 100)
  const tax = roundMoney(((base + serviceCharge) * settings.taxRatePercent) / 100)
  return { subtotal, services, serviceCharge, tax, total: roundMoney(base + serviceCharge + tax) }
}
