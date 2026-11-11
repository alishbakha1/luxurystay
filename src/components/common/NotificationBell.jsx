import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useHotel } from '@/hooks/useHotel'
import { useAuth } from '@/hooks/useAuth'
import { toISODate } from '@/utils/dates'

const BASE = { admin: '/admin', manager: '/admin', receptionist: '/reception', housekeeping: '/housekeeping' }

// Derived from live hotel data; a real backend would push these.
export function NotificationBell() {
  const { user } = useAuth()
  const { issues, requests, bookings, rooms } = useHotel()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)
  const base = BASE[user.role]
  const today = toISODate(new Date())
  const items = [
    [issues.filter((i) => i.status === 'open').length, 'open maintenance issue(s)', user.role === 'housekeeping' ? `${base}/report-issue` : `${base}/maintenance`],
    [requests.filter((r) => r.status === 'pending').length, 'pending guest request(s)', `${base}/dashboard`],
    [bookings.filter((b) => b.status === 'confirmed' && b.checkIn === today).length, 'arrival(s) today', user.role === 'receptionist' ? `${base}/check-in-out` : `${base}/bookings`],
    [rooms.filter((r) => r.status === 'cleaning').length, 'room(s) awaiting cleaning', `${base}/${user.role === 'housekeeping' ? 'tasks' : 'housekeeping'}`],
  ].filter(([n]) => n > 0)
  const total = items.reduce((s, [n]) => s + n, 0)

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-label={`Notifications, ${total} new`} aria-expanded={open} className="relative rounded-lg p-2 text-navy-600 transition-colors hover:bg-navy-50">
        <Bell className="h-5 w-5" />
        {total > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-navy-950">{total}</span>}
      </button>
      {open && (
        <div className="absolute right-0 z-40 mt-2 w-72 rounded-xl border border-navy-100 bg-white p-2 shadow-lift">
          {items.length ? items.map(([n, label, to]) => (
            <Link key={label} to={to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-navy-700 hover:bg-navy-50"><b>{n}</b> {label}</Link>
          )) : <p className="px-3 py-4 text-center text-sm text-navy-500">You are all caught up.</p>}
        </div>
      )}
    </div>
  )
}
