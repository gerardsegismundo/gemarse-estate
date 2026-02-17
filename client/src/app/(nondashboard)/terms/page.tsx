'use client'

import React from 'react'

const sections = [
  {
    title: '01. Scope of Service',
    content:
      'Gemarse Estate provides a curated digital marketplace for luxury property discovery. We act as an intermediary between estate owners and prospective residents, ensuring a high-standard interface for viewing and inquiry.',
  },
  {
    title: '02. User Responsibility',
    content:
      'Users are responsible for providing accurate and verifiable information during the inquiry process. Any misuse of the platform or submission of fraudulent documentation will result in immediate termination of access.',
  },
  {
    title: '03. Data & Privacy',
    content:
      'Your privacy is paramount. Personal data collected during inquiries is used strictly for property coordination and is protected by industry-standard encryption. We do not sell user data to third-party marketing entities.',
  },
  {
    title: '04. Limitation of Liability',
    content:
      'While Gemarse Estate rigorously inspects all featured listings, we are not liable for discrepancies in physical property conditions or lease negotiations conducted independently between users and owners.',
  },
]

const TermsPage = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center overflow-y-auto px-6'>
      {/* <div className='min-h-screen w-full flex items-center justify-center py-20 px-6 md:px-10'> */}
      <div className='max-w-4xl w-full'>
        <div className='flex flex-col gap-16'>
          {sections.map((section, index) => (
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

        {/* <div className='mt-24 border-t border-zinc-100 pt-16 text-center'>
          <p className='text-[12px] uppercase tracking-[0.3em] font-light text-zinc-400 mb-8 italic'>
            By continuing to browse our portfolio, you agree to these terms.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 justify-center'>
            <button className='bg-zinc-900 text-white px-12 py-4 text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-zinc-800 transition-all duration-700'>
              Accept
            </button>
            <button className='border border-zinc-200 text-zinc-900 px-12 py-4 text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-zinc-50 transition-all duration-700'>
              Download PDF
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default TermsPage
