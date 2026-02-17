import { Button } from '@/components/ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { Phone, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ContactWidgetProps {
  onOpenModal: () => void
  propertyId: number
}

const ContactWidget = ({ onOpenModal, propertyId }: ContactWidgetProps) => {
  const { data: authUser } = useGetAuthUserQuery()
  const router = useRouter()

  const isManager = authUser?.userRole === 'manager'

  const handleButtonClick = () => {
    if (authUser && !isManager) {
      onOpenModal()
    } else if (!authUser) {
      router.push('/signin')
    }
  }

  return (
    <div className='rounded-none p-10 h-fit min-w-[320px] shadow-sm'>
      <h4 className='text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-6'>
        Inquiry Portal
      </h4>

      <div className='flex items-center gap-5 mb-8 p-5 bg-zinc-50/30'>
        <div className='flex items-center justify-center w-10 h-10 '>
          <Phone className='text-zinc-900' size={14} strokeWidth={1.5} />
        </div>
        <div>
          <p className='text-[12px] uppercase tracking-widest text-zinc-400 mb-1'>
            Direct Line
          </p>
          <div className='text-lg font-light tracking-tight text-zinc-900'>
            (424) 340-5574
          </div>
        </div>
      </div>

      <Button
        className='w-full rounded-none bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] uppercase tracking-[0.2em] py-6'
        onClick={handleButtonClick}
        disabled={isManager}
      >
        {authUser
          ? isManager
            ? 'Managers Cannot Apply'
            : 'Submit Application'
          : 'Sign In to Apply'}
      </Button>

      <div className='mt-8 pt-8'>
        <div className='flex items-start gap-3 mb-4'>
          <div className='w-1.5 h-1.5 rounded-full bg-[#CAD2D3] mt-1' />{' '}
          <div className='text-[10px] uppercase tracking-widest text-zinc-500 leading-relaxed'>
            <span className='text-zinc-900 font-bold'>Languages:</span> English,
            Bahasa
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <Calendar className='w-3.5 h-3.5 text-zinc-400' strokeWidth={1.5} />
          <div className='text-[10px] uppercase tracking-widest text-zinc-500 leading-relaxed'>
            <span className='text-zinc-900 font-bold'>Schedule:</span> By
            Appointment Only
            <br />
            Monday — Sunday
          </div>
        </div>
      </div>

      <div className='mt-8 text-center'>
        <span className='text-[12px] uppercase tracking-[0.4em] text-zinc-500'>
          Estate ID: {propertyId}
        </span>
      </div>
    </div>
  )
}

export default ContactWidget
