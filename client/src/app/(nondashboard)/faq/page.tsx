'use client'

import Link from 'next/link'
import React from 'react'

const faqs = [
  {
    question: 'How do I schedule a private viewing?',
    answer:
      "Each listing features a 'Request Viewing' button. Once submitted, our curators will coordinate a bespoke tour based on your schedule.",
  },
  {
    question: 'What are the requirements for international applicants?',
    answer:
      'We require verified proof of funds and a valid passport. Additional documentation may be requested depending on the local jurisdiction of the estate.',
  },
  {
    question: 'Is property management included in the lease?',
    answer:
      'Most Gemarse Estates include standard maintenance. Specialized concierge services can be added to your agreement during the consultation phase.',
  },
  {
    question: 'Are your listings verified for quality?',
    answer:
      'Every property undergoes a rigorous 50-point inspection by our architectural experts to ensure it meets the Gemarse standard of luxury.',
  },
]

const FAQPage = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center overflow-y-auto px-6'>
      <div className='max-w-5xl w-full'>
        <div className='flex flex-col items-center text-center mb-20'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16'>
          {faqs.map((faq, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 leading-relaxed'>
                {faq.question}
              </h3>
              <div className='h-[1px] w-8 bg-zinc-200' />
              <p className='text-zinc-500 text-[14px] leading-relaxed font-light tracking-widest'>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-24 border-t border-zinc-100 pt-16 text-center'>
          <p className='text-[12px] uppercase tracking-[0.3em] font-light text-zinc-500 mb-8'>
            Still have questions?
          </p>
          <Link
            href='/contact'
            className='bg-zinc-900 text-white px-16 py-5 text-[12px] uppercase tracking-[0.5em] font-bold hover:bg-zinc-800 transition-all duration-700'
          >
            Contact Concierge
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
