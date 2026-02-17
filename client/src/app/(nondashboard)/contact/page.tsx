'use client'

import React from 'react'
import { Mail, Phone, Globe } from 'lucide-react'

const ContactPage = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center overflow-y-auto px-6'>
      <div className='w-full max-w-6xl'>
        <div className='flex flex-col lg:flex-row gap-20'>
          <div className='lg:w-1/3 flex flex-col gap-12'>
            <div>
              <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-6'>
                London Office
              </h3>
              <p className='text-zinc-500 text-[14px] leading-relaxed font-light tracking-wide'>
                12 Mayfair Square
                <br />
                London, W1J 8AJ
                <br />
                United Kingdom
              </p>
            </div>

            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-4'>
                <Phone className='w-5 h-5 stroke-[1px] text-zinc-900' />
                <span className='text-[14px] tracking-widest font-light text-zinc-500'>
                  +44 20 7946 0123
                </span>
              </div>

              <div className='flex items-center gap-4'>
                <Mail className='w-5 h-5 stroke-[1px] text-zinc-900' />
                <span className='text-[14px] tracking-widest font-light text-zinc-500'>
                  concierge@gemarse.com
                </span>
              </div>

              <div className='flex items-center gap-4'>
                <Globe className='w-5 h-5 stroke-[1px] text-zinc-900' />
                <span className='text-[14px] tracking-widest font-light text-zinc-500'>
                  gemarse-estate.com
                </span>
              </div>
            </div>
          </div>

          <div className='lg:w-2/3'>
            <form className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div className='flex flex-col gap-3'>
                <label className='text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
                  Full Name
                </label>
                <input
                  type='text'
                  className='border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors text-[16px] font-light tracking-wide'
                />
              </div>

              <div className='flex flex-col gap-3'>
                <label className='text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors text-[16px] font-light tracking-wide'
                />
              </div>

              <div className='flex flex-col gap-3 md:col-span-2'>
                <label className='text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
                  Subject
                </label>
                <select className='border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors text-[16px] font-light tracking-wide bg-transparent'>
                  <option>Property Inquiry</option>
                  <option>List Your Estate</option>
                  <option>Investment Consultation</option>
                  <option>General Support</option>
                </select>
              </div>

              <div className='flex flex-col gap-3 md:col-span-2'>
                <label className='text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-400'>
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder='How can we assist you?'
                  className='border-b border-zinc-200 py-3 focus:border-zinc-900 outline-none transition-colors text-[16px] font-light tracking-wide resize-none'
                />
              </div>

              <div className='md:col-span-2 mt-10'>
                <button
                  type='submit'
                  className='bg-zinc-900 text-white px-14 py-5 text-[12px] uppercase tracking-[0.4em] font-bold hover:bg-zinc-800 transition-all duration-500 shadow-lg shadow-zinc-200/50'
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
