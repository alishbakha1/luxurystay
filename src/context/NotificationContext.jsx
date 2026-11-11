import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastViewport } from '@/components/ui/Toast'
import { NotificationContext } from './contexts'

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback((type, title, message, duration = 4500) => {
    counter.current += 1
    const id = counter.current
    setToasts((current) => [...current.slice(-3), { id, type, title, message, duration }])
    return id
  }, [])

  const toast = useMemo(
    () => ({
      success: (title, message) => push('success', title, message),
      error: (title, message) => push('error', title, message, 6500),
      warning: (title, message) => push('warning', title, message, 5500),
      info: (title, message) => push('info', title, message),
      dismiss,
    }),
    [push, dismiss],
  )

  return (
    <NotificationContext.Provider value={toast}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </NotificationContext.Provider>
  )
}
