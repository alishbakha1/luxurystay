import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { PublicLayout } from '@/components/layout/PublicLayout'
import ComingSoon from '@/pages/shared/ComingSoon'
import { DASHBOARD_GROUPS } from './navconfig'
import { DASHBOARD_PAGES } from './dashboardPages'
import { ProtectedRoute } from './ProtectedRoute'

const Login = lazy(() => import('@/pages/public/Login'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))
const Home = lazy(() => import('@/pages/public/Home'))
const About = lazy(() => import('@/pages/public/About'))
const Rooms = lazy(() => import('@/pages/public/Rooms'))
const RoomDetails = lazy(() => import('@/pages/public/RoomDetails'))
const Contact = lazy(() => import('@/pages/public/Contact'))
const Booking = lazy(() => import('@/pages/public/Booking'))
const Privacy = lazy(() => import('@/pages/public/Privacy'))
const Register = lazy(() => import('@/pages/public/Register'))

// Replaced one by one with real pages in Phase 3.
const PUBLIC_PAGES = [
]

const publicPlaceholder = (title) => (
  <div className="container-page py-16">
    <ComingSoon title={title} phase={3} />
  </div>
)

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/privacy" element={<Privacy />} />
        {PUBLIC_PAGES.map(({ path, title }) => (
          <Route key={path} path={path} element={publicPlaceholder(title)} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* One protected, role-aware group per dashboard (admin/manager, reception, housekeeping, guest) */}
      {DASHBOARD_GROUPS.map((group) => (
        <Route key={group.key} element={<ProtectedRoute roles={group.roles} />}>
          <Route element={<DashboardLayout />}>
            <Route path={group.base} element={<Navigate to={group.nav[0].to} replace />} />
            {group.nav.map((item) => {
              const Page = DASHBOARD_PAGES[item.to]
              const page = Page ? <Page /> : <ComingSoon title={item.label} phase={group.phase} />
              return (
                <Route
                  key={item.to}
                  path={item.to}
                  element={item.roles ? <ProtectedRoute roles={item.roles}>{page}</ProtectedRoute> : page}
                />
              )
            })}
          </Route>
        </Route>
      ))}
    </Routes>
  )
}