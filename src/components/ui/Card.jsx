import { cn } from '@/utils/cn'

export function Card({ as: Component = 'div', padded = true, className, children, ...props }) {
  return (
    <Component
      className={cn('rounded-2xl border border-navy-100 bg-white shadow-soft', padded && 'p-5 sm:p-6', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export function CardHeader({ title, description, action, className }) {
  return (
    <div className={cn('mb-5 flex items-start justify-between gap-4', className)}>
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-navy-900">{title}</h3>
        {description && <p className="mt-0.5 text-sm text-navy-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}