// Simulates network latency in mock services.
export const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))