import { useState } from 'react'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'

export default function Settings() {
  const { settings, updateSettings } = useHotel()
  const toast = useToast()
  const [v, setV] = useState({ taxRatePercent: String(settings.taxRatePercent), serviceChargePercent: String(settings.serviceChargePercent) })
  const [errors, setErrors] = useState({})
  const set = (e) => { setV({ ...v, [e.target.name]: e.target.value }); setErrors({ ...errors, [e.target.name]: undefined }) }
  const save = (e) => {
    e.preventDefault()
    const found = {}
    for (const k of Object.keys(v)) { const n = Number(v[k]); if (v[k] === '' || n < 0 || n > 50) found[k] = 'Enter a percentage between 0 and 50.' }
    setErrors(found)
    if (Object.keys(found).length) return
    updateSettings({ taxRatePercent: Number(v.taxRatePercent), serviceChargePercent: Number(v.serviceChargePercent) })
    toast.success('Settings saved', 'New rates apply to new bookings and invoices.')
  }
  return (
    <div>
      <PageHeader title="Settings" description="Billing rates used for all bookings and invoices (PKR)." />
      <Card as="form" onSubmit={save} noValidate className="max-w-lg space-y-4">
        <Input label="Tax rate (%)" name="taxRatePercent" type="number" step="0.5" value={v.taxRatePercent} onChange={set} error={errors.taxRatePercent} />
        <Input label="Service charge (%)" name="serviceChargePercent" type="number" step="0.5" value={v.serviceChargePercent} onChange={set} error={errors.serviceChargePercent} />
        <Button type="submit" variant="gold">Save settings</Button>
      </Card>
    </div>
  )
}
