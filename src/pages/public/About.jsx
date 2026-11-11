import { PageHeader } from '@/components/common/PageHeader'
import { HOTEL } from '@/data/settings'
import { getImage } from '@/utils/images'

export default function About() {
  return (
    <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2">
      <div>
        <PageHeader eyebrow="About Us" title={`Welcome to ${HOTEL.shortName}`} />
        <p className="leading-relaxed text-navy-600">{HOTEL.name} offers 50 thoughtfully designed rooms and suites across five categories, from comfortable Standard Rooms to the grand Presidential Suite.</p>
        <p className="mt-4 leading-relaxed text-navy-600">Our team is committed to warm, attentive service, so every guest — traveller, family or business — feels truly looked after.</p>
      </div>
      <img src={getImage('lobby.avif')} alt="LuxuryStay lobby" className="rounded-2xl object-cover shadow-card" />
    </div>
  )
}
