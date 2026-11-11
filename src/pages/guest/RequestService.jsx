import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SERVICE_OPTIONS } from '@/data/feedback'
import { useAuth } from '@/hooks/useAuth'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { formatDate } from '@/utils/dates'

export default function RequestService() {
  const { user } = useAuth()
  const { requests, addRequest } = useHotel()
  const toast = useToast()
  const [service, setService] = useState('')
  const [error, setError] = useState('')
  const mine = requests.filter((r) => r.guest === user.name)
  const submit = (e) => {
    e.preventDefault()
    if (!service) return setError('Choose a service.')
    addRequest({ guest: user.name, service }); setService(''); setError('')
    toast.success('Request sent', 'Our team will attend to it shortly.')
  }
  return (
    <div className="space-y-6">
      <PageHeader title="Request a Service" />
      <Card as="form" onSubmit={submit} noValidate className="max-w-lg space-y-4">
        <Select label="Service" placeholder="Select" value={service} error={error} onChange={(e) => setService(e.target.value)} options={SERVICE_OPTIONS.map((s) => ({ value: s, label: s }))} />
        <Button type="submit" variant="gold">Send request</Button>
      </Card>
      <DataTable columns={[{ label: 'Ref', render: (r) => r.id }, { label: 'Service', render: (r) => r.service }, { label: 'Date', render: (r) => formatDate(r.date) }, { label: 'Status', render: (r) => <StatusBadge status={r.status} /> }]} rows={mine} empty="No requests yet." />
    </div>
  )
}
