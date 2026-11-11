import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { formatDate } from '@/utils/dates'

export default function Maintenance() {
  const { issues, resolveIssue } = useHotel()
  const toast = useToast()
  const columns = [
    { label: 'Ref', render: (i) => <b>{i.id}</b> }, { label: 'Room', render: (i) => i.roomId.replace('room-', '') },
    { label: 'Issue', render: (i) => i.description }, { label: 'Reported', render: (i) => formatDate(i.date) },
    { label: 'Status', render: (i) => <StatusBadge status={i.status} /> },
    { label: 'Action', render: (i) => i.status === 'open' && <Button size="sm" variant="outline" onClick={() => { resolveIssue(i.id); toast.success('Issue resolved', `Room ${i.roomId.replace('room-', '')} sent for cleaning`) }}>Mark resolved</Button> },
  ]
  return <div><PageHeader title="Maintenance" description={`${issues.filter((i) => i.status === 'open').length} open issue(s)`} /><DataTable columns={columns} rows={issues} empty="No maintenance issues." /></div>
}
