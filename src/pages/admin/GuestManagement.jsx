import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { useHotel } from '@/hooks/useHotel'
import { formatCurrency } from '@/utils/currency'

export default function GuestManagement() {
  const { bookings } = useHotel()
  const map = new Map()
  bookings.filter((b) => b.status !== 'cancelled').forEach((b) => {
    const g = map.get(b.guest) ?? { id: b.guest, name: b.guest, email: b.email, phone: b.phone, stays: 0, spent: 0 }
    g.stays += 1; g.spent += b.total; map.set(b.guest, g)
  })
  const columns = [{ label: 'Guest', render: (g) => <b>{g.name}</b> }, { label: 'Email', render: (g) => g.email }, { label: 'Phone', render: (g) => g.phone }, { label: 'Stays', render: (g) => g.stays }, { label: 'Total spent', render: (g) => formatCurrency(g.spent) }]
  return <div><PageHeader title="Guest Management" description={`${map.size} guest(s)`} /><DataTable columns={columns} rows={[...map.values()]} empty="No guests yet." /></div>
}
