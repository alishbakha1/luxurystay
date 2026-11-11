import { Link } from 'react-router-dom'
import { BedDouble, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getImage } from '@/utils/images'
import { formatCurrency } from '@/utils/currency'

export function RoomCard({ room, available }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft transition-shadow hover:shadow-card">
      <div className="aspect-[3/2] overflow-hidden">
        <img src={getImage(room.images[0])} alt={room.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-semibold text-navy-900">{room.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-navy-500">{room.shortDescription}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-600">
          <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-gold-600" />{room.bedType}</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-gold-600" />Up to {room.maxGuests} guests</span>
        </div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-navy-900">{formatCurrency(room.price)}</p>
            <p className="text-xs text-navy-500">per night{available != null && ` · ${available} available`}</p>
          </div>
          <Button as={Link} to={`/rooms/${room.id}`} size="sm" variant="outline">View details</Button>
        </div>
      </div>
    </article>
  )
}
