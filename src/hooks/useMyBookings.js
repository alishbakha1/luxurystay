import { useAuth } from '@/hooks/useAuth'
import { useHotel } from '@/hooks/useHotel'

// Demo matching by name/email; the real API will filter by the signed-in user id.
export function useMyBookings() {
  const { user } = useAuth()
  const { bookings } = useHotel()
  return bookings.filter((b) => b.guest === user.name || b.email === user.email)
}
