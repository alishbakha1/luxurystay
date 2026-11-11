import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, Menu, X } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { PUBLIC_NAV, ROLE_HOME } from '@/routes/navconfig'
import { cn } from '@/utils/cn'

export function Navbar() {
  const { user, isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-ivory/90 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {PUBLIC_NAV.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-navy-900' : 'text-navy-500 hover:text-navy-900',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded bg-gold-500 transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? (
            <Button as={Link} to={ROLE_HOME[user.role]} variant="outline" size="sm" leftIcon={LayoutDashboard}>
              My Dashboard
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="ghost" size="sm">Sign in</Button>
          )}
          <Button as={Link} to="/booking" variant="gold" size="sm">Book Now</Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-navy-100 bg-ivory lg:hidden animate-fade-in">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {PUBLIC_NAV.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={close}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-3 text-base font-medium transition-colors',
                    isActive ? 'bg-white text-navy-900 shadow-soft' : 'text-navy-600 hover:bg-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {isAuthenticated ? (
                <Button as={Link} to={ROLE_HOME[user.role]} variant="outline" onClick={close}>Dashboard</Button>
              ) : (
                <Button as={Link} to="/login" variant="outline" onClick={close}>Sign in</Button>
              )}
              <Button as={Link} to="/booking" variant="gold" onClick={close}>Book Now</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}