import { USE_MOCK_API } from '@/config/env'
import { mockAuth } from './mockAuth'
import { realAuth } from './realAuth'

// Both providers expose the same contract:
//   login(credentials) → { user }   register(payload) → { user }
//   logout() → void                 restoreSession() → user | null
export const authService = USE_MOCK_API ? mockAuth : realAuth