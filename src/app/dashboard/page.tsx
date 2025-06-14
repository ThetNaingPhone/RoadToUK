// app/dashboard/layout.tsx
import Sidebar from '@/components/sider'
import { Header } from '@/components/header'
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { constRoutes } from '@/constants/routes/routes';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const session = await getCurrentUser();

    if(!session) {
        redirect(constRoutes.login)
    }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
