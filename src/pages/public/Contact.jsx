import { useState } from 'react'
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Send, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { HOTEL } from '@/data/settings'
import { useToast } from '@/hooks/useToast'
import { getImage } from '@/utils/images'
import { email, minLength, required, validateForm } from '@/utils/validators'

const SCHEMA = { name: [required('Name')], email: [required('Email'), email()], message: [required('Message'), minLength(10, 'Message')] }
const EMPTY = { name: '', email: '', message: '' }

const CONTACT_DETAILS = [
  { icon: MapPin, label: 'Visit us', value: HOTEL.address, href: `https://maps.google.com/?q=${encodeURIComponent(HOTEL.address)}` },
  { icon: Phone, label: 'Call our team', value: HOTEL.phone, href: `tel:${HOTEL.phone.replace(/[^\d+]/g, '')}` },
  { icon: Mail, label: 'Email us', value: HOTEL.email, href: `mailto:${HOTEL.email}` },
]

export default function Contact() {
  const toast = useToast()
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const set = (e) => { setV((c) => ({ ...c, [e.target.name]: e.target.value })); setErrors((c) => ({ ...c, [e.target.name]: undefined })) }
  const submit = (e) => {
    e.preventDefault()
    const found = validateForm(v, SCHEMA)
    setErrors(found)
    if (Object.keys(found).length) return
    toast.success('Message sent', 'Our team will reply shortly.')
    setV(EMPTY)
  }
  return (
    <main className="container-page py-8 sm:py-12">
      <section className="relative isolate overflow-hidden rounded-[2rem] bg-navy-900 text-white shadow-card">
        <img
          src={getImage('lobby.avif')}
          alt="The welcoming lobby at LuxuryStay"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/25" />
        <div className="max-w-2xl px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">We’re here for you</p>
          <h1 className="font-serif text-4xl font-medium leading-tight text-white sm:text-5xl">
            Let’s make your next stay special.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Have a question, a request, or something to celebrate? Our team would love to help you plan a stay worth remembering.
          </p>
        </div>
      </section>

      <section className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Get in touch</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-900 sm:text-4xl">We’d love to hear from you</h2>
          <p className="mt-4 leading-relaxed text-navy-600">
            Whether you’re planning a visit or already staying with us, we’re just a message away.
          </p>

          <div className="mt-8 space-y-3">
            {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={label === 'Visit us' ? '_blank' : undefined}
                rel={label === 'Visit us' ? 'noreferrer' : undefined}
                className="group flex items-start gap-4 rounded-2xl border border-navy-100/80 bg-white/70 p-4 transition-colors hover:border-gold-300 hover:bg-white"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-800">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 pt-0.5">
                  <span className="block text-sm font-semibold text-navy-900">{label}</span>
                  <span className="mt-1 block break-words text-sm leading-relaxed text-navy-600">{value}</span>
                </span>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-navy-300 transition-colors group-hover:text-gold-700" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-navy-900 p-5 text-white">
            <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Here to make things easier</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-200">
                Ask us about reservations, special requests, or anything that would make your stay more comfortable.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} noValidate className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card sm:p-9">
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">Send a message</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-navy-900">How can we help?</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">Share a few details and our team will be in touch shortly.</p>
          </div>
          <div className="space-y-5">
            <Input label="Name" name="name" value={v.name} onChange={set} error={errors.name} required icon={UserRound} placeholder="Your name" />
            <Input label="Email address" name="email" type="email" value={v.email} onChange={set} error={errors.email} required icon={Mail} placeholder="you@example.com" />
            <Textarea label="Message" name="message" value={v.message} onChange={set} error={errors.message} required rows={5} placeholder="Tell us what’s on your mind..." />
            <Button type="submit" variant="gold" rightIcon={Send} className="w-full sm:w-auto">
              Send your message
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}
