import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import { ROLE_HOME } from '@/routes/navconfig'
import { email, matchesField, minLength, phone, required, validateForm } from '@/utils/validators'

const SCHEMA = {
  name: [required('Full name')], email: [required('Email'), email()], phone: [required('Phone'), phone()],
  password: [required('Password'), minLength(8, 'Password')],
  confirm: [required('Confirmation'), matchesField('password', 'Passwords do not match.')],
}

export default function Register() {
  const { register, user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const [v, setV] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />

  const set = (e) => { setV((c) => ({ ...c, [e.target.name]: e.target.value })); setErrors((c) => ({ ...c, [e.target.name]: undefined })) }
  const submit = async (e) => {
    e.preventDefault()
    const found = validateForm(v, SCHEMA)
    if (!consent) found.consent = 'Please accept the privacy policy.'
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      const created = await register(v)
      toast.success('Account created', `Welcome, ${created.name}.`)
      navigate(ROLE_HOME[created.role], { replace: true })
    } catch (err) {
      toast.error('Registration failed', err.message)
      setBusy(false)
    }
  }
  return (
    <div className="container-page flex justify-center py-12">
      <form onSubmit={submit} noValidate className="w-full max-w-md space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <h1 className="text-3xl font-semibold">Create an account</h1>
        <Input label="Full name" name="name" value={v.name} onChange={set} error={errors.name} required />
        <Input label="Email" name="email" type="email" value={v.email} onChange={set} error={errors.email} required />
        <Input label="Phone" name="phone" placeholder="0300 1234567" value={v.phone} onChange={set} error={errors.phone} required />
        <Input label="Password" name="password" type="password" value={v.password} onChange={set} error={errors.password} required />
        <Input label="Confirm password" name="confirm" type="password" value={v.confirm} onChange={set} error={errors.confirm} required />
        <label className="flex items-start gap-2 text-sm text-navy-600">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
          <span>I agree to the <Link to="/privacy" className="font-medium text-gold-700">privacy policy</Link>.</span>
        </label>
        {errors.consent && <p role="alert" className="text-xs font-medium text-red-600">{errors.consent}</p>}
        <Button type="submit" size="lg" className="w-full" loading={busy}>Create account</Button>
        <p className="text-center text-sm text-navy-500">Already registered? <Link to="/login" className="font-semibold text-gold-700">Sign in</Link></p>
      </form>
    </div>
  )
}
