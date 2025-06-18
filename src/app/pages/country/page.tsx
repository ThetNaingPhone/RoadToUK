'use client'

import { CoreTable } from '@/components/CoreTable'
import { ColumnDef } from '@tanstack/react-table'

export type UserTableData = {
  id: string
  name: string
  email: string
  passwordHash: string
}

export const Columns: ColumnDef<UserTableData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <div>{row.getValue('code')}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
]

export const formKey = [
  {
    key: 'name',
    label: 'Name',
    placeholder: 'Enter Name',
    type: 'input',
    rules: { required: true, message: 'Required' },
  },
  {
    key: 'code',
    label: 'Code',
    placeholder: 'Enter Code',
    type: 'input',
    rules: { required: true, message: 'Required' },
  },
  {
    key: 'description',
    label: 'Description',
    placeholder: 'Enter Description',
    type: 'input',
    rules: { required: true, message: 'Required' },
  },
]

const fields = Object.fromEntries(formKey.map((f) => [f.key, '']))

export default function UserPage() {
  return (
    <CoreTable<UserTableData, unknown>
      title="Country"
      columns={Columns}
      endpoint="/api/country"
      fields={fields}
      formKey={formKey}
      responseKey="country"
    />
  )
}
