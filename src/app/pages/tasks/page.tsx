'use client'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { Task } from '@prisma/client'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const load = async () => setTasks((await apiClient('/api/tasks', 'GET')).tasks)
  useEffect(() => { load() }, [])
  const add = async () => { await apiClient('/api/tasks', 'POST', { title }); setTitle(''); load() }
  const toggle = async (t: Task) => { await apiClient('/api/tasks', 'PUT', { id: t.id, done: !t.done }); load() }
  const del = async (id: String) => { await apiClient('/api/tasks', 'DELETE', { id }); load() }

  return (
    <div className="">
      {/* <div className="flex gap-2 mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <Button onClick={add}>Add</Button>
      </div> */}

      <table className="w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr
              key={t.id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => toggle(t)}
              >
                {t.title}
              </td>
              <td className="px-4 py-2">
                {t.done && <Badge variant="outline">Done</Badge>}
              </td>
              <td className="px-4 py-2 text-right">
                <Button variant="destructive" onClick={() => del(t.id)}>
                  Delete
                </Button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}
