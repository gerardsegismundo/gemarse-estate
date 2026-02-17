import React from 'react'

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className='my-10'>
      <h1 className='text-[14px] uppercase tracking-[0.4em] font-bold text-zinc-900 mb-3'>
        {title}
      </h1>
      <div className='h-[1px] w-12 bg-zinc-900 mb-4' />
      {subtitle && (
        <p className='text-[12px] text-zinc-500 uppercase tracking-[0.2em] font-light'>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Header
