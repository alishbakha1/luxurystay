import { useState } from 'react'
import { Plus, Search, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ROOM_CATEGORIES, getCategoryById } from '@/data/roomCategories'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { ROOM_STATUS_OPTIONS } from '@/utils/constants'
import { formatCurrency } from '@/utils/currency'

const CATEGORY_OPTIONS = ROOM_CATEGORIES.map((c) => ({ value: c.id, label: c.name }))
const BLANK = { number: '', categoryId: 'standard', price: '6000' }

export default function RoomManagement() {
  const { rooms, updateRoom, addRoom, deleteRoom } = useHotel()
  const toast = useToast()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')
  const [toDelete, setToDelete] = useState(null)

  const list = rooms.filter((r) => String(r.number).includes(q) && (!status || r.status === status) && (!category || r.categoryId === category)).sort((a, b) => a.number - b.number)

  const save = () => {
    const number = Number(form.number), price = Number(form.price)
    if (!Number.isInteger(number) || number < 1) return setError('Enter a valid room number.')
    if (!(price > 0)) return setError('Price must be greater than zero.')
    if (rooms.some((r) => r.number === number && r.id !== form.id)) return setError(`Room ${number} already exists.`)
    if (form.id) updateRoom(form.id, { number, categoryId: form.categoryId, price })
    else addRoom({ id: `room-${number}`, number, categoryId: form.categoryId, floor: Math.floor(number / 100), price, status: 'available' })
    toast.success(form.id ? 'Room updated' : 'Room added', `Room ${number}`)
    setForm(null)
  }

  return (
    <div>
      <PageHeader title="Room Management" description={`${rooms.length} rooms`} actions={<Button leftIcon={Plus} onClick={() => { setError(''); setForm(BLANK) }}>Add room</Button>} />
      <Card className="mb-4 grid gap-4 sm:grid-cols-3">
        <Input label="Search room no." icon={Search} value={q} onChange={(e) => setQ(e.target.value)} />
        <Select label="Category" placeholder="All" value={category} onChange={(e) => setCategory(e.target.value)} options={CATEGORY_OPTIONS} />
        <Select label="Status" placeholder="All" value={status} onChange={(e) => setStatus(e.target.value)} options={ROOM_STATUS_OPTIONS} />
      </Card>
      <Card padded={false}>
        {list.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-ivory text-xs uppercase text-navy-500"><tr>{['Room', 'Category', 'Price / night', 'Status', 'Actions'].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-navy-100">
                {list.map((r) => (
                  <tr key={r.id}>
                    <td className="px-5 py-3 font-semibold">{r.number}</td>
                    <td className="px-5 py-3">{getCategoryById(r.categoryId)?.name}</td>
                    <td className="px-5 py-3">{formatCurrency(r.price)}</td>
                    <td className="px-5 py-3"><div className="flex items-center gap-2"><StatusBadge status={r.status} />
                      <select aria-label={`Status for room ${r.number}`} value={r.status} onChange={(e) => { updateRoom(r.id, { status: e.target.value }); toast.success('Status updated', `Room ${r.number}`) }} className="rounded-md border border-navy-200 bg-white px-2 py-1 text-xs">
                        {ROOM_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div></td>
                    <td className="px-5 py-3"><div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => { setError(''); setForm({ ...r }) }}>Edit</Button>
                      <Button size="sm" variant="ghost" aria-label={`Delete room ${r.number}`} onClick={() => setToDelete(r)}><Trash2 className="h-4 w-4 text-red-600" /></Button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="No rooms found" description="Adjust your search or filters." />}
      </Card>

      <Modal open={Boolean(form)} onClose={() => setForm(null)} title={form?.id ? 'Edit room' : 'Add room'}
        footer={<><Button variant="outline" onClick={() => setForm(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        {form && <div className="space-y-4">
          <Input label="Room number" type="number" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
          <Select label="Category" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value, price: String(getCategoryById(e.target.value).price) })} options={CATEGORY_OPTIONS} />
          <Input label="Price per night (PKR)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
        </div>}
      </Modal>
      <ConfirmDialog open={Boolean(toDelete)} onClose={() => setToDelete(null)} variant="danger" title="Delete room?" confirmLabel="Delete"
        message={`Room ${toDelete?.number} will be removed from the inventory.`}
        onConfirm={() => { deleteRoom(toDelete.id); toast.success('Room deleted'); setToDelete(null) }} />
    </div>
  )
}
