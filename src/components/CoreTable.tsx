// components/CoreTable.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'

interface CoreTableProps<TData, TValue> {
  title: string
  columns: ColumnDef<TData, TValue>[]
  endpoint: string
  fields: Record<string, string> // e.g. { name: "", code: "" }
}

export function CoreTable<TData, TValue>({
  title,
  columns,
  endpoint,
  fields,
}: CoreTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>([])
  const [form, setForm] = useState(fields)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const load = async () => {
    const res = await apiClient(endpoint, 'GET')
    setData(res?.countries || res || [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleInputChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleAdd = async () => {
    await apiClient(endpoint, 'POST', form)
    setForm(fields)
    load()
  }

  const handleDelete = async (id: string) => {
    await apiClient(endpoint, 'DELETE', { id })
    load()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex gap-2">
        {Object.entries(form).map(([key, value]) => (
          <Input
            key={key}
            placeholder={key}
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
          />
        ))}
        <Button onClick={handleAdd}>Add</Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              {/* Add delete button per row if desired */}
              {'id' in row.original && (
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete((row.original as any).id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
