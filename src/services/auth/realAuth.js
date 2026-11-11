// REAL authentication — talks to the Express API (wired up during backend integration).
// Expected endpoints:
//   POST /auth/login      { email, password }          → { user }  (+ sets httpOnly cookie)
//   POST /auth/register   { name, email, phone, password } → { user }
//   POST /auth/logout                                  → 204/200
//   GET  /auth/me                                      → { user } or 401
import { api } from '@/services/auth/api'

export const realAuth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (payload) => api.post('/auth/register', payload),
  logout: () => api.post('/auth/logout'),

  async restoreSession() {
    try {
      const { user } = await api.get('/auth/me')
      return user
    } catch (error) {
      if (error.status === 401) return null
      throw error
    }
  },
}