'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import FeatureCard from './FeatureCard'
import { FEATURE_DATA } from './constants'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const FeatureSection = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className='py-32 px-6 sm:px-8 lg:px-12 bg-white'
    >
      <div className='max-w-7xl mx-auto'>
        <motion.div className='max-w-4xl mx-auto text-center mb-24'>
          <h2 className='text-3xl md:text-4xl font-extralight text-zinc-900 tracking-tight leading-tight mb-4'>
            The Art of{' '}
            <span className='italic font-light text-zinc-400'>
              Refined Selection
            </span>
          </h2>
          <p className='text-[11px] text-zinc-500 font-light tracking-[0.4em] uppercase'>
            Explore our signature approach to finding your next masterpiece.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24'>
          {FEATURE_DATA.map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className='h-full'>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default FeatureSection
