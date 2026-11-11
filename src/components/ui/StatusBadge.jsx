import { STATUS_TONES } from '@/utils/constants'
import { formatStatusLabel } from '@/utils/strings'
import { Badge } from './Badge'

export function StatusBadge({ status, className }) {
  return (
    <Badge tone={STATUS_TONES[status] ?? 'neutral'} dot className={className}>
      {formatStatusLabel(status)}
    </Badge>
  )
}
