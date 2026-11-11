
import { cn } from '@/utils/cn'

const TONES = {
  success: { box: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15', dot: 'bg-emerald-500' },
  info: { box: 'bg-sky-50 text-sky-700 ring-sky-600/15', dot: 'bg-sky-500' },
  warning: { box: 'bg-amber-50 text-amber-700 ring-amber-600/20', dot: 'bg-amber-500' },
  danger: { box: 'bg-red-50 text-red-700 ring-red-600/15', dot: 'bg-red-500' },
  neutral: { box: 'bg-navy-50 text-navy-600 ring-navy-600/10', dot: 'bg-navy-400' },
  gold: { box: 'bg-gold-50 text-gold-800 ring-gold-600/20', dot: 'bg-gold-500' },
  navy: { box: 'bg-navy-900 text-white ring-navy-900', dot: 'bg-gold-400' },
}

export function Badge({ tone = 'neutral', dot = false, className, children }) {
  const style = TONES[tone] ?? TONES.neutral
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset', style.box, className)}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', style.dot)} aria-hidden="true" />}
      {children}
    </span>
  )
}