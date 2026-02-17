'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import React, { useEffect } from 'react'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import Sidebar from '@/components/AppSidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading, isError } = useGetAuthUserQuery()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!authUser) return

    const role = authUser.userRole?.toLowerCase()

    if (
      (role === 'manager' && pathname.startsWith('/tenants')) ||
      (role === 'tenant' && pathname.startsWith('/managers'))
    ) {
      router.replace(
        role === 'manager' ? '/managers/properties' : '/tenants/favorites'
      )
    }
  }, [authUser, pathname, router])

  if (isLoading) return <>Loading...</>

  if (!authUser || isError) {
    router.replace('/signin')
    return null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <main className='flex w-100'>
        <Sidebar userType={authUser.userRole.toLowerCase()} />
        <div className='p-8 flex-grow w-full'>{children}</div>
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout
