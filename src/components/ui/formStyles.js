import { cn } from '@/utils/cn'

export const controlClasses = (error) =>
  cn(
    'block w-full rounded-lg border bg-white px-3.5 text-sm text-navy-900 transition-colors',
    'placeholder:text-navy-300 disabled:cursor-not-allowed disabled:bg-navy-50',
    error
      ? 'border-red-400 focus-visible:outline-red-500'
      : 'border-navy-200 hover:border-navy-300 focus-visible:outline-gold-500',
  )