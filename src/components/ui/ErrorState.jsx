import { RotateCcw, TriangleAlert } from 'lucide-react'
import { Button } from './Button'

export function ErrorState({ title = 'Something went wrong', message = 'Please try again in a moment.', onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-200">
        <TriangleAlert className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-navy-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-navy-500">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" leftIcon={RotateCcw} onClick={onRetry} className="mt-5">
          Try again
        </Button>
      )}
    </div>
  )
}
