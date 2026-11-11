import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PageLoader } from '@/components/common/PageLoader'
import { useAuth } from '@/hooks/useAuth'
import AccessDenied from '@/pages/shared/AccessDenied'

// Works as a layout route (renders <Outlet/>) or wraps children directly.
export function ProtectedRoute({ roles, children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader fullScreen />
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />
  if (roles && !roles.includes(user.role)) return <AccessDenied />

  return children ?? <Outlet />
}