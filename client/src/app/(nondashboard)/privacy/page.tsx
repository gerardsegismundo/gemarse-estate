'use client'

import React from 'react'
import Link from 'next/link'

const privacySections = [
  {
    title: 'Collection of Intelligence',
    content:
      'We collect specific identifiers necessary to provide a bespoke estate discovery experience. This includes contact details, property preferences, and interaction data within the Gemarse ecosystem to refine our architectural recommendations.',
  },
  {
    title: 'Usage of Personal Data',
    content:
      'Your data is utilized strictly for service optimization, identity verification for private viewings, and curated communication. We prioritize a high-standard of confidentiality; your personal portfolio is never shared with third-party brokers without explicit consent.',
  },
  {
    title: 'Digital Tracking & Cookies',
    content:
      "Gemarse Estate employs minimal tracking technology to ensure platform stability and session continuity. These digital 'footprints' allow us to maintain your filter preferences and favorites across the fixed-map interface.",
  },
  {
    title: 'Security Protocols',
    content:
      'Our infrastructure utilizes industry-standard encryption to protect against unauthorized access. We treat your digital privacy with the same rigor we apply to the physical security of our listed estates.',
  },
]

const PrivacyPage = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-10'>
      <div className='max-w-4xl w-full'>
        <div className='flex flex-col items-center text-center mb-20'></div>

        <div className='flex flex-col gap-16'>
          {privacySections.map((section, index) => (
            <div key={index} className='flex flex-col gap-6'>
              <h2 className='text-[12px] uppercase tracking-[0.4em] font-bold text-zinc-900'>
                {section.title}
              </h2>
              <div className='h-[1px] w-16 bg-zinc-900' />
              <p className='text-zinc-500 text-[14px] leading-[1.8] font-light tracking-widest text-justify lg:text-left'>
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-24 border-t border-zinc-100 pt-16 text-center'>
          <p className='text-[12px] uppercase tracking-[0.3em] font-light text-zinc-400 mb-8 italic'>
            Questions regarding data rights may be directed to our concierge.
          </p>
          <div className='flex justify-center'>
            <Link
              href='/contact'
              className='bg-zinc-900 text-white px-16 py-5 text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-zinc-800 transition-all duration-700'
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
