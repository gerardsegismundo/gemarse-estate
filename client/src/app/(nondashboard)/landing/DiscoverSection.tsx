'use client'

import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const DiscoverSection = () => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className='pt-24 pb-52 bg-white'
    >
      <div className='max-w-6xl mx-auto px-6'>
        <motion.div variants={itemVariants} className='mb-20 text-center'>
          <h2 className='text-xs uppercase tracking-[0.5em] text-zinc-400 mb-4'>
            Process
          </h2>
          <h3 className='text-4xl font-extralight text-zinc-900 mb-6'>
            The Path to Your <span className='italic'>Next Chapter</span>
          </h3>
          <p className='text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed'>
            We have distilled the acquisition process into a seamless
            experience, allowing you more time to envision your life in your new
            estate.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 text-center'>
          {[
            {
              imageSrc: '/landing-icon-wand.png',
              title: 'Selection',
              description:
                "Browse our curated collection of luxury estates in the world's most sought-after locations.",
            },
            {
              imageSrc: '/landing-icon-calendar.png',
              title: 'Reservation',
              description:
                'Once you have found your ideal residence, secure your stay with our discrete and streamlined booking system.',
            },
            {
              imageSrc: '/landing-icon-heart.png',
              title: 'Arrival',
              description:
                'Step into your new life and begin experiencing the tranquility and prestige of a Gemarse Estate.',
            },
          ].map((card, i) => (
            <motion.div key={i} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string
  title: string
  description: string
}) => (
  <div className='group px-4'>
    <div className='mb-8 flex items-center justify-center h-16 w-16 mx-auto border border-zinc-100 rounded-full transition-colors group-hover:border-zinc-900'>
      <Image
        src={imageSrc}
        alt={title}
        width={24}
        height={24}
        className='opacity-80 group-hover:opacity-100 transition-opacity invert'
      />
    </div>
    <h4 className='text-sm uppercase tracking-[0.2em] font-medium text-zinc-900 mb-3'>
      {title}
    </h4>
    <p className='text-sm text-zinc-500 font-light leading-relaxed'>
      {description}
    </p>
  </div>
)

export default DiscoverSection
