import { useState } from 'react'
import { Printer } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { getCategoryById } from '@/data/roomCategories'
import { HOTEL } from '@/data/settings'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { calcBill } from '@/utils/billing'
import { formatCurrency } from '@/utils/currency'
import { formatDate, nightsBetween } from '@/utils/dates'

const Line = ({ label, value, bold }) => <div className={`flex justify-between py-1.5 text-sm ${bold ? 'border-t border-navy-200 pt-3 font-semibold' : ''}`}><span>{label}</span><span>{value}</span></div>

// Shared invoice list for Admin, Reception and Guest (`readOnly` hides "Mark paid").
export default function Billing({ title = 'Billing & Invoices', rows, readOnly = false }) {
  const { markPaid, settings } = useHotel()
  const toast = useToast()
  const [open, setOpen] = useState(null)
  const invoices = rows.map((b) => {
    const category = getCategoryById(b.categoryId)
    const nights = nightsBetween(b.checkIn, b.checkOut)
    return { b, category, nights, no: b.id.replace('BK', 'INV'), bill: calcBill({ price: category.price, nights, services: b.services }, settings) }
  })
  const due = invoices.filter((i) => i.b.paymentStatus !== 'paid').reduce((s, i) => s + i.bill.total, 0)

  return (
    <div>
      <PageHeader title={title} description={`Outstanding: ${formatCurrency(due)}`} />
      <Card padded={false}>
        {invoices.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-ivory text-xs uppercase text-navy-500"><tr>{['Invoice', 'Guest', 'Stay', 'Total', 'Payment', 'Actions'].map((h) => <th key={h} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-navy-100">
                {invoices.map((i) => (
                  <tr key={i.no}><td className="px-5 py-3 font-medium">{i.no}</td><td className="px-5 py-3">{i.b.guest}</td><td className="px-5 py-3">{formatDate(i.b.checkIn)} – {formatDate(i.b.checkOut)}</td>
                    <td className="px-5 py-3">{formatCurrency(i.bill.total)}</td><td className="px-5 py-3"><StatusBadge status={i.b.paymentStatus} /></td>
                    <td className="px-5 py-3"><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setOpen(i)}>View</Button>
                      {!readOnly && i.b.paymentStatus !== 'paid' && <Button size="sm" variant="gold" onClick={() => { markPaid(i.b.id); toast.success('Payment recorded', i.no) }}>Mark paid</Button>}</div></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyState title="No invoices yet" description="Invoices are created from bookings." />}
      </Card>

      <Modal open={Boolean(open)} onClose={() => setOpen(null)} title={open ? `Invoice ${open.no}` : ''} size="lg"
        footer={<Button leftIcon={Printer} onClick={() => window.print()}>Print invoice</Button>}>
        {open && (
          <div className="print-area bg-white p-2">
            <p className="font-serif text-xl font-semibold">{HOTEL.name}</p>
            <p className="text-xs text-navy-500">{HOTEL.address} · {HOTEL.phone}</p>
            <p className="mt-4 text-sm"><b>{open.b.guest}</b> · Room {open.b.roomId.replace('room-', '')} · {open.category.name}<br />{formatDate(open.b.checkIn)} to {formatDate(open.b.checkOut)} ({open.nights} nights)</p>
            <div className="mt-4">
              <Line label={`Room charges (${open.nights} × ${formatCurrency(open.category.price)})`} value={formatCurrency(open.bill.subtotal)} />
              <Line label="Additional services" value={formatCurrency(open.bill.services)} />
              <Line label={`Service charge (${settings.serviceChargePercent}%)`} value={formatCurrency(open.bill.serviceCharge)} />
              <Line label={`Tax (${settings.taxRatePercent}%)`} value={formatCurrency(open.bill.tax)} />
              <Line label="Total (PKR)" value={formatCurrency(open.bill.total)} bold />
            </div>
            <p className="mt-3 text-sm">Payment status: <b className="capitalize">{open.b.paymentStatus}</b></p>
          </div>
        )}
      </Modal>
    </div>
  )
}
