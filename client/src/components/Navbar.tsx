'use client'

import React, { useState, useEffect } from 'react'
import { Great_Vibes } from 'next/font/google'
import Link from 'next/link'
import { Button } from './ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const logoFont = Great_Vibes({ weight: '400', subsets: ['latin'] })

const Navbar = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery()
  const router = useRouter()
  const pathname = usePathname()

  const isHomePage = pathname === '/' || pathname === '/landing'

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSolid = !isHomePage || isScrolled

  const handleSignout = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-5'
          : 'bg-black/10 backdrop-blur-sm py-6'
      }`}
    >
      <div className='mx-auto flex justify-between items-center px-8'>
        <Link href='/' className='cursor-pointer group'>
          <div
            className={`${logoFont.className} text-5xl transition-all duration-300 ${
              isSolid
                ? 'text-zinc-900'
                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
            }`}
          >
            Gemarse Estate
          </div>
        </Link>

        {isHomePage && (
          <p
            className={`hidden md:block text-[12px] uppercase tracking-[0.5em] font-medium transition-colors duration-300 ${
              isSolid ? 'text-zinc-500' : 'text-zinc-200'
            }`}
          >
            The Pinnacle of Living
          </p>
        )}

        <div className='flex items-center gap-6'>
          {isLoading ? null : authUser ? (
            <div className='flex items-center gap-4'>
              <Link
                href='/search'
                className='group relative py-2 hidden sm:flex items-center gap-2 mr-2'
              >
                <span
                  className={`text-[12px] uppercase tracking-[0.3em] font-bold ${
                    isSolid ? 'text-zinc-800' : 'text-white'
                  }`}
                >
                  Search
                </span>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${
                    isSolid ? 'bg-zinc-800' : 'bg-white'
                  }`}
                />
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-3 focus:outline-none group'>
                  <div className='hidden md:flex flex-col items-end'>
                    <span
                      className={`text-[12px] uppercase tracking-widest font-bold transition-colors ${
                        isSolid ? 'text-zinc-800' : 'text-white'
                      }`}
                    >
                      {authUser.userInfo?.name || 'Account'}
                    </span>
                  </div>

                  <Avatar className='h-9 w-9 rounded-full transition-all duration-300 group-hover:border-zinc-400'>
                    <AvatarImage
                      src={authUser.userInfo?.image}
                      className='object-cover'
                    />
                    <AvatarFallback className='bg-zinc-900 text-white text-[12px] font-light'>
                      {authUser.userInfo?.name?.[0].toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align='end'
                  className='w-52 mt-4  border-zinc-100 p-1 shadow-2xl bg-white'
                >
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === 'manager'
                          ? '/managers/properties'
                          : '/tenants/favorites'
                      )
                    }
                    className='text-[12px] uppercase tracking-widest cursor-pointer py-3 focus:bg-zinc-50 focus:text-zinc-900 '
                  >
                    Go to Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() =>
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`
                      )
                    }
                    className='text-[12px] uppercase tracking-widest cursor-pointer py-3 focus:bg-zinc-50 focus:text-zinc-900 '
                  >
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className='bg-zinc-100' />

                  <DropdownMenuItem
                    onClick={handleSignout}
                    className='text-[12px] uppercase tracking-widest cursor-pointer py-3 text-red-600 focus:bg-red-50 focus:text-red-700 '
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href='/signin' className='group relative'>
                <button
                  className={`text-xs uppercase tracking-widest transition-colors ${
                    isSolid ? 'text-zinc-800' : 'text-white'
                  }`}
                >
                  Login
                </button>
                <span
                  className={`absolute bottom-[-4px] left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${
                    isSolid ? 'bg-zinc-800' : 'bg-white'
                  }`}
                />
              </Link>

              <Link href='/signup'>
                <Button
                  className={` px-8 py-5 text-xs uppercase tracking-widest transition-all duration-300 ${
                    isSolid
                      ? 'bg-zinc-900 text-white hover:bg-zinc-700'
                      : 'bg-white text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
