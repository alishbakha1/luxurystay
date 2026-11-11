import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useAuth } from '@/hooks/useAuth'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'

export default function GuestFeedback() {
  const { user } = useAuth()
  const { addFeedback } = useHotel()
  const toast = useToast()
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({})
  const submit = (e) => {
    e.preventDefault()
    const found = {}
    if (!rating) found.rating = 'Please choose a rating.'
    if (comment.trim().length < 5) found.comment = 'Please write a short comment.'
    setErrors(found)
    if (Object.keys(found).length) return
    addFeedback({ guest: user.name, rating: Number(rating), comment: comment.trim() })
    toast.success('Thank you', 'Your feedback has been submitted.')
    setRating(''); setComment('')
  }
  return (
    <div>
      <PageHeader title="Feedback" description="Tell us about your stay." />
      <Card as="form" onSubmit={submit} noValidate className="max-w-lg space-y-4">
        <Select label="Rating" placeholder="Select" value={rating} error={errors.rating} onChange={(e) => setRating(e.target.value)}
          options={[5, 4, 3, 2, 1].map((n) => ({ value: n, label: `${n} star${n > 1 ? 's' : ''}` }))} />
        <Textarea label="Comment" value={comment} error={errors.comment} onChange={(e) => setComment(e.target.value)} />
        <Button type="submit" variant="gold">Submit feedback</Button>
      </Card>
    </div>
  )
}
