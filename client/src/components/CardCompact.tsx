'use client'

import { Bath, Bed, Heart, House, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CardCompact = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardCompactProps) => {
  const router = useRouter()
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || '/no-photo-available.png'
  )

  const handleCardClick = () => {
    if (propertyLink) {
      router.push(propertyLink, { scroll: false })
    }
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleCardClick}
      className='mb-4 rounded-none overflow-hidden w-full flex h-40 transition-all duration-700 ease-in-out cursor-pointer group hover:bg-zinc-50/50'
    >
      <div className='relative w-1/3 overflow-hidden'>
        <Image
          src={imgSrc}
          alt={property.name}
          fill
          className='object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105'
          sizes='(max-width: 768px) 33vw, 20vw'
          onError={() => setImgSrc('/no-photo-available.png')}
        />

        <div className='absolute bottom-3 left-3 flex gap-1.5 flex-col'>
          {property.isPetsAllowed && (
            <span className='bg-white/90 backdrop-blur-md text-zinc-900 text-[7px] tracking-[0.3em] uppercase font-bold px-2 py-1 shadow-sm w-fit'>
              Pets
            </span>
          )}
          {property.isParkingIncluded && (
            <span className='bg-white/90 backdrop-blur-md text-zinc-900 text-[7px] tracking-[0.3em] uppercase font-bold px-2 py-1 shadow-sm w-fit'>
              Parking
            </span>
          )}
        </div>
      </div>

      <div className='w-2/3 p-5 flex flex-col justify-between'>
        <div>
          <div className='flex justify-between items-start'>
            <h2 className='text-[12px] tracking-[0.2em] uppercase font-bold mb-1.5 leading-tight text-zinc-900 transition-colors duration-500 group-hover:text-zinc-500'>
              {property.name}
            </h2>

            {showFavoriteButton && (
              <button
                className='bg-transparent p-1 relative z-10'
                onClick={(e) => {
                  handleActionClick(e)
                  onFavoriteToggle?.()
                }}
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-all duration-700 ${
                    isFavorite
                      ? 'text-[#CAD2D3] fill-[#9fd8e0]'
                      : 'text-zinc-300 fill-none hover:text-zinc-600'
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            )}
          </div>

          <p className='text-zinc-400 mb-3 text-[11px] font-light uppercase tracking-[0.15em]'>
            {property?.location?.city} / {property?.location?.state}
          </p>

          <div className='flex text-[11px] items-center text-zinc-400 tracking-widest'>
            <Star className='w-2.5 h-2.5 text-zinc-900 mr-1.5 fill-zinc-900' />
            <span className='font-bold text-zinc-900'>
              {property.averageRating.toFixed(1)}
            </span>
            <span className='ml-1 opacity-60'>
              ({property.numberOfReviews})
            </span>
          </div>
        </div>

        <div className='flex justify-between items-end border-t border-zinc-50 pt-3'>
          <div className='flex gap-4 text-zinc-400 uppercase font-medium tracking-[0.2em] text-[8px]'>
            <span className='flex items-center'>
              <Bed className='w-3 h-3 mr-1.5 stroke-[1.2px] text-zinc-900' />
              {property.beds}
            </span>
            <span className='flex items-center'>
              <Bath className='w-3 h-3 mr-1.5 stroke-[1.2px] text-zinc-900' />
              {property.baths}
            </span>
            <span className='flex items-center'>
              <House className='w-3 h-3 mr-1.5 stroke-[1.2px] text-zinc-900' />
              {property.squareFeet.toLocaleString()}
            </span>
          </div>

          <div className='text-right'>
            <p className='text-[12px] font-light text-zinc-900 tracking-tight'>
              ${property.pricePerMonth.toLocaleString()}
              <span className='text-zinc-400 text-[7px] font-bold uppercase tracking-[0.3em] ml-1.5'>
                / mo
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCompact
