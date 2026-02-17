import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar'
import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// ... (imports remain the same)

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname()
  const { toggleSidebar, open } = useSidebar()

  const navLinks =
    userType === 'manager'
      ? [
          { icon: Building, label: 'Properties', href: '/managers/properties' },
          {
            icon: FileText,
            label: 'Applications',
            href: '/managers/applications',
          },
          { icon: Settings, label: 'Settings', href: '/managers/settings' },
        ]
      : [
          { icon: Heart, label: 'Favorites', href: '/tenants/favorites' },
          {
            icon: FileText,
            label: 'Applications',
            href: '/tenants/applications',
          },
          { icon: Home, label: 'Residences', href: '/tenants/residences' },
          { icon: Settings, label: 'Settings', href: '/tenants/settings' },
        ]

  return (
    <Sidebar
      collapsible='icon'
      className='shadow-none border-r border-zinc-200 mt-[6rem]'
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                'flex min-h-[56px] w-full items-center pt-3 mb-3 transition-all duration-300',
                open ? 'justify-between px-6' : 'justify-center'
              )}
            >
              <div
                className={cn(
                  'overflow-hidden transition-all duration-500 ease-in-out',
                  open ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                )}
              >
                <h1 className='text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 whitespace-nowrap'>
                  {userType === 'manager' ? 'Manager Portal' : 'Renter Portal'}
                </h1>
              </div>

              <button
                className='hover:bg-zinc-50 p-2 rounded-none transition-colors duration-300'
                onClick={() => toggleSidebar()}
              >
                {open ? (
                  <X className='h-4 w-4 text-zinc-400' />
                ) : (
                  <Menu className='h-4 w-4 text-zinc-400' />
                )}
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className='gap-2 px-2'>
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'flex items-center transition-all duration-300 rounded-none h-12',
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900',
                    !open && 'justify-center px-0'
                  )}
                >
                  <Link href={link.href} className='w-full' scroll={false}>
                    <div
                      className={cn(
                        'flex items-center gap-4',
                        open ? 'px-4' : 'justify-center'
                      )}
                    >
                      <link.icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          isActive ? 'text-white' : 'text-zinc-400'
                        )}
                      />

                      {open && (
                        <span className='text-[11px] uppercase tracking-[0.2em] font-bold'>
                          {link.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
