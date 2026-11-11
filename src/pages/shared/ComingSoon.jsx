import { Hammer } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

export default function ComingSoon({ title, phase }) {
  return (
    <div>
      <PageHeader title={title} eyebrow="LuxuryStay" />
      <Card padded={false}>
        <EmptyState
          icon={Hammer}
          title={`${title} is on the way`}
          description={`This screen is scheduled for Phase ${phase} of the build. The layout, navigation and access rules around it are already live.`}
        />
      </Card>
    </div>
  )
}