import { cn } from '@/utils/cn'

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md bg-navy-100', className)} aria-hidden="true" />
}