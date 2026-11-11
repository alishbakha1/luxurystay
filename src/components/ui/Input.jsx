import { forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'
import { FormField } from './FormField'
import { controlClasses } from './formStyles'

export const Input = forwardRef(function Input(
  { id, label, error, hint, required, icon: Icon, rightElement, className, wrapperClassName, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FormField id={inputId} label={label} error={error} hint={hint} required={required} className={wrapperClassName}>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" aria-hidden="true" />}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          aria-required={required || undefined}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(controlClasses(error), 'h-11', Icon && 'pl-10', rightElement && 'pr-11', className)}
          {...props}
        />
        {rightElement && <div className="absolute right-1.5 top-1/2 -translate-y-1/2">{rightElement}</div>}
      </div>
    </FormField>
  )
})