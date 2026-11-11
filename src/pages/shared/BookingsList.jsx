import { useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { formatCurrency } from '@/utils/currency'
import { formatDate } from '@/utils/dates'

const ACTIONS = { confirmed: [['Check in', 'checked-in'], ['Cancel', 'cancelled']], 'checked-in': [['Check out', 'checked-out']] }

// Shared by Admin, Reception and Guest. `rows` = which bookings to show; `readOnly` hides actions.
export default function BookingsList({ title, rows, readOnly = false, only }) {
  const { setBookingStatus } = useHotel()
  const toast = useToast()
  const [q, setQ] = useState('')
  const [pending, setPending] = useState(null)
  const list = rows.filter((b) => (!only || only.includes(b.status)) && `${b.id} ${b.guest}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <PageHeader title={title} description={`${list.length} booking(s)`} />
      <Card className="mb-4"><Input label="Search by reference or guest" icon={Search} value={q} onChange={(e) => setQ(e.target.value)} /></Card>
      <Card padded={false}>
        {list.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-ivory text-xs uppercase text-navy-500"><tr>{['Ref', 'Guest', 'Room', 'Stay', 'Status', 'Payment', 'Total', ...(readOnly ? [] : ['Actions'])].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-navy-100">
                {list.map((b) => (
                  <tr key={b.id}>
                    <td className="px-5 py-3 font-medium">{b.id}</td><td className="px-5 py-3">{b.guest}</td><td className="px-5 py-3">{b.roomId.replace('room-', '')}</td>
                    <td className="px-5 py-3">{formatDate(b.checkIn)} – {formatDate(b.checkOut)}</td>
                    <td className="px-5 py-3"><StatusBadge status={b.status} /></td><td className="px-5 py-3"><StatusBadge status={b.paymentStatus} /></td>
                    <td className="px-5 py-3">{formatCurrency(b.total)}</td>
                    {!readOnly && <td className="px-5 py-3"><div className="flex gap-2">{(ACTIONS[b.status] ?? []).map(([label, next]) => (
                      <Button key={next} size="sm" variant={next === 'cancelled' ? 'ghost' : 'outline'} onClick={() => setPending({ b, label, next })}>{label}</Button>))}</div></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="No bookings found" description="Bookings will appear here." />}
      </Card>
      <ConfirmDialog open={Boolean(pending)} onClose={() => setPending(null)} variant={pending?.next === 'cancelled' ? 'danger' : 'primary'}
        title={`${pending?.label}?`} confirmLabel={pending?.label} message={`${pending?.label} booking ${pending?.b.id} for ${pending?.b.guest}.`}
        onConfirm={() => { setBookingStatus(pending.b.id, pending.next); toast.success(`${pending.label} done`, pending.b.id); setPending(null) }} />
    </div>
  )
}
