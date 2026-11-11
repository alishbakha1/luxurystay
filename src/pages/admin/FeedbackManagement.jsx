import { Star } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { useHotel } from '@/hooks/useHotel'
import { formatDate } from '@/utils/dates'

export const Stars = ({ n }) => <span className="inline-flex text-gold-500" aria-label={`${n} out of 5`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-4 w-4 ${i <= n ? 'fill-current' : 'text-navy-200'}`} />)}</span>

export default function FeedbackManagement() {
  const { feedback } = useHotel()
  const avg = feedback.length ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : '—'
  const columns = [
    { label: 'Guest', render: (f) => <b>{f.guest}</b> }, { label: 'Rating', render: (f) => <Stars n={f.rating} /> },
    { label: 'Comment', render: (f) => f.comment }, { label: 'Date', render: (f) => formatDate(f.date) },
  ]
  return <div><PageHeader title="Feedback Management" description={`Average rating ${avg} / 5 · ${feedback.length} reviews`} /><DataTable columns={columns} rows={feedback} empty="No feedback yet." /></div>
}
