const env = import.meta.env

export const USE_MOCK_API = env.VITE_USE_MOCK_API !== 'false'
export const API_URL = env.VITE_API_URL ?? ''
