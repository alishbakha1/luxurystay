import { formatStatusLabel } from './strings'

export const ROLES = Object.freeze({
  ADMIN: 'admin',
  MANAGER: 'manager',
  RECEPTIONIST: 'receptionist',
  HOUSEKEEPING: 'housekeeping',
  GUEST: 'guest',
})

export const ROLE_LABELS = {
  admin: 'Administrator',
  manager: 'Manager',
  receptionist: 'Receptionist',
  housekeeping: 'Housekeeping',
  guest: 'Guest',
}

export const ROOM_STATUS = Object.freeze({
  AVAILABLE: 'available',
  BOOKED: 'booked',
  OCCUPIED: 'occupied',
  RESERVED: 'reserved',
  CLEANING: 'cleaning',
  MAINTENANCE: 'maintenance',
})

export const ROOM_STATUS_OPTIONS = Object.values(ROOM_STATUS).map((value) => ({
  value,
  label: formatStatusLabel(value),
}))

export const BOOKING_STATUS = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked-in',
  CHECKED_OUT: 'checked-out',
  CANCELLED: 'cancelled',
})

export const PAYMENT_STATUS = Object.freeze({
  PAID: 'paid',
  PARTIAL: 'partial',
  PENDING: 'pending',
  REFUNDED: 'refunded',
})

export const TASK_STATUS = Object.freeze({
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
})

export const MAINTENANCE_STATUS = Object.freeze({
  OPEN: 'open',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
})

// One colour map for every status badge in the app.
export const STATUS_TONES = {
  // rooms
  available: 'success',
  booked: 'gold',
  occupied: 'navy',
  reserved: 'info',
  cleaning: 'warning',
  maintenance: 'danger',
  // bookings
  pending: 'warning',
  confirmed: 'info',
  'checked-in': 'navy',
  'checked-out': 'neutral',
  cancelled: 'danger',
  // payments
  paid: 'success',
  partial: 'warning',
  refunded: 'neutral',
  // tasks / maintenance
  'in-progress': 'info',
  completed: 'success',
  open: 'danger',
  resolved: 'success',
}