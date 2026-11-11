import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { DataTable } from '@/components/common/DataTable'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Select } from '@/components/ui/Select'
import { useHotel } from '@/hooks/useHotel'
import { useToast } from '@/hooks/useToast'
import { ROLE_LABELS } from '@/utils/constants'
import { email, phone, required, validateForm } from '@/utils/validators'

const ROLES = ['manager', 'receptionist', 'housekeeping'].map((r) => ({ value: r, label: ROLE_LABELS[r] }))
const SCHEMA = { name: [required('Name')], email: [required('Email'), email()], phone: [required('Phone'), phone()], title: [required('Job title')] }
const BLANK = { name: '', email: '', phone: '', title: '', role: 'receptionist' }

export default function StaffManagement() {
  const { staff, addStaff, removeStaff } = useHotel()
  const toast = useToast()
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [toRemove, setToRemove] = useState(null)
  const set = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const save = () => {
    const found = validateForm(form, SCHEMA)
    if (staff.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase())) found.email = 'This email is already registered.'
    setErrors(found)
    if (Object.keys(found).length) return
    addStaff({ ...form, name: form.name.trim(), email: form.email.trim() })
    toast.success('Staff member added', form.name); setForm(null)
  }
  const columns = [
    { label: 'Name', render: (u) => <b>{u.name}</b> }, { label: 'Role', render: (u) => <Badge tone="gold">{ROLE_LABELS[u.role]}</Badge> },
    { label: 'Title', render: (u) => u.title }, { label: 'Email', render: (u) => u.email }, { label: 'Phone', render: (u) => u.phone },
    { label: '', render: (u) => u.role !== 'admin' && <Button size="sm" variant="ghost" aria-label={`Remove ${u.name}`} onClick={() => setToRemove(u)}><Trash2 className="h-4 w-4 text-red-600" /></Button> },
  ]
  return (
    <div>
      <PageHeader title="Staff Management" description={`${staff.length} staff members`} actions={<Button leftIcon={Plus} onClick={() => { setErrors({}); setForm(BLANK) }}>Add staff</Button>} />
      <DataTable columns={columns} rows={staff} />
      <Modal open={Boolean(form)} onClose={() => setForm(null)} title="Add staff member" footer={<><Button variant="outline" onClick={() => setForm(null)}>Cancel</Button><Button onClick={save}>Save</Button></>}>
        {form && <div className="space-y-4">
          <Input label="Full name" name="name" value={form.name} onChange={set} error={errors.name} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={set} error={errors.email} required />
          <Input label="Phone" name="phone" value={form.phone} onChange={set} error={errors.phone} required />
          <Input label="Job title" name="title" value={form.title} onChange={set} error={errors.title} required />
          <Select label="Role" name="role" value={form.role} onChange={set} options={ROLES} />
        </div>}
      </Modal>
      <ConfirmDialog open={Boolean(toRemove)} onClose={() => setToRemove(null)} variant="danger" title="Remove staff member?" confirmLabel="Remove" message={`${toRemove?.name} will lose access to the system.`}
        onConfirm={() => { removeStaff(toRemove.id); toast.success('Staff member removed'); setToRemove(null) }} />
    </div>
  )
}
