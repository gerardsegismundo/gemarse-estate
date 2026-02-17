'use client'

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const CallToActionSection = () => {
  return (
    <div className='relative py-32 overflow-hidden'>
      <Image
        src='/landing-call-to-action.jpg'
        alt='Search Section Background'
        fill
        className='object-cover object-center scale-105'
        priority
      />

      <div className='absolute inset-0 bg-black/60 backdrop-blur-[2px]'></div>

      <motion.div
        variants={ctaVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.5 }}
        className='relative max-w-6xl mx-auto px-6 py-20'
      >
        <div className='flex flex-col lg:flex-row justify-between items-center text-center lg:text-left'>
          <div className='mb-10 lg:mb-0 max-w-xl'>
            <h2 className='text-[12px] uppercase tracking-[0.6em] text-zinc-100/90 mb-4 font-semibold drop-shadow-md'>
              The Next Step
            </h2>
            <h3 className='text-5xl md:text-6xl font-extralight text-white leading-tight mb-6'>
              Find your <span className='italic'>Dream Rental</span> Property
            </h3>
            <p className='text-zinc-300 font-light tracking-wide'>
              Discover a wide range of curated rental properties in your desired
              location.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-6'>
            <Link
              href='/search'
              className='bg-white text-black px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-zinc-200'
            >
              SEARCH
            </Link>
            <Link
              href='/signup'
              className='border border-white/30 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white hover:text-black'
              scroll={false}
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CallToActionSection
