import { useEffect, useRef } from 'react'

// Calls handler when the user clicks outside `ref` or presses Escape.
export function useClickOutside(ref, handler, active = true) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!active) return undefined
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handlerRef.current(event)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') handlerRef.current(event)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, active])
}