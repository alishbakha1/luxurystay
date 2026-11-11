import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/hooks/useAuth'
import { ROLE_HOME } from '@/routes/navconfig'

export default function AccessDenied() {
  const { user } = useAuth()
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <EmptyState
          icon={ShieldAlert}
          title="Access denied"
          description="Your account does not have permission to view this page. If you believe this is a mistake, please contact your administrator."
          action={<Button as={Link} to={ROLE_HOME[user?.role] ?? '/'}>Go to my dashboard</Button>}
        />
      </Card>
    </div>
  )
}