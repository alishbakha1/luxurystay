import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Car, Dumbbell, Mail, MapPin, Phone, Sparkles, Star, Utensils, Waves, Wifi } from 'lucide-react'
import { RoomCard } from '@/components/rooms/RoomCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROOM_CATEGORIES } from '@/data/roomCategories'
import { INITIAL_ROOMS } from '@/data/rooms'
import { HOTEL } from '@/data/settings'
import { getImage } from '@/utils/images'
import { toISODate } from '@/utils/dates'

const FACILITIES = [
  [Waves, 'Rooftop Pool', 'Heated infinity pool with skyline views.'],
  [Utensils, 'Fine Dining', 'Pakistani and international cuisine, all day.'],
  [Sparkles, 'Spa & Wellness', 'Massage and treatments by expert therapists.'],
  [Dumbbell, 'Fitness Centre', 'Modern equipment, open 24 hours.'],
  [Wifi, 'High-speed Wi-Fi', 'Complimentary across the whole property.'],
  [Car, 'Valet & Transfers', 'Airport pick-up and secure parking.'],
]
const TESTIMONIALS = [
  ['Ayesha Khan', 'Impeccable service and a beautiful suite. The staff remembered every preference.'],
  ['Daniyal Shah', 'The best business stay I have had in Karachi — quiet, elegant and efficient.'],
  ['Maria Fernandes', 'Our family room was spacious and spotless. The children loved the pool.'],
]
const availableIn = (id) => INITIAL_ROOMS.filter((r) => r.categoryId === id && r.status === 'available').length

export default function Home() {
  const navigate = useNavigate()
  const today = toISODate(new Date())
  const [q, setQ] = useState({ checkIn: today, checkOut: '', guests: '2' })
  const set = (e) => setQ((c) => ({ ...c, [e.target.name]: e.target.value }))
  const search = (e) => { e.preventDefault(); navigate(`/booking?${new URLSearchParams(q)}`) }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900">
        <img src={getImage('lobbyrecp.jpg')} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45" />
        <div className="container-page py-24 sm:py-32">
          <span className="mb-5 block h-0.5 w-12 bg-gold-500" />
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">{HOTEL.tagline}</h1>
          <p className="mt-5 max-w-xl text-lg text-navy-100">Refined rooms, warm service and thoughtful details in the heart of Karachi.</p>
          <div className="mt-8 flex gap-3">
            <Button as={Link} to="/rooms" variant="gold" size="lg">Explore Rooms</Button>
            <Button as={Link} to="/about" variant="outline-light" size="lg">Our Story</Button>
          </div>
        </div>
      </section>

      <div className="container-page -mt-10 relative z-10">
        <form onSubmit={search} className="grid items-end gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <Input label="Check-in" name="checkIn" type="date" min={today} value={q.checkIn} onChange={set} required />
          <Input label="Check-out" name="checkOut" type="date" min={q.checkIn || today} value={q.checkOut} onChange={set} required />
          <Input label="Guests" name="guests" type="number" min="1" max="4" value={q.guests} onChange={set} required />
          <Button type="submit" variant="gold" size="lg">Check availability</Button>
        </form>
      </div>

      <section className="container-page py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Rooms & Suites</p>
        <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Find your perfect stay</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ROOM_CATEGORIES.map((room) => <RoomCard key={room.id} room={room} available={availableIn(room.id)} />)}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <h2 className="text-3xl font-semibold sm:text-4xl">Hotel facilities</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FACILITIES.map(([Icon, title, text]) => (
              <div key={title} className="rounded-2xl border border-navy-100 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-700 ring-1 ring-gold-200"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 font-semibold text-navy-900">{title}</h3>
                <p className="mt-1 text-sm text-navy-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-3xl font-semibold sm:text-4xl">Guest testimonials</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(([name, text]) => (
            <figure key={name} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
              <div className="flex gap-0.5 text-gold-500">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-navy-600">{text}</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-navy-900">{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-navy-900 py-14 text-white">
        <div className="container-page grid gap-6 text-sm sm:grid-cols-3">
          <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold-400" />{HOTEL.address}</p>
          <p className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-gold-400" />{HOTEL.phone}</p>
          <p className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-gold-400" />{HOTEL.email}</p>
        </div>
      </section>
    </>
  )
}
