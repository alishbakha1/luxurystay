import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { ROOM_CATEGORIES, getCategoryById } from '@/data/roomCategories'
import { useAuth } from '@/hooks/useAuth'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { EXTRA_SERVICES, calcBill } from '@/utils/billing'
import { formatCurrency } from '@/utils/currency'
import { formatDate, nightsBetween, toISODate } from '@/utils/dates'
import { isRoomFree } from '@/utils/availability'
import { email, phone, required, validateForm } from '@/utils/validators'

const STEPS = ['Dates & room', 'Guest details', 'Review']
const SCHEMA = { guest: [required('Full name')], email: [required('Email'), email()], phone: [required('Phone'), phone()] }
const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between py-1.5 text-sm ${bold ? 'border-t border-navy-100 pt-3 text-base font-semibold text-navy-900' : 'text-navy-600'}`}><span>{label}</span><span>{value}</span></div>
)

export default function Booking() {
  const [params] = useSearchParams()
  const { user } = useAuth()
  const { rooms, bookings, addBooking, settings } = useHotel()
  const toast = useToast()
  const today = toISODate(new Date())
  const [step, setStep] = useState(0)
  const [f, setF] = useState({ categoryId: params.get('category') || 'standard', checkIn: params.get('checkIn') || today, checkOut: params.get('checkOut') || '', guests: params.get('guests') || '2' })
  const [roomId, setRoomId] = useState('')
  const [checked, setChecked] = useState(false)
  const [g, setG] = useState({ guest: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' })
  const [errors, setErrors] = useState({})
  const [extras, setExtras] = useState([])
  const [done, setDone] = useState(null)

  const category = getCategoryById(f.categoryId)
  const nights = nightsBetween(f.checkIn, f.checkOut)
  const validDates = nights > 0 && f.checkIn >= today
  const free = useMemo(() => (checked && validDates
    ? rooms.filter((r) => r.categoryId === f.categoryId && isRoomFree(r, bookings, f.checkIn, f.checkOut)) : []), [checked, validDates, rooms, bookings, f])
  const tooMany = Number(f.guests) > category.maxGuests
  const servicesTotal = EXTRA_SERVICES.filter((s) => extras.includes(s.id)).reduce((sum, s) => sum + s.price, 0)
  const bill = calcBill({ price: category.price, nights, services: servicesTotal }, settings)
  const room = rooms.find((r) => r.id === roomId)

  const setField = (e) => { setF((c) => ({ ...c, [e.target.name]: e.target.value })); setChecked(false); setRoomId('') }
  const confirm = () => {
    try {
      setDone(addBooking({ guest: g.guest, email: g.email, phone: g.phone, roomId, categoryId: f.categoryId, checkIn: f.checkIn, checkOut: f.checkOut, guests: Number(f.guests), services: servicesTotal, total: bill.total }))
      toast.success('Reservation confirmed')
    } catch (err) { toast.error('Could not book', err.message); setStep(0); setChecked(false) }
  }

  if (done) return (
    <div className="container-page flex justify-center py-16">
      <Card className="max-w-md text-center">
        <CircleCheck className="mx-auto h-12 w-12 text-emerald-600" />
        <h1 className="mt-4 text-2xl font-semibold">Booking confirmed</h1>
        <p className="mt-2 text-sm text-navy-600">Reference <b>{done.id}</b> · Room {room?.number} · {formatDate(done.checkIn)} to {formatDate(done.checkOut)}</p>
        <p className="mt-1 text-lg font-semibold">{formatCurrency(done.total)}</p>
        <Button as={Link} to="/" className="mt-6">Back to home</Button>
      </Card>
    </div>
  )

  return (
    <div className="container-page max-w-4xl py-12">
      <PageHeader eyebrow="Reservation" title="Book your stay" />
      <ol className="mb-8 flex gap-2 text-xs font-medium sm:text-sm">
        {STEPS.map((s, i) => <li key={s} className={`flex-1 rounded-lg px-3 py-2 text-center ${i === step ? 'bg-navy-900 text-white' : i < step ? 'bg-gold-100 text-gold-800' : 'bg-white text-navy-400'}`}>{i + 1}. {s}</li>)}
      </ol>

      {step === 0 && (
        <Card className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Room category" name="categoryId" value={f.categoryId} onChange={setField} options={ROOM_CATEGORIES.map((c) => ({ value: c.id, label: `${c.name} — ${formatCurrency(c.price)}` }))} />
            <Input label="Guests" name="guests" type="number" min="1" value={f.guests} onChange={setField} error={tooMany ? `Maximum ${category.maxGuests} guests for this room.` : undefined} />
            <Input label="Check-in" name="checkIn" type="date" min={today} value={f.checkIn} onChange={setField} />
            <Input label="Check-out" name="checkOut" type="date" min={f.checkIn} value={f.checkOut} onChange={setField} />
          </div>
          <Button variant="gold" disabled={!validDates || tooMany} onClick={() => setChecked(true)}>Check availability</Button>
          {!validDates && f.checkOut && <p className="text-sm text-red-600">Check-out must be after check-in.</p>}
          {checked && (free.length ? (
            <div>
              <p className="mb-3 text-sm font-medium">{free.length} rooms available · {nights} night(s) · select a room:</p>
              <div className="flex flex-wrap gap-2">
                {free.map((r) => <button key={r.id} type="button" onClick={() => setRoomId(r.id)} aria-pressed={roomId === r.id} className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${roomId === r.id ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 bg-white hover:border-gold-500'}`}>Room {r.number}</button>)}
              </div>
            </div>
          ) : <p className="text-sm text-red-600">No rooms of this category are free for these dates. Try other dates or a different category.</p>)}
          <div className="flex justify-end"><Button disabled={!roomId} onClick={() => setStep(1)}>Continue</Button></div>
        </Card>
      )}

      {step === 1 && (
        <Card className="space-y-5">
          <Input label="Full name" value={g.guest} onChange={(e) => setG({ ...g, guest: e.target.value })} error={errors.guest} required />
          <Input label="Email" type="email" value={g.email} onChange={(e) => setG({ ...g, email: e.target.value })} error={errors.email} required />
          <Input label="Phone" placeholder="0300 1234567" value={g.phone} onChange={(e) => setG({ ...g, phone: e.target.value })} error={errors.phone} required />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => { const found = validateForm(g, SCHEMA); setErrors(found); if (!Object.keys(found).length) setStep(2) }}>Review booking</Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="space-y-4">
          <p className="text-sm text-navy-600">{category.name} · Room {room?.number} · {g.guest}<br />{formatDate(f.checkIn)} → {formatDate(f.checkOut)} ({nights} nights, {f.guests} guests)</p>
          <fieldset><legend className="mb-2 text-sm font-medium">Additional services</legend>
            {EXTRA_SERVICES.map((s) => <label key={s.id} className="flex items-center gap-2 py-1 text-sm"><input type="checkbox" checked={extras.includes(s.id)} onChange={() => setExtras((c) => (c.includes(s.id) ? c.filter((x) => x !== s.id) : [...c, s.id]))} />{s.label} ({formatCurrency(s.price)})</label>)}
          </fieldset>
          <div>
            <Row label={`${nights} nights × ${formatCurrency(category.price)}`} value={formatCurrency(bill.subtotal)} />
            <Row label="Additional services" value={formatCurrency(bill.services)} />
            <Row label={`Service charge (${settings.serviceChargePercent}%)`} value={formatCurrency(bill.serviceCharge)} />
            <Row label={`Tax (${settings.taxRatePercent}%)`} value={formatCurrency(bill.tax)} />
            <Row label="Total (PKR)" value={formatCurrency(bill.total)} bold />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button variant="gold" onClick={confirm}>Confirm reservation</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
