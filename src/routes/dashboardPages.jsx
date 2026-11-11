import { lazy } from 'react'
import { useHotel } from '@/hooks/useHotel'
import { useMyBookings } from '@/hooks/useMyBookings'

const BookingsList = lazy(() => import('@/pages/shared/BookingsList'))
const Billing = lazy(() => import('@/pages/shared/Billing'))
const HousekeepingBoard = lazy(() => import('@/pages/shared/HousekeepingBoard'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const RoomManagement = lazy(() => import('@/pages/admin/RoomManagement'))
const ReceptionDashboard = lazy(() => import('@/pages/reception/ReceptionDashboard'))
const Maintenance = lazy(() => import('@/pages/admin/Maintenance'))
const FeedbackManagement = lazy(() => import('@/pages/admin/FeedbackManagement'))
const Reports = lazy(() => import('@/pages/admin/Reports'))
const GuestManagement = lazy(() => import('@/pages/admin/GuestManagement'))
const StaffManagement = lazy(() => import('@/pages/admin/StaffManagement'))
const NewBooking = lazy(() => import('@/pages/reception/NewBooking'))
const RoomAvailability = lazy(() => import('@/pages/reception/RoomAvailability'))
const ReportIssue = lazy(() => import('@/pages/housekeeping/ReportIssue'))
const GuestFeedback = lazy(() => import('@/pages/guest/GuestFeedback'))
const RequestService = lazy(() => import('@/pages/guest/RequestService'))
const Settings = lazy(() => import('@/pages/admin/Settings'))
const GuestProfile = lazy(() => import('@/pages/guest/GuestProfile'))

const All = (props) => <BookingsList rows={useHotel().bookings} {...props} />
const AllBilling = (props) => <Billing rows={useHotel().bookings} {...props} />
const Mine = ({ history, ...props }) => {
  const rows = useMyBookings()
  const only = history ? ['checked-out', 'cancelled'] : ['confirmed', 'checked-in']
  return <BookingsList rows={rows} only={only} readOnly {...props} />
}
const MyInvoices = () => <Billing title="My Invoices" rows={useMyBookings()} readOnly />

// route path → page. Anything not listed still shows "Coming soon".
export const DASHBOARD_PAGES = {
  '/admin/dashboard': AdminDashboard,
  '/admin/rooms': RoomManagement,
  '/admin/bookings': () => <All title="Booking Management" />,
  '/admin/billing': AllBilling,
  '/admin/housekeeping': () => <HousekeepingBoard title="Housekeeping" />,
  '/reception/dashboard': ReceptionDashboard,
  '/reception/reservations': () => <All title="Reservations" />,
  '/reception/new-booking': NewBooking,
  '/reception/guests': () => <All title="Guest Records" />,
  '/reception/check-in-out': () => <All title="Check-in / Check-out" only={['confirmed', 'checked-in']} />,
  '/reception/billing': AllBilling,
  '/housekeeping/dashboard': () => <HousekeepingBoard title="Housekeeping" />,
  '/housekeeping/tasks': () => <HousekeepingBoard />,
  '/housekeeping/my-rooms': () => <HousekeepingBoard title="My Rooms" />,
  '/admin/maintenance': Maintenance,
  '/admin/feedback': FeedbackManagement,
  '/admin/reports': Reports,
  '/admin/guests': GuestManagement,
  '/admin/staff': StaffManagement,
  '/reception/availability': RoomAvailability,
  '/housekeeping/report-issue': ReportIssue,
  '/guest/feedback': GuestFeedback,
  '/guest/services': RequestService,
  '/admin/settings': Settings,
  '/guest/profile': GuestProfile,
  '/guest/bookings': () => <Mine title="My Bookings" />,
  '/guest/history': () => <Mine title="Booking History" history />,
  '/guest/invoices': MyInvoices,
}
