'use client'

import { CoreTable } from '@/components/CoreTable'
import { ColumnDef } from '@tanstack/react-table'


export type CountriesTableData = {
  id: string
  name: string
  code: string
}

export const Columns: ColumnDef<CountriesTableData>[] = [
  {
    accessorKey: 'name',
    header: 'Country Name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div>{row.getValue('code')}</div>,
  },
]

export default function CountriesPage() {
  return (
    <CoreTable<CountriesTableData, unknown>
      title="Countries"
      columns={Columns}
      endpoint="/api/countries"
      fields={{ name: '', code: '' }}
    />
  )
}
