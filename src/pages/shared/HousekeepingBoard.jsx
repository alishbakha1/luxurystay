import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { getCategoryById } from '@/data/roomCategories'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'

// Rooms needing attention: cleaning tasks + reported maintenance issues.
export default function HousekeepingBoard({ title = 'Cleaning Tasks' }) {
  const { rooms, updateRoom } = useHotel()
  const toast = useToast()
  const tasks = rooms.filter((r) => ['cleaning', 'maintenance'].includes(r.status)).sort((a, b) => a.number - b.number)
  const set = (r, status, msg) => { updateRoom(r.id, { status }); toast.success(msg, `Room ${r.number}`) }

  return (
    <div>
      <PageHeader title={title} description={`${tasks.length} pending task(s)`} />
      {tasks.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((r) => (
            <Card key={r.id}>
              <div className="flex items-start justify-between"><div><p className="font-serif text-2xl font-semibold">Room {r.number}</p><p className="text-sm text-navy-500">{getCategoryById(r.categoryId)?.name}</p></div><StatusBadge status={r.status} /></div>
              <div className="mt-4 flex flex-wrap gap-2">
                {r.status === 'cleaning' && <Button size="sm" variant="gold" onClick={() => set(r, 'available', 'Marked as cleaned')}>Mark cleaned</Button>}
                {r.status === 'cleaning' && <Button size="sm" variant="outline" onClick={() => set(r, 'maintenance', 'Maintenance issue reported')}>Report issue</Button>}
                {r.status === 'maintenance' && <Button size="sm" variant="outline" onClick={() => set(r, 'cleaning', 'Issue resolved — needs cleaning')}>Issue fixed</Button>}
              </div>
            </Card>
          ))}
        </div>
      ) : <Card padded={false}><EmptyState title="All rooms are clean" description="No pending housekeeping tasks." /></Card>}
    </div>
  )
}
