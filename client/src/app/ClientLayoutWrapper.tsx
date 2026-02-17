'use client'

import { usePathname } from 'next/navigation'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isLanding = pathname === '/' || pathname === '/landing'
  const isDashboard =
    pathname.startsWith('/tenant') || pathname.startsWith('/manager')

  return (
    <div
      className={`${!isLanding ? 'pt-[7rem]' : isDashboard ? 'pt[12-rem]' : ''} w-full`}
    >
      {children}
    </div>
  )
}
