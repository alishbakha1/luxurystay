import { useContext } from 'react'
import { HotelContext } from '@/context/contexts'

export function useHotel() {
  const context = useContext(HotelContext)
  if (!context) throw new Error('useHotel must be used inside <HotelProvider>')
  return context
}
