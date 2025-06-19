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
    accessorKey: 'username',
    header: 'User Name',
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
]

export const formKey = [
  {
    key: 'username',
    label: 'Username',
    placeholder: 'Enter Username',
    type: 'input',
    rules: { required: true, message: 'Required' },
  },
  {
    key: 'email',
    label: 'Email',
    placeholder: 'Enter Email',
    type: 'input',
    rules: { required: true, message: 'Required' },
  },
  {
    key: 'password',
    label: 'Password',
    placeholder: 'Enter Password',
    type: 'input',
    rules: { required: true, message: 'Required' },
  },
]

const searchKey = [{key: 'username', label: 'Username', placeholder: 'Search by Username'}, {key: 'email', label: 'Email', placeholder: 'Search by Email'}];

const fields = Object.fromEntries(formKey.map((f) => [f.key, '']))

export default function UserPage() {
  return (
    <CoreTable<UserTableData, unknown>
      title="Admin"
      columns={Columns}
      endpoint="/api/admin"
      fields={fields}
      formKey={formKey}
      responseKey="admin"
      searchKey={searchKey}
    />
  )
}
