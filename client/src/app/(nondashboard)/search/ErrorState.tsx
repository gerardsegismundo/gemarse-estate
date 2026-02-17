import React from 'react'
import { House } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ErrorState = ({
  message = 'Unable to retrieve properties at this time.',
}) => (
  <div className='flex flex-col items-center justify-center w-full h-[60vh] border border-dashed border-zinc-200 bg-zinc-50/30'>
    <div className='relative mb-6'>
      {/* House icon with a subtle teal "alert" ring */}
      <House className='w-12 h-12 text-zinc-300 stroke-[1px]' />
      <div className='absolute bottom-3 left-3 w-3 h-3 bg-[#CAD2D3] rounded-none border-2 border-white animate-pulse' />
    </div>

    <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-2'>
      System Connection Interrupted
    </h3>

    <p className='text-[10px] uppercase tracking-widest text-zinc-400 font-light max-w-[240px] text-center leading-loose'>
      {message} <br />
      Please refresh the portal or refine your search.
    </p>

    <Button
      variant='outline'
      onClick={() => window.location.reload()}
      className='mt-8 rounded-none border-zinc-900 text-[10px] tracking-[0.2em] uppercase hover:bg-zinc-900 hover:text-white'
    >
      Retry Connection
    </Button>
  </div>
)

export default ErrorState
