import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AmenityIcons, HighlightIcons } from '@/lib/constants'
import { formatEnumString } from '@/lib/utils'
import { useGetPropertyQuery } from '@/state/api'
import { HelpCircle } from 'lucide-react'
import React from 'react'

const PropertyDetails = ({ propertyId }: PropertyDetailsProps) => {
  const { data: property, isError, isLoading } = useGetPropertyQuery(propertyId)

  if (isLoading)
    return (
      <div className='h-[400px] w-full bg-zinc-50 animate-pulse border border-zinc-100' />
    )
  if (isError || !property)
    return (
      <div className='py-16 text-[12px] uppercase tracking-widest text-zinc-400'>
        Data Unavailable
      </div>
    )

  return (
    <div className='mb-24 space-y-24'>
      <section>
        <h2 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-10'>
          Property Amenities
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8'>
          {property.amenities.map((amenity: string) => {
            const amenityKey = amenity as AmenityEnum
            const Icon = AmenityIcons[amenityKey] || HelpCircle

            return (
              <div key={amenity} className='flex flex-col items-start'>
                <Icon className='w-5 h-5 mb-4 text-zinc-900 stroke-[1.5px]' />
                <span className='text-[12px] uppercase tracking-[0.15em] text-zinc-500 font-medium'>
                  {formatEnumString(amenity)}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <section className='pt-16 border-t border-zinc-100'>
        <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-10'>
          Estate Highlights
        </h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {property.highlights.map((highlight: string) => {
            const highlightKey = highlight as HighlightEnum
            const Icon = HighlightIcons[highlightKey] || HelpCircle

            return (
              <div
                key={highlight}
                className='flex items-center gap-4 p-5 border border-zinc-100 bg-zinc-50/30'
              >
                <Icon className='w-5 h-5 text-[#CAD2D3]' />
                <span className='text-[12px] uppercase tracking-widest text-zinc-900 font-bold'>
                  {formatEnumString(highlight)}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      <section className='pt-16 border-t border-zinc-100'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4'>
          <div>
            <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-3'>
              Fees & Policies
            </h3>
            <p className='text-[12px] uppercase tracking-widest text-zinc-400 leading-relaxed max-w-md'>
              Based on community-supplied data. Additional utilities may apply.
            </p>
          </div>
        </div>

        <Tabs defaultValue='required-fees' className='w-full'>
          <TabsList className='flex w-full justify-start gap-8 bg-transparent border-b border-zinc-100 rounded-none h-auto p-0 mb-8'>
            {['required-fees', 'pets', 'parking'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className='rounded-none border-b-2 border-transparent data-[state=active]:border-zinc-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-[12px] uppercase tracking-[0.2em] font-bold py-4 px-0'
              >
                {tab.replace('-', ' ')}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value='required-fees'
            className='animate-in fade-in duration-500'
          >
            <div className='max-w-md space-y-6'>
              <div className='group'>
                <p className='text-[9px] uppercase tracking-[0.3em] text-zinc-400 mb-4'>
                  Move-in Requirements
                </p>
                <div className='flex justify-between py-4 border-b border-zinc-50'>
                  <span className='text-[11px] uppercase tracking-widest text-zinc-600'>
                    Application Fee
                  </span>
                  <span className='text-[11px] font-bold text-zinc-900'>
                    ${property.applicationFee}
                  </span>
                </div>
                <div className='flex justify-between py-4 border-b border-zinc-50'>
                  <span className='text-[11px] uppercase tracking-widest text-zinc-600'>
                    Security Deposit
                  </span>
                  <span className='text-[11px] font-bold text-zinc-900'>
                    ${property.securityDeposit}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='pets' className='animate-in fade-in duration-500'>
            <div className='p-8 bg-zinc-50 border border-zinc-100 text-center'>
              <p className='text-[12px] uppercase tracking-[0.2em] font-bold text-zinc-900'>
                Pets are {property.isPetsAllowed ? 'Authorized' : 'Restricted'}
              </p>
            </div>
          </TabsContent>

          <TabsContent
            value='parking'
            className='animate-in fade-in duration-500'
          >
            <div className='p-8 bg-zinc-50 border border-zinc-100 text-center'>
              <p className='text-[12px] uppercase tracking-[0.2em] font-bold text-zinc-900'>
                Parking is{' '}
                {property.isParkingIncluded
                  ? 'Included in Lease'
                  : 'Additional Service'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

export default PropertyDetails
