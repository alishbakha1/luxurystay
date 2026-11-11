import { useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '@/services/auth/authService'
import { AuthContext } from './contexts'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    authService
      .restoreSession()
      .then((restored) => active && setUser(restored))
      .catch(() => {})
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const { user: signedIn } = await authService.login(credentials)
    setUser(signedIn)
    return signedIn
  }, [])

  const register = useCallback(async (payload) => {
    const { user: created } = await authService.register(payload)
    setUser(created)
    return created
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      hasRole: (roles) => Boolean(user) && [].concat(roles).includes(user.role),
    }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}