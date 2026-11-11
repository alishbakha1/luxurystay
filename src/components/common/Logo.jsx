import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

export function Logo({ variant = 'dark', compact = false, className }) {
  const light = variant === 'light'
  return (
    <Link to="/" aria-label="LuxuryStay Hospitality — home" className={cn('inline-flex items-center gap-3', className)}>
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-serif text-lg font-semibold ring-1',
          light ? 'bg-gold-500 text-navy-950 ring-gold-300/50' : 'bg-navy-900 text-gold-400 ring-gold-500/40',
        )}
      >
        LS
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={cn('block font-serif text-xl font-semibold tracking-wide', light ? 'text-white' : 'text-navy-900')}>
            LuxuryStay
          </span>
          <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-gold-600">
            Hospitality
          </span>
        </span>
      )}
    </Link>
  )
}