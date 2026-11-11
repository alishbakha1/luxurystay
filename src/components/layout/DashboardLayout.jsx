import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { getGroupForRole, getNavForRole } from '@/routes/navconfig'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function DashboardLayout() {
  const { user, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const group = getGroupForRole(user?.role)
  const nav = getNavForRole(user?.role)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await logout()
      toast.info('Signed out', 'You have been signed out successfully.')
      navigate('/login', { replace: true })
    } finally {
      setLoggingOut(false)
      setConfirmOpen(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <Sidebar nav={nav} title={group?.title ?? 'Menu'} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <Topbar nav={nav} user={user} onMenuClick={() => setSidebarOpen(true)} onLogoutClick={() => setConfirmOpen(true)} />
        <main id="main" className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
        title="Sign out?"
        message="You will need to sign in again to access your dashboard."
        confirmLabel="Sign out"
        variant="danger"
      />
    </div>
  )
}