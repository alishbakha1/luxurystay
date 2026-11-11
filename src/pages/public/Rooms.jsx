import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { RoomCard } from '@/components/rooms/RoomCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ROOM_CATEGORIES } from '@/data/roomCategories'
import { INITIAL_ROOMS } from '@/data/rooms'

export default function Rooms() {
  const [search, setSearch] = useState('')
  const [guests, setGuests] = useState('')
  const list = useMemo(() => ROOM_CATEGORIES.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) && (!guests || r.maxGuests >= Number(guests))), [search, guests])

  return (
    <div className="container-page py-12">
      <PageHeader eyebrow="LuxuryStay" title="Rooms & Suites" description="Five room categories, all priced in Pakistani Rupees (PKR)." />
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Input label="Search" icon={Search} placeholder="e.g. Deluxe" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select label="Guests" placeholder="Any" value={guests} onChange={(e) => setGuests(e.target.value)}
          options={[1, 2, 3, 4].map((n) => ({ value: n, label: `${n}+ guests` }))} />
      </div>
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => <RoomCard key={r.id} room={r} available={INITIAL_ROOMS.filter((x) => x.categoryId === r.id && x.status === 'available').length} />)}
        </div>
      ) : <EmptyState title="No rooms match" description="Try clearing the search or guest filter." />}
    </div>
  )
}
