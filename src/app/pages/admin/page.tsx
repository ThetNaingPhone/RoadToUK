'use client'
import { apiClient } from '@/lib/api-client'
import { Card } from '@/components/ui/card'
import { useEffect,useState } from 'react'

export default function AdminPage() {
  const [s,setS] = useState<{totalUsers:number,totalTasks:number}|null>(null)
  const [err,setErr] = useState('')
  useEffect(()=>{
    apiClient('/api/admin/stats','GET').then(setS).catch(e=>setErr(e.message))
  },[])
  if(err) return <p className="text-red-500 p-6">{err}</p>
  return s && (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Card>Total Users: {s.totalUsers}</Card>
      <Card>Total Tasks: {s.totalTasks}</Card>
    </div>
  )
}
