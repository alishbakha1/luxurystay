import { useEffect } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const STYLES = {
  success: { icon: CircleCheck, accent: 'text-emerald-600', bar: 'bg-emerald-500' },
  error: { icon: CircleAlert, accent: 'text-red-600', bar: 'bg-red-500' },
  warning: { icon: TriangleAlert, accent: 'text-amber-600', bar: 'bg-amber-500' },
  info: { icon: Info, accent: 'text-sky-600', bar: 'bg-sky-500' },
}

function ToastItem({ toast, onDismiss }) {
  const { id, type, title, message, duration } = toast
  const { icon: Icon, accent, bar } = STYLES[type] ?? STYLES.info

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), duration)
    return () => clearTimeout(timer)
  }, [id, duration, onDismiss])

  return (
    <div className="pointer-events-auto relative flex gap-3 overflow-hidden rounded-xl border border-navy-100 bg-white p-4 pr-10 shadow-lift animate-slide-up">
      <span className={cn('absolute inset-y-0 left-0 w-1', bar)} aria-hidden="true" />
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', accent)} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy-900">{title}</p>
        {message && <p className="mt-0.5 text-sm text-navy-500">{message}</p>}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Dismiss notification"
        className="absolute right-2.5 top-2.5 rounded p-1 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function ToastViewport({ toasts, onDismiss }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
