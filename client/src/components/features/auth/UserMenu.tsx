'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { signOut } from 'aws-amplify/auth'
import { useAppDispatch } from '@/state/redux'
import { api } from '@/state/api'

interface UserMenuProps {
  userName: string
  userRole: string
  onSignOut: () => void
}

const UserMenu = ({ userName, userRole, onSignOut }: UserMenuProps) => {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-4 focus:outline-none group'>
        <div className='hidden md:block'>
          <span className='text-[12px] uppercase tracking-widest font-bold transition-colors'>{userName}</span>
        </div>
        <Avatar className='h-9 w-9 rounded-full transition-all duration-300 group-hover:border-zinc-400 border border-transparent overflow-hidden'>
          <AvatarFallback className='bg-zinc-900 text-white text-[12px] font-bold flex items-center justify-center w-full h-full'>
            {userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-52 mt-4 border-zinc-100 p-1 shadow-2xl bg-white'>
        <DropdownMenuItem
          onClick={() =>
            router.push(
              userRole.toLowerCase() === 'manager'
                ? '/managers/properties'
                : '/tenants/favorites'
            )
          }
          className='text-[12px] uppercase tracking-widest cursor-pointer py-3 focus:bg-zinc-50 focus:text-zinc-900'
        >
          Go to Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/${userRole.toLowerCase()}s/settings`)}
          className='text-[12px] uppercase tracking-widest cursor-pointer py-3 focus:bg-zinc-50 focus:text-zinc-900'
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-zinc-100' />
        <DropdownMenuItem
          onClick={onSignOut}
          className='text-[12px] uppercase tracking-widest cursor-pointer py-3 text-red-600 focus:bg-red-50 focus:text-red-700'
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
