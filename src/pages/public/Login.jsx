import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/common/Logo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { USE_MOCK_API } from '@/config/env'
import { DEMO_USERS } from '@/data/users'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { canAccessPath, ROLE_HOME } from '@/routes/navconfig'
import { ROLE_LABELS } from '@/utils/constants'
import { getImage, hasImage } from '@/utils/images'
import { email, required, validateForm } from '@/utils/validators'

const CURRENT_YEAR = new Date().getFullYear()

const SCHEMA = {
  email: [required('Email address'), email()],
  password: [required('Password')],
}

export default function Login() {
  const { login, isAuthenticated, user } = useAuth()
  const toast = useToast()
  const location = useLocation()

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  if (isAuthenticated) {
    const from = location.state?.from?.pathname
    const target = from && canAccessPath(user.role, from) ? from : ROLE_HOME[user.role]
    return <Navigate to={target} replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validation = validateForm(values, SCHEMA)
    setErrors(validation)
    if (Object.keys(validation).length) return

    setSubmitting(true)
    setSubmitError('')
    try {
      const signedIn = await login({ email: values.email.trim(), password: values.password })
      toast.success('Welcome back', `Signed in as ${signedIn.name}.`)
    } catch (error) {
      setSubmitError(error.message || 'Unable to sign in. Please try again.')
      setSubmitting(false)
    }
  }

  const fillDemo = (account) => {
    setValues({ email: account.email, password: account.password })
    setErrors({})
    setSubmitError('')
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden bg-navy-900 lg:block">
        {hasImage('hero-lobby.jpg') && (
          <img src={getImage('hero-lobby.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-navy-900/70" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo variant="light" />
          <div className="max-w-md">
            <span className="mb-5 block h-0.5 w-12 bg-gold-500" />
            <h2 className="font-serif text-4xl font-semibold leading-tight text-white">Hospitality, perfected.</h2>
            <p className="mt-4 text-base leading-relaxed text-navy-100">
              Sign in to manage reservations, rooms and guest experiences — or to view your own stays and invoices.
            </p>
          </div>
          <p className="text-xs text-navy-300">© {CURRENT_YEAR} LuxuryStay Hospitality</p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col px-4 py-8 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-navy-500 transition-colors hover:text-navy-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </Link>
          <div className="lg:hidden"><Logo compact /></div>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <h1 className="text-3xl font-semibold">Sign in</h1>
          <p className="mt-1.5 text-sm text-navy-500">Welcome back. Enter your details to continue.</p>

          {submitError && (
            <div role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <Input
              label="Email address"
              name="email"
              type="email"
              icon={Mail}
              autoComplete="username"
              placeholder="you@example.com"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              icon={Lock}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="rounded-md p-2 text-navy-400 transition-colors hover:text-navy-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <Button type="submit" size="lg" className="w-full" loading={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-navy-500">
            New guest?{' '}
            <Link to="/register" className="font-semibold text-gold-700 hover:text-gold-800">Create an account</Link>
          </p>

          {USE_MOCK_API && (
            <section aria-labelledby="demo-heading" className="mt-8 rounded-2xl border border-gold-200 bg-gold-50/60 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 id="demo-heading" className="flex items-center gap-2 font-sans text-sm font-semibold text-navy-900">
                  <ShieldCheck className="h-4 w-4 text-gold-700" aria-hidden="true" />
                  Demo accounts
                </h2>
                <Badge tone="gold">Mock authentication</Badge>
              </div>
              <p className="mt-1.5 text-xs text-navy-500">Select a role to fill the form, then press Sign in.</p>

              <ul className="mt-4 divide-y divide-gold-200/70">
                {DEMO_USERS.map((account) => (
                  <li key={account.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900">{ROLE_LABELS[account.role]}</p>
                      <p className="break-all font-mono text-xs text-navy-600">{account.email}</p>
                      <p className="font-mono text-xs text-navy-600">{account.password}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => fillDemo(account)}>
                      Use this account
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}