import { useCallback, useEffect, useMemo, useState } from 'react'
import { INITIAL_ROOMS } from '@/data/rooms'
import { SEED_BOOKINGS } from '@/data/bookings'
import { SEED_FEEDBACK } from '@/data/feedback'
import { toISODate } from '@/utils/dates'
import { DEFAULT_SETTINGS } from '@/data/settings'
import { DEMO_USERS } from '@/data/users'
import { isRoomFree } from '@/utils/availability'
import { HotelContext } from './contexts'

const KEY = 'luxurystay.hotel.v1'
const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? null } catch { return null }
}

// Demo state lives in the browser. Swap these actions for API calls when the Express backend is ready.
export function HotelProvider({ children }) {
  const [state, setState] = useState(() => ({ rooms: INITIAL_ROOMS, bookings: SEED_BOOKINGS, feedback: SEED_FEEDBACK, requests: [], settings: DEFAULT_SETTINGS,
    staff: DEMO_USERS.filter((u) => u.role !== 'guest').map(({ password: _p, ...u }) => u),
    issues: [{ id: 'MT-1', roomId: 'room-309', description: 'Air conditioning not cooling', status: 'open', reportedBy: 'Housekeeping', date: toISODate(new Date()) }], ...(load() ?? {}) }))
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* storage unavailable */ }
  }, [state])

  const addBooking = useCallback((booking) => {
    const room = state.rooms.find((r) => r.id === booking.roomId)
    if (!room || !isRoomFree(room, state.bookings, booking.checkIn, booking.checkOut)) {
      throw new Error('This room was just booked for those dates. Please choose another.')
    }
    const created = { ...booking, id: `BK-${1001 + state.bookings.length}`, status: 'confirmed', paymentStatus: 'pending' }
    setState((s) => ({ ...s, bookings: [created, ...s.bookings] }))
    return created
  }, [state])

  const api = useMemo(() => ({
    ...state,
    addBooking,
    updateRoom: (id, patch) => setState((s) => ({ ...s, rooms: s.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)) })),
    addRoom: (room) => setState((s) => ({ ...s, rooms: [...s.rooms, room] })),
    markPaid: (id) => setState((s) => ({ ...s, bookings: s.bookings.map((b) => (b.id === id ? { ...b, paymentStatus: 'paid' } : b)) })),
    setBookingStatus: (id, status) => setState((s) => {
      const b = s.bookings.find((x) => x.id === id)
      if (!b) return s
      const roomStatus = { 'checked-in': 'occupied', 'checked-out': 'cleaning', cancelled: 'available' }[status]
      return {
        ...s,
        bookings: s.bookings.map((x) => (x.id === id ? { ...x, status } : x)),
        rooms: roomStatus ? s.rooms.map((r) => (r.id === b.roomId ? { ...r, status: roomStatus } : r)) : s.rooms,
      }
    }),
    addFeedback: (f) => setState((s) => ({ ...s, feedback: [{ id: `FB-${s.feedback.length + 1}`, date: toISODate(new Date()), ...f }, ...s.feedback] })),
    addRequest: (r) => setState((s) => ({ ...s, requests: [{ id: `RQ-${s.requests.length + 1}`, status: 'pending', date: toISODate(new Date()), ...r }, ...s.requests] })),
    addIssue: (i) => setState((s) => ({
      ...s, issues: [{ id: `MT-${s.issues.length + 1}`, status: 'open', date: toISODate(new Date()), ...i }, ...s.issues],
      rooms: s.rooms.map((r) => (r.id === i.roomId ? { ...r, status: 'maintenance' } : r)),
    })),
    resolveIssue: (id) => setState((s) => {
      const issue = s.issues.find((x) => x.id === id)
      return { ...s, issues: s.issues.map((x) => (x.id === id ? { ...x, status: 'resolved' } : x)), rooms: s.rooms.map((r) => (r.id === issue?.roomId ? { ...r, status: 'cleaning' } : r)) }
    }),
    updateSettings: (patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
    addStaff: (m) => setState((s) => ({ ...s, staff: [...s.staff, { id: `usr-${Date.now()}`, ...m }] })),
    removeStaff: (id) => setState((s) => ({ ...s, staff: s.staff.filter((u) => u.id !== id) })),
    deleteRoom: (id) => setState((s) => ({ ...s, rooms: s.rooms.filter((r) => r.id !== id) })),
  }), [state, addBooking])

  return <HotelContext.Provider value={api}>{children}</HotelContext.Provider>
}
