import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Globe, LogOut, Menu } from 'lucide-react'
import { NotificationBell } from '@/components/common/NotificationBell'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useClickOutside } from '@/hooks/useClickOutside'
import { ROLE_LABELS } from '@/utils/constants'
import { getInitials } from '@/utils/strings'

export function Topbar({ nav, user, onMenuClick, onLogoutClick }) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen)

  const current = nav.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-navy-100 bg-white/85 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick} aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
        <p className="truncate font-serif text-lg font-semibold text-navy-900 sm:text-xl">{current?.label ?? 'Dashboard'}</p>
      </div>

      <div className="flex items-center gap-2">
      {user.role !== 'guest' && <NotificationBell />}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex items-center gap-3 rounded-xl py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-navy-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-gold-400 ring-1 ring-gold-500/40">
            {getInitials(user.name)}
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-medium text-navy-900">{user.name}</span>
            <span className="block text-xs text-navy-500">{ROLE_LABELS[user.role]}</span>
          </span>
          <ChevronDown className="h-4 w-4 text-navy-400" aria-hidden="true" />
        </button>

        {menuOpen && (
          <div role="menu" className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-lift animate-scale-in">
            <div className="border-b border-navy-100 px-4 py-3">
              <p className="text-sm font-semibold text-navy-900">{user.name}</p>
              <p className="truncate text-xs text-navy-500">{user.email}</p>
              <Badge tone="gold" className="mt-2">{ROLE_LABELS[user.role]}</Badge>
            </div>
            <div className="p-1.5">
              <Link
                to="/"
                role="menuitem"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-navy-700 transition-colors hover:bg-navy-50"
              >
                <Globe className="h-4 w-4 text-navy-400" aria-hidden="true" />
                View website
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false)
                  onLogoutClick()
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  )
}