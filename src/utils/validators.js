const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PK_PHONE_PATTERN = /^(?:\+92|0)\d{9,10}$/

const isEmpty = (value) => !String(value ?? '').trim()

export const required = (label = 'This field') => (value) =>
  isEmpty(value) ? `${label} is required.` : undefined

export const email = (message = 'Enter a valid email address.') => (value) =>
  isEmpty(value) || EMAIL_PATTERN.test(String(value).trim()) ? undefined : message

export const minLength = (min, label = 'This field') => (value) =>
  isEmpty(value) || String(value).length >= min
    ? undefined
    : `${label} must be at least ${min} characters.`

export const phone = (message = 'Enter a valid phone number, e.g. 0300 1234567.') => (value) =>
  isEmpty(value) || PK_PHONE_PATTERN.test(String(value).replace(/[\s-]/g, ''))
    ? undefined
    : message

export const matchesField = (field, message) => (value, values) =>
  value === values[field] ? undefined : message

// schema = { fieldName: [rule, rule, ...] } → returns { fieldName: 'first error' }
export function validateForm(values, schema) {
  const errors = {}
  for (const [field, rules] of Object.entries(schema)) {
    for (const rule of rules) {
      const message = rule(values[field], values)
      if (message) {
        errors[field] = message
        break
      }
    }
  }
  return errors
}