'use client'
import { apiClient } from '@/lib/api-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useEffect,useState } from 'react'
import { Task } from '@prisma/client'

export default function TasksPage() {
  const [tasks,setTasks]=useState<any[]>([])
  const [title,setTitle]=useState('')
  const load=async()=>setTasks((await apiClient('/api/tasks','GET')).tasks)
  useEffect(()=>{load()},[])
  const add=async()=>{await apiClient('/api/tasks','POST',{title});setTitle('');load()}
  const toggle=async(t: Task)=>{await apiClient('/api/tasks','PUT',{id:t.id,done:!t.done});load()}
  const del=async(id: String)=>{await apiClient('/api/tasks','DELETE',{id});load()}

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex gap-2"><Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="New task" /><Button onClick={add}>Add</Button></div>
      {tasks.map(t=>(
        <Card key={t.id} className="flex justify-between items-center">
          <div onClick={()=>toggle(t)} className="cursor-pointer">
            {t.title} {t.done && <Badge variant="outline">Done</Badge>}
          </div>
          <Button variant="destructive" onClick={()=>del(t.id)}>Delete</Button>
        </Card>
      ))}
    </div>
  )
}
