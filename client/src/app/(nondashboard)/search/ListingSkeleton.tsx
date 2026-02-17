import React from 'react'

const ListingSkeleton = () => (
  <div className='w-full h-40 mb-5 bg-zinc-50 border border-zinc-100 animate-pulse flex'>
    <div className='w-1/3 bg-zinc-200' />
    <div className='w-2/3 p-4 space-y-3'>
      <div className='h-3 w-1/2 bg-zinc-200' />
      <div className='h-3 w-3/4 bg-zinc-200' />
      <div className='h-3 w-1/4 bg-zinc-200 pt-4' />
    </div>
  </div>
)

export default ListingSkeleton
