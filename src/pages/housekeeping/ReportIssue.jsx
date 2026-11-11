import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'

export default function ReportIssue() {
  const { rooms, addIssue } = useHotel()
  const toast = useToast()
  const [roomId, setRoomId] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const submit = (e) => {
    e.preventDefault()
    const found = {}
    if (!roomId) found.room = 'Select a room.'
    if (description.trim().length < 5) found.description = 'Describe the issue (at least 5 characters).'
    setErrors(found)
    if (Object.keys(found).length) return
    addIssue({ roomId, description: description.trim(), reportedBy: 'Housekeeping' })
    toast.success('Issue reported', 'Maintenance has been notified.')
    setRoomId(''); setDescription('')
  }
  return (
    <div>
      <PageHeader title="Report an Issue" />
      <Card as="form" onSubmit={submit} noValidate className="max-w-lg space-y-4">
        <Select label="Room" placeholder="Select room" value={roomId} error={errors.room} onChange={(e) => setRoomId(e.target.value)}
          options={[...rooms].sort((a, b) => a.number - b.number).map((r) => ({ value: r.id, label: `Room ${r.number}` }))} />
        <Textarea label="Issue description" value={description} error={errors.description} onChange={(e) => setDescription(e.target.value)} />
        <Button type="submit" variant="gold">Submit report</Button>
      </Card>
    </div>
  )
}
