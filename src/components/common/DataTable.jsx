import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

// columns: [{ label, render: (row) => node }]
export function DataTable({ columns, rows, empty = 'Nothing to show yet.' }) {
  return (
    <Card padded={false}>
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-ivory text-xs uppercase text-navy-500"><tr>{columns.map((c) => <th key={c.label} className="px-5 py-3 font-medium">{c.label}</th>)}</tr></thead>
            <tbody className="divide-y divide-navy-100">
              {rows.map((row, i) => <tr key={row.id ?? i}>{columns.map((c) => <td key={c.label} className="px-5 py-3">{c.render(row)}</td>)}</tr>)}
            </tbody>
          </table>
        </div>
      ) : <EmptyState title={empty} />}
    </Card>
  )
}
