import { useGetPropertyQuery } from '@/state/api'
import { MapPin, Star, ShieldCheck } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

interface PropertyOverviewProps {
  propertyId: number
}

const PropertyOverview = ({ propertyId }: PropertyOverviewProps) => {
  const { data: property, isError, isLoading } = useGetPropertyQuery(propertyId)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLongText, setIsLongText] = useState(false)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (descriptionRef.current) {
      const isOverflowing = descriptionRef.current.scrollHeight > 160 // height threshold
      setIsLongText(isOverflowing)
    }
  }, [property?.description])

  if (isLoading)
    return <div className='h-[600px] w-full bg-zinc-50 animate-pulse' />
  if (isError || !property)
    return (
      <div className='py-20 text-center uppercase tracking-widest text-zinc-400'>
        Estate details unavailable
      </div>
    )

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='mb-12'>
        <div className='text-[12px] uppercase tracking-[0.4em] text-zinc-400 mb-6 flex items-center gap-2'>
          <span>{property.location?.country}</span>
          <span className='text-zinc-200'>/</span>
          <span>{property.location?.state}</span>
          <span className='text-zinc-200'>/</span>
          <span className='font-bold text-zinc-900'>
            {property.location?.city}
          </span>
        </div>

        <h1 className='text-4xl font-light tracking-tight text-zinc-900 mb-6 uppercase'>
          {property.name}
        </h1>

        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b border-zinc-100 pb-8'>
          <div className='flex items-center text-zinc-500'>
            <MapPin className='w-3.5 h-3.5 mr-2 text-zinc-900' />
            <span className='text-[14px] uppercase tracking-widest font-light'>
              {property.location?.city}, {property.location?.state},{' '}
              {property.location?.country}
            </span>
          </div>

          <div className='flex items-center gap-6'>
            <div className='flex items-center'>
              <Star className='w-3.5 h-3.5 mr-2 text-zinc-900 fill-zinc-900' />
              <span className='text-[14px] font-bold tracking-widest'>
                {property.averageRating.toFixed(1)}
              </span>
              <span className='text-[12px] text-zinc-400 ml-1 tracking-widest'>
                ({property.numberOfReviews} REVIEWS)
              </span>
            </div>
            <div className='flex items-center text-zinc-400'>
              <ShieldCheck className='w-3.5 h-3.5 mr-1.5' />
              <span className='text-[11px] uppercase tracking-[0.2em] font-bold'>
                Verified Estate
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='py-20 mb-20'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0'>
          <div className='flex flex-col items-center md:border-r border-zinc-100'>
            <span className='text-[12px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3'>
              Monthly Rent
            </span>
            <span className='text-2xl font-light text-zinc-900'>
              ${property.pricePerMonth.toLocaleString()}
            </span>
          </div>
          <div className='flex flex-col items-center md:border-r border-zinc-100'>
            <span className='text-[12px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3'>
              Bedrooms
            </span>
            <span className='text-2xl font-light text-zinc-900'>
              {property.beds}{' '}
              <span className='text-[12px] tracking-widest ml-1 text-zinc-500 font-bold uppercase'>
                bd
              </span>
            </span>
          </div>
          <div className='flex flex-col items-center md:border-r border-zinc-100'>
            <span className='text-[12px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3'>
              Bathrooms
            </span>
            <span className='text-2xl font-light text-zinc-900'>
              {property.baths}{' '}
              <span className='text-[12px] tracking-widest ml-1 text-zinc-500 font-bold uppercase'>
                ba
              </span>
            </span>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-[12px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3'>
              Square Feet
            </span>
            <span className='text-2xl font-light text-zinc-900'>
              {property.squareFeet.toLocaleString()}{' '}
              <span className='text-[12px] tracking-widest ml-1 text-zinc-400 uppercase'>
                sq ft
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className='max-w-3xl mb-24'>
        <h2 className='text-[14px] uppercase tracking-[0.4em] font-bold text-zinc-900 mb-8'>
          About the Property
        </h2>

        <div className='relative'>
          <p
            ref={descriptionRef}
            className={`text-zinc-600 text-[14px] leading-8 font-light tracking-wide transition-all duration-500 ease-in-out first-letter:text-4xl first-letter:font-light first-letter:mr-3 first-letter:float-left ${
              isLongText && !isExpanded
                ? 'max-h-[160px] overflow-hidden'
                : 'max-h-[2000px]'
            }`}
          >
            {property.description}
          </p>

          {isLongText && !isExpanded && (
            <div className='absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none' />
          )}
        </div>

        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='mt-6 text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-all'
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  )
}

export default PropertyOverview
