import { Hammer } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Card } from '@/components/ui/Card'

export default function NewBooking() {
  return (
    <div>
      <PageHeader title="New Booking" eyebrow="LuxuryStay" />

      <Card className="min-h-[480px] border border-navy-100 bg-[#f6f4f1] shadow-none">
        <div className="flex min-h-[420px] flex-col items-center justify-center gap-7 px-6 py-10 text-center sm:px-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-200 bg-[#faf8f4] text-gold-700 shadow-sm sm:h-24 sm:w-24">
            <Hammer className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.8} aria-hidden="true" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-navy-900 sm:text-3xl lg:text-[2.1rem]">
              New Booking is on the way
            </h2>
            <p className="mx-auto max-w-xl text-base text-navy-500 sm:text-lg">
              This screen is scheduled for Phase 5 of the build. The layout, navigation and access rules around it are already live.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
