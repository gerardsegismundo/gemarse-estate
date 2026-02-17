'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Award, Users, TrendingUp } from 'lucide-react'

const About = () => {
  const stats = [
    { value: '15+', label: 'Years of Excellence' },
    { value: '2,500+', label: 'Properties Curated' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '$2.5B+', label: 'Portfolio Value' },
  ]

  const values = [
    {
      icon: Building2,
      title: 'Uncompromising Quality',
      description:
        'Every property in our collection meets the highest standards of luxury and sophistication.',
    },
    {
      icon: Award,
      title: 'Proven Excellence',
      description:
        'Award-winning service recognized by industry leaders and satisfied clients worldwide.',
    },
    {
      icon: Users,
      title: 'Personalized Service',
      description:
        'Dedicated specialists who understand your unique vision and lifestyle requirements.',
    },
    {
      icon: TrendingUp,
      title: 'Market Leadership',
      description:
        'Exclusive access to premier properties before they reach the open market.',
    },
  ]

  return (
    <div className='min-h-screen'>
      <section className='relative h-[70vh] w-full overflow-hidden'>
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className='absolute inset-0'
        >
          <Image
            src='/landing-1.jpg'
            alt='About Gemarse Estate'
            fill
            className='object-cover object-center'
            priority
          />
        </motion.div>
        <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70' />

        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='max-w-4xl mx-auto px-6 text-center'>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-[10px] uppercase tracking-[0.4em] text-zinc-300 mb-6 font-medium'
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-5xl md:text-7xl font-thin text-white mb-6 tracking-tight leading-[1.1]'
            >
              <span className='font-light italic'>Redefining Luxury</span>
              <br />
              <span className='font-extralight'>Real Estate</span>
            </motion.h1>
          </div>
        </div>
      </section>

      <section className='py-32 px-6 sm:px-8 lg:px-12 bg-zinc-50'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-8'>
                Our Philosophy
              </h2>
              <p className='text-zinc-600 leading-relaxed mb-6 text-[15px]'>
                At Gemarse Estate, we believe that a home is more than just a
                property—it's a reflection of your aspirations, your
                achievements, and your lifestyle. For over fifteen years, we
                have dedicated ourselves to connecting discerning clients with
                the world's most exceptional residences.
              </p>
              <p className='text-zinc-600 leading-relaxed text-[15px]'>
                Our approach combines meticulous attention to detail,
                unparalleled market knowledge, and a commitment to excellence
                that has made us the trusted choice for luxury real estate
                worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='relative h-[500px] bg-zinc-200'
            >
              <Image
                src='/landing-1.jpg'
                alt='Luxury Estate'
                fill
                className='object-cover'
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-24 px-6 sm:px-8 lg:px-12 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-12'>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className='text-center border-l border-zinc-200 px-6'
              >
                <p className='text-4xl md:text-5xl font-thin text-zinc-900 mb-3'>
                  {stat.value}
                </p>
                <p className='text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-medium'>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-32 px-6 sm:px-8 lg:px-12 bg-zinc-50'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-24'
          >
            <h2 className='text-3xl md:text-4xl font-extralight text-zinc-900 tracking-tight mb-4'>
              Our{' '}
              <span className='italic font-light text-zinc-400'>
                Core Values
              </span>
            </h2>
            <p className='text-[10px] text-zinc-500 font-light tracking-[0.4em] uppercase'>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className='bg-white p-8 border border-zinc-100'
                >
                  <Icon className='w-8 h-8 text-zinc-900 mb-6 stroke-[1.5px]' />
                  <h3 className='text-[12px] uppercase tracking-[0.2em] font-bold text-zinc-900 mb-4'>
                    {value.title}
                  </h3>
                  <p className='text-[13px] text-zinc-600 leading-relaxed'>
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className='py-32 px-6 sm:px-8 lg:px-12 bg-zinc-900'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl md:text-5xl font-thin text-white mb-8 tracking-tight'>
              <span className='italic font-light'>Begin Your Journey</span>
            </h2>
            <p className='text-zinc-400 text-[15px] leading-relaxed mb-12 max-w-2xl mx-auto'>
              Discover how Gemarse Estate can help you find the residence that
              perfectly embodies your vision of luxury living.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='bg-white text-zinc-900 px-12 py-5 uppercase tracking-[0.4em] text-[10px] font-bold transition-all duration-300 hover:bg-zinc-100'
            >
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
