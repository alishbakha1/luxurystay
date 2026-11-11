import { LoaderCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

const SIZES = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-9 w-9' }

export function Spinner({ size = 'md', label = 'Loading', className }) {
  return (
    <span role="status" className="inline-flex">
      <LoaderCircle className={cn('animate-spin text-gold-600', SIZES[size], className)} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  )
}