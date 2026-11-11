import { forwardRef } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  primary: 'bg-navy-900 text-white shadow-soft hover:bg-navy-800',
  gold: 'bg-gold-500 text-navy-950 shadow-soft hover:bg-gold-400',
  outline: 'border border-navy-200 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50',
  ghost: 'text-navy-700 hover:bg-navy-50',
  danger: 'bg-red-600 text-white shadow-soft hover:bg-red-700',
  'outline-light': 'border border-white/30 text-white hover:bg-white/10',
}

const SIZES = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-12 gap-2 px-7 text-base',
  icon: 'h-10 w-10',
}

// Use as a link:  <Button as={Link} to="/rooms">Rooms</Button>
export const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className,
    children,
    disabled,
    type,
    ...props
  },
  ref,
) {
  const isButton = Component === 'button'
  return (
    <Component
      ref={ref}
      type={isButton ? (type ?? 'button') : undefined}
      disabled={isButton ? disabled || loading : undefined}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap transition-all duration-200',
        'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : LeftIcon && <LeftIcon className="h-4 w-4" aria-hidden="true" />}
      {children}
      {!loading && RightIcon && <RightIcon className="h-4 w-4" aria-hidden="true" />}
    </Component>
  )
})