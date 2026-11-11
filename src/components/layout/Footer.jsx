import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { HOTEL } from '@/data/settings'
import { PUBLIC_NAV } from '@/routes/navconfig'

const linkClass = 'text-sm text-navy-200 transition-colors hover:text-gold-300'
const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-200">{HOTEL.tagline}. Refined rooms, warm service and thoughtful details in the heart of Karachi.</p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Explore</h3>
          <ul className="space-y-2.5">
            {PUBLIC_NAV.map((link) => (
              <li key={link.to}><Link to={link.to} className={linkClass}>{link.label}</Link></li>
            ))}
            <li><Link to="/booking" className={linkClass}>Book a Room</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Guest Portal</h3>
          <ul className="space-y-2.5">
            <li><Link to="/login" className={linkClass}>Sign in</Link></li>
            <li><Link to="/register" className={linkClass}>Create an account</Link></li>
            <li><Link to="/privacy" className={linkClass}>Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Contact</h3>
          <ul className="space-y-3 text-sm text-navy-200">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />{HOTEL.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />{HOTEL.phone}</li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />{HOTEL.email}</li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />Check-in {HOTEL.checkInTime} · Check-out {HOTEL.checkOutTime}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-300 sm:flex-row">
          <p>© {CURRENT_YEAR} {HOTEL.name}. All rights reserved.</p>
          <p>All prices are in Pakistani Rupees (PKR).</p>
        </div>
      </div>
    </footer>
  )
}