'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { constRoutes } from '@/constants/routes/routes'

export default function Login() {
  const [email,setEmail]=useState(''), [password,setPassword]=useState(''), [err,setErr]=useState('')
  const router = useRouter()
  const handle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await apiClient('/api/auth/login','POST',{email,password})
      router.push('/dashboard')
    } catch(err:any){ setErr(err.message) }
  }
  return (
    <form onSubmit={handle} className="max-w-md mx-auto p-6 space-y-4">
      {err && <p className="text-red-500">{err}</p>}
      <Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <Button type="submit">Login</Button>
    </form>
  )
}
