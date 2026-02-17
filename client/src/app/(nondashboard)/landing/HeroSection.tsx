'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const [location, setLocation] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (location.trim()) {
      router.push(`/search?location=${encodeURIComponent(location.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: 'easeOut',
        }}
        className='absolute inset-0'
      >
        <Image
          src='/landing-1.jpg'
          alt='Hero Section'
          fill
          className='object-cover object-center'
          priority
        />
      </motion.div>
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30'></div>
      <div className='absolute inset-0 bg-black/20'></div>{' '}
      <div className='absolute inset-0 flex items-center justify-center text-center'>
        <div className='max-w-4xl mx-auto px-6 -mt-24'>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='text-5xl md:text-7xl font-thin text-white mb-6 tracking-tight leading-[1.1] mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
          >
            <span className='font-light italic text-zinc-100'>
              In Pursuit of the Exceptional
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className='text-lg md:text-xl text-white mb-10 font-light tracking-[0.05em] max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
          >
            A curated collection of the world's most prestigious residences,
            tailored to the way you live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='flex justify-center items-center'
          >
            <div className='flex w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 focus-within:bg-white focus-within:backdrop-blur-none'>
              <Input
                type='text'
                placeholder='Where would you like to reside?'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                className='flex-grow rounded-none border-none bg-transparent h-16 px-8 text-black placeholder:text-zinc-500 focus-visible:ring-0 text-sm tracking-wide'
              />
              <Button
                onClick={handleSearch}
                className='bg-zinc-900 text-white rounded-none border-none hover:bg-black h-16 px-12 uppercase tracking-[0.4em] text-[10px] font-bold transition-all duration-500'
              >
                SEARCH
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
