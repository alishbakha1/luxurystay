import { PageHeader } from '@/components/common/PageHeader'
import { HOTEL } from '@/data/settings'

const SECTIONS = [
  ['Information we collect', 'Name, contact details, booking and payment records needed to manage your stay.'],
  ['How we use it', 'To process reservations, issue invoices, provide services and improve our hospitality.'],
  ['Your rights', 'You may request access, correction or deletion of your personal data at any time.'],
  ['Security', 'We restrict access by role and protect data in transit and at rest.'],
]

export default function Privacy() {
  return (
    <div className="container-page max-w-3xl py-12">
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      {SECTIONS.map(([h, t]) => <section key={h} className="mb-6"><h2 className="font-sans text-base font-semibold">{h}</h2><p className="mt-1 text-sm leading-relaxed text-navy-600">{t}</p></section>)}
      <p className="text-sm text-navy-600">Questions? Contact {HOTEL.email}.</p>
    </div>
  )
}
