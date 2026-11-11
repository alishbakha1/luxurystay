import { DEMO_USERS } from '@/data/users'
import { delay } from '@/utils/async'

const SESSION_KEY = 'luxurystay.mock-session'
const users = [...DEMO_USERS]

function withoutPassword(user) {
  const { id, name, email, role, phone, title } = user
  return { id, name, email, role, phone, title }
}

export const mockAuth = {
  async login({ email, password }) {
    await delay()
    const user = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase() &&
        candidate.password === password,
    )

    if (!user) {
      throw new Error('Invalid email or password.')
    }

    const safeUser = withoutPassword(user)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return { user: safeUser }
  },

  async register(payload) {
    await delay()
    const email = payload.email.trim().toLowerCase()
    if (users.some((user) => user.email.toLowerCase() === email)) {
      throw new Error('An account with this email already exists.')
    }

    const user = {
      ...payload,
      id: `usr-${Date.now()}`,
      email,
      role: 'guest',
    }
    users.push(user)

    const safeUser = withoutPassword(user)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return { user: safeUser }
  },

  async logout() {
    sessionStorage.removeItem(SESSION_KEY)
  },

  async restoreSession() {
    const session = sessionStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  },
}
