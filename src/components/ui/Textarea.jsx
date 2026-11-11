import { forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'
import { FormField } from './FormField'
import { controlClasses } from './formStyles'

export const Textarea = forwardRef(function Textarea(
  { id, label, error, hint, required, rows = 4, className, wrapperClassName, ...props },
  ref,
) {
  const autoId = useId()
  const areaId = id ?? autoId
  return (
    <FormField id={areaId} label={label} error={error} hint={hint} required={required} className={wrapperClassName}>
      <textarea
        ref={ref}
        id={areaId}
        rows={rows}
        aria-invalid={Boolean(error) || undefined}
        aria-required={required || undefined}
        aria-describedby={error ? `${areaId}-error` : hint ? `${areaId}-hint` : undefined}
        className={cn(controlClasses(error), 'resize-y py-2.5', className)}
        {...props}
      />
    </FormField>
  )
})