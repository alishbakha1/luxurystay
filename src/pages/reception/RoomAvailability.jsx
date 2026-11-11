import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { getCategoryById } from '@/data/roomCategories'
import { useHotel } from '@/hooks/useHotel'
import { isRoomFree } from '@/utils/availability'
import { formatCurrency } from '@/utils/currency'
import { toISODate } from '@/utils/dates'
import { addDays } from 'date-fns'

export default function RoomAvailability() {
  const { rooms, bookings } = useHotel()
  const [from, setFrom] = useState(toISODate(addDays(new Date(), 1)))
  const [to, setTo] = useState(toISODate(addDays(new Date(), 2)))
  const valid = to > from
  const free = valid ? rooms.filter((r) => isRoomFree(r, bookings, from, to)).sort((a, b) => a.number - b.number) : []
  const columns = [{ label: 'Room', render: (r) => <b>{r.number}</b> }, { label: 'Category', render: (r) => getCategoryById(r.categoryId)?.name }, { label: 'Rate / night', render: (r) => formatCurrency(r.price) }]
  return (
    <div className="space-y-4">
      <PageHeader title="Room Availability" description={valid ? `${free.length} room(s) free` : 'Check-out must be after check-in.'} />
      <Card className="grid gap-4 sm:grid-cols-2"><Input label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} /><Input label="To" type="date" min={from} value={to} onChange={(e) => setTo(e.target.value)} /></Card>
      <DataTable columns={columns} rows={free} empty="No rooms free for these dates." />
    </div>
  )
}
