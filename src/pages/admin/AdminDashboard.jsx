import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ROOM_CATEGORIES } from '@/data/roomCategories'
import { useHotel } from '@/hooks/useHotel'
import { formatCompactCurrency, formatCurrency } from '@/utils/currency'
import { formatDate } from '@/utils/dates'

export default function AdminDashboard() {
  const { rooms, bookings } = useHotel()
  const count = (s) => rooms.filter((r) => r.status === s).length
  const live = bookings.filter((b) => b.status !== 'cancelled')
  const revenue = live.reduce((sum, b) => sum + b.total, 0)
  const stats = [['Total rooms', rooms.length], ['Available', count('available')], ['Occupied', count('occupied')], ['Booked', count('booked')], ['Reserved', count('reserved')]]
  const chart = ROOM_CATEGORIES.map((c) => ({ name: c.name.split(' ')[0], revenue: live.filter((b) => b.categoryId === c.id).reduce((s, b) => s + b.total, 0) }))
  const occupancy = rooms.length ? Math.round((count('occupied') / rooms.length) * 100) : 0

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Overview" title="Dashboard" description={`Occupancy ${occupancy}% · Revenue ${formatCurrency(revenue)}`} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map(([label, value]) => <Card key={label}><p className="text-xs uppercase tracking-wide text-navy-500">{label}</p><p className="mt-1 font-serif text-3xl font-semibold text-navy-900">{value}</p></Card>)}
      </div>
      <Card>
        <CardHeader title="Revenue by category" description="All amounts in PKR" />
        <div className="h-64" role="img" aria-label="Revenue by room category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dde4ef" />
              <XAxis dataKey="name" tickLine={false} />
              <YAxis tickFormatter={formatCompactCurrency} width={80} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="revenue" fill="#C9A96E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card padded={false}>
        <div className="p-5 pb-0"><CardHeader title="Recent bookings" /></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-ivory text-xs uppercase text-navy-500"><tr>{['Ref', 'Guest', 'Room', 'Stay', 'Status', 'Total'].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-navy-100">
              {bookings.slice(0, 6).map((b) => (
                <tr key={b.id}><td className="px-5 py-3 font-medium">{b.id}</td><td className="px-5 py-3">{b.guest}</td><td className="px-5 py-3">{b.roomId.replace('room-', '')}</td>
                  <td className="px-5 py-3">{formatDate(b.checkIn)} – {formatDate(b.checkOut)}</td><td className="px-5 py-3"><StatusBadge status={b.status} /></td><td className="px-5 py-3">{formatCurrency(b.total)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
