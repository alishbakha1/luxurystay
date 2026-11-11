import { Link, useParams } from 'react-router-dom'
import { BedDouble, Check, Maximize, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { getCategoryById } from '@/data/roomCategories'
import { INITIAL_ROOMS } from '@/data/rooms'
import { formatCurrency } from '@/utils/currency'
import { getImage } from '@/utils/images'

export default function RoomDetails() {
  const { id } = useParams()
  const room = getCategoryById(id)
  if (!room) return <EmptyState title="Room not found" action={<Button as={Link} to="/rooms">All rooms</Button>} />
  const free = INITIAL_ROOMS.filter((r) => r.categoryId === id && r.status === 'available').length

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <img src={getImage(room.images[0])} alt={room.name} className="aspect-[3/2] w-full rounded-2xl object-cover shadow-card" />
        <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">{room.name}</h1>
        <p className="mt-3 leading-relaxed text-navy-600">{room.description}</p>
        <h2 className="mt-8 font-sans text-base font-semibold">Facilities</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {room.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm text-navy-700"><Check className="h-4 w-4 text-gold-600" />{a}</li>)}
        </ul>
      </div>
      <aside className="h-fit rounded-2xl border border-navy-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
        <p className="text-3xl font-semibold text-navy-900">{formatCurrency(room.price)}</p>
        <p className="text-sm text-navy-500">per night · {free} rooms available today</p>
        <ul className="my-5 space-y-2 text-sm text-navy-700">
          <li className="flex gap-2"><BedDouble className="h-4 w-4 text-gold-600" />{room.bedType}</li>
          <li className="flex gap-2"><Users className="h-4 w-4 text-gold-600" />Up to {room.maxGuests} guests</li>
          <li className="flex gap-2"><Maximize className="h-4 w-4 text-gold-600" />{room.sizeSqFt} sq ft</li>
        </ul>
        <Button as={Link} to={`/booking?category=${room.id}`} variant="gold" size="lg" className="w-full">Book this room</Button>
      </aside>
    </div>
  )
}
