import { Link, NavLink } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { cn } from '@/utils/cn'

export function Sidebar({ nav, title, open, onClose }) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-navy-950/60 transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        aria-label="Dashboard navigation"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy-900 text-white transition-[transform,visibility] duration-300 lg:visible lg:translate-x-0',
          open ? 'visible translate-x-0' : 'invisible -translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Logo variant="light" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-lg p-1.5 text-navy-200 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="px-6 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400/80">{title}</p>

        <nav className="flex-1 overflow-y-auto px-3 pb-4" aria-label={title}>
          <ul className="space-y-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive ? 'bg-white/10 text-white' : 'text-navy-200 hover:bg-white/5 hover:text-white',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-gold-500" aria-hidden="true" />}
                      <Icon className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-gold-400' : 'text-navy-300 group-hover:text-gold-300')} aria-hidden="true" />
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-navy-200 transition-colors hover:bg-white/5 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </Link>
        </div>
      </aside>
    </>
  )
}