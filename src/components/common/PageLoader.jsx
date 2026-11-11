import { Spinner } from '@/components/ui/Spinner'
import { cn } from '@/utils/cn'

export function PageLoader({ fullScreen = false }) {
  return (
    <div className={cn('flex w-full items-center justify-center', fullScreen ? 'min-h-screen' : 'min-h-[50vh]')}>
      <Spinner size="lg" />
    </div>
  )
}
