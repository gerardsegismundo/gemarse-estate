import React from 'react'

const LoadingSettings = () => {
  return (
    <div className='max-w-4xl pt-2 pb-5 animate-pulse'>
      <div className='mb-10 px-2'>
        <div className='h-8 w-48 bg-zinc-200 mb-3' />
        <div className='h-3 w-64 bg-zinc-100' />
      </div>

      <div className='border border-zinc-100 p-8 shadow-sm'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='space-y-3'>
              <div className='h-3 w-20 bg-zinc-100' />
              <div className='h-12 w-full bg-zinc-50 border border-zinc-100' />
            </div>
          ))}
        </div>

        <div className='mt-12 pt-6 flex justify-end border-t border-zinc-50'>
          <div className='h-10 w-32 bg-zinc-100' />
        </div>
      </div>
    </div>
  )
}

export default LoadingSettings
