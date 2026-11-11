import { useContext } from 'react'
import { NotificationContext } from '@/context/contexts'

export function useToast() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useToast must be used inside <NotificationProvider>')
  return context
}