import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/hooks/useAuth'

export default function GuestProfile() {
  const { user } = useAuth()
  return (
    <div>
      <PageHeader title="My Profile" />
      <Card className="max-w-lg space-y-3 text-sm">
        {[['Name', user.name], ['Email', user.email], ['Phone', user.phone || '—']].map(([k, v]) => <p key={k} className="flex justify-between"><span className="text-navy-500">{k}</span><span className="font-medium">{v}</span></p>)}
      </Card>
    </div>
  )
}
