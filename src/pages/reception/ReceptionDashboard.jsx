import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useHotel } from '@/hooks/useHotel'
import { toISODate } from '@/utils/dates'

export default function ReceptionDashboard() {
  const { rooms, bookings } = useHotel()
  const today = toISODate(new Date())
  const stats = [
    ['Arrivals today', bookings.filter((b) => b.status === 'confirmed' && b.checkIn === today).length],
    ['Departures today', bookings.filter((b) => b.status === 'checked-in' && b.checkOut === today).length],
    ['In-house guests', bookings.filter((b) => b.status === 'checked-in').length],
    ['Rooms available', rooms.filter((r) => r.status === 'available').length],
  ]
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Front desk" title="Reception" actions={<Button as={Link} to="/booking" variant="gold">New booking</Button>} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([l, v]) => <Card key={l}><p className="text-xs uppercase tracking-wide text-navy-500">{l}</p><p className="mt-1 font-serif text-3xl font-semibold">{v}</p></Card>)}
      </div>
    </div>
  )
}
