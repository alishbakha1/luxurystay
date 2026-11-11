import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { PageHeader } from '@/components/common/PageHeader'
import { Card, CardHeader } from '@/components/ui/Card'
import { useHotel } from '@/hooks/useHotel'
import { ROOM_STATUS_OPTIONS } from '@/utils/constants'
import { formatCurrency } from '@/utils/currency'

const COLORS = ['#10b981', '#C9A96E', '#0B1F3A', '#0ea5e9', '#f59e0b', '#dc2626']

export default function Reports() {
  const { rooms, bookings, feedback } = useHotel()
  const live = bookings.filter((b) => b.status !== 'cancelled')
  const revenue = live.reduce((s, b) => s + b.total, 0)
  const collected = live.filter((b) => b.paymentStatus === 'paid').reduce((s, b) => s + b.total, 0)
  const data = ROOM_STATUS_OPTIONS.map((o) => ({ name: o.label, value: rooms.filter((r) => r.status === o.value).length })).filter((d) => d.value)
  const avg = feedback.length ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : '—'
  const kpis = [['Total revenue', formatCurrency(revenue)], ['Collected', formatCurrency(collected)], ['Outstanding', formatCurrency(revenue - collected)], ['Avg. rating', `${avg} / 5`], ['Bookings', live.length]]
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="All revenue figures are in PKR." />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {kpis.map(([l, v]) => <Card key={l}><p className="text-xs uppercase tracking-wide text-navy-500">{l}</p><p className="mt-1 font-serif text-xl font-semibold">{v}</p></Card>)}
      </div>
      <Card>
        <CardHeader title="Room status distribution" description={`Occupancy ${rooms.length ? Math.round((rooms.filter((r) => r.status === 'occupied').length / rooms.length) * 100) : 0}%`} />
        <div className="h-72" role="img" aria-label="Room status distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>{data.map((d, i) => <Cell key={d.name} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
