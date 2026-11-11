import {
  BedDouble, CalendarCheck, CalendarPlus, ClipboardList, ConciergeBell, DoorOpen,
  History, LayoutDashboard, MessageSquare, Receipt, Settings, Sparkles, Star,
  TrendingUp, TriangleAlert, User, UserCog, Users, Wrench,
} from 'lucide-react'
import { ROLES } from '@/utils/constants'

export const PUBLIC_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Rooms & Suites', to: '/rooms' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const ADMIN_NAV = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Room Management', to: '/admin/rooms', icon: BedDouble },
  { label: 'Booking Management', to: '/admin/bookings', icon: CalendarCheck },
  { label: 'Guest Management', to: '/admin/guests', icon: Users },
  { label: 'Staff Management', to: '/admin/staff', icon: UserCog },
  { label: 'Housekeeping', to: '/admin/housekeeping', icon: Sparkles },
  { label: 'Maintenance', to: '/admin/maintenance', icon: Wrench },
  { label: 'Billing & Invoices', to: '/admin/billing', icon: Receipt },
  { label: 'Reports & Analytics', to: '/admin/reports', icon: TrendingUp },
  { label: 'Feedback Management', to: '/admin/feedback', icon: MessageSquare },
  // Managers see everything except system settings.
  { label: 'Settings', to: '/admin/settings', icon: Settings, roles: [ROLES.ADMIN] },
]

const RECEPTION_NAV = [
  { label: 'Dashboard', to: '/reception/dashboard', icon: LayoutDashboard },
  { label: 'Reservations', to: '/reception/reservations', icon: CalendarCheck },
  { label: 'New Booking', to: '/reception/new-booking', icon: CalendarPlus },
  { label: 'Guest Records', to: '/reception/guests', icon: Users },
  { label: 'Room Availability', to: '/reception/availability', icon: BedDouble },
  { label: 'Check-in / Check-out', to: '/reception/check-in-out', icon: DoorOpen },
  { label: 'Billing', to: '/reception/billing', icon: Receipt },
]

const HOUSEKEEPING_NAV = [
  { label: 'Dashboard', to: '/housekeeping/dashboard', icon: LayoutDashboard },
  { label: 'Cleaning Tasks', to: '/housekeeping/tasks', icon: ClipboardList },
  { label: 'My Rooms', to: '/housekeeping/my-rooms', icon: BedDouble },
  { label: 'Report an Issue', to: '/housekeeping/report-issue', icon: TriangleAlert },
]

const GUEST_NAV = [
  { label: 'My Profile', to: '/guest/profile', icon: User },
  { label: 'My Bookings', to: '/guest/bookings', icon: CalendarCheck },
  { label: 'Booking History', to: '/guest/history', icon: History },
  { label: 'Invoices', to: '/guest/invoices', icon: Receipt },
  { label: 'Request a Service', to: '/guest/services', icon: ConciergeBell },
  { label: 'Feedback', to: '/guest/feedback', icon: Star },
]

export const DASHBOARD_GROUPS = [
  { key: 'admin', base: '/admin', title: 'Administration', roles: [ROLES.ADMIN, ROLES.MANAGER], nav: ADMIN_NAV, phase: 4 },
  { key: 'reception', base: '/reception', title: 'Front Desk', roles: [ROLES.RECEPTIONIST], nav: RECEPTION_NAV, phase: 5 },
  { key: 'housekeeping', base: '/housekeeping', title: 'Housekeeping', roles: [ROLES.HOUSEKEEPING], nav: HOUSEKEEPING_NAV, phase: 5 },
  { key: 'guest', base: '/guest', title: 'Guest Portal', roles: [ROLES.GUEST], nav: GUEST_NAV, phase: 5 },
]

export const ROLE_HOME = {
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.MANAGER]: '/admin/dashboard',
  [ROLES.RECEPTIONIST]: '/reception/dashboard',
  [ROLES.HOUSEKEEPING]: '/housekeeping/dashboard',
  [ROLES.GUEST]: '/guest/profile',
}

export const getGroupForRole = (role) => DASHBOARD_GROUPS.find((group) => group.roles.includes(role))

export function getNavForRole(role) {
  const group = getGroupForRole(role)
  if (!group) return []
  return group.nav.filter((item) => !item.roles || item.roles.includes(role))
}

// Used after login to decide whether a remembered "from" path is allowed for this role.
export function canAccessPath(role, path) {
  const owner = DASHBOARD_GROUPS.find((group) => path === group.base || path.startsWith(`${group.base}/`))
  return !owner || owner.roles.includes(role)
}