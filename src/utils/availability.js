import { toISODate } from './dates'

const ACTIVE = ['pending', 'confirmed', 'checked-in']
const HELD_TODAY = ['occupied', 'booked', 'reserved', 'cleaning']

// Date-aware: a room is free if no active booking overlaps [checkIn, checkOut).
export function isRoomFree(room, bookings, checkIn, checkOut) {
  if (room.status === 'maintenance') return false
  if (HELD_TODAY.includes(room.status) && checkIn <= toISODate(new Date())) return false
  return !bookings.some((b) => b.roomId === room.id && ACTIVE.includes(b.status) && checkIn < b.checkOut && checkOut > b.checkIn)
}
