import { differenceInCalendarDays, format, isValid, parseISO } from 'date-fns'

const toDate = (value) => (value instanceof Date ? value : parseISO(value))

export function formatDate(value, pattern = 'dd MMM yyyy') {
  const date = toDate(value)
  return isValid(date) ? format(date, pattern) : '—'
}

export const formatDateTime = (value) => formatDate(value, 'dd MMM yyyy, hh:mm a')

export const toISODate = (value) => format(toDate(value), 'yyyy-MM-dd')

export function nightsBetween(checkIn, checkOut) {
  return Math.max(0, differenceInCalendarDays(toDate(checkOut), toDate(checkIn)))
}