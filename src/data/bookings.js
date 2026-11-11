import { addDays, format } from 'date-fns'
import { calcBill } from '@/utils/billing'
import { getCategoryById } from './roomCategories'

const d = (n) => format(addDays(new Date(), n), 'yyyy-MM-dd')
// Totals are computed with calcBill so they always match invoices (PKR).
const mk = (id, guest, roomId, categoryId, inN, outN, status, paymentStatus) => ({
  id, guest, email: `${guest.split(' ')[0].toLowerCase()}@example.com`, phone: '0300 0000000', roomId, categoryId,
  checkIn: d(inN), checkOut: d(outN), guests: 2, status, paymentStatus, services: 0,
  total: calcBill({ price: getCategoryById(categoryId).price, nights: outN - inN }).total,
})

export const SEED_BOOKINGS = [
  mk('BK-1001', 'Omar Siddiqui', 'room-101', 'standard', -2, 1, 'checked-in', 'paid'),
  mk('BK-1002', 'Ayesha Khan', 'room-201', 'deluxe', -1, 2, 'checked-in', 'partial'),
  mk('BK-1003', 'Daniyal Shah', 'room-301', 'executive', 0, 3, 'confirmed', 'pending'),
  mk('BK-1004', 'Maria Fernandes', 'room-401', 'family', 1, 4, 'confirmed', 'pending'),
  mk('BK-1005', 'Hamza Iqbal', 'room-501', 'presidential', 3, 5, 'confirmed', 'paid'),
  mk('BK-1006', 'Omar Siddiqui', 'room-102', 'standard', -6, -3, 'checked-out', 'paid'),
]
