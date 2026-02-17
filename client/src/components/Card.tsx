import { Bath, Bed, Heart, House, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Card = ({
  property,
  isFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
  propertyLink,
}: CardProps) => {
  const [imgSrc, setImgSrc] = useState(
    property.photoUrls?.[0] || '/no-photo-available.png'
  )

  return (
    <div className='bg-white rounded-none overflow-hidden border border-zinc-100 shadow-sm w-full mb-5 hover:shadow-md transition-shadow duration-300'>
      <div className='relative'>
        <div className='w-full h-48 relative overflow-hidden bg-zinc-100'>
          <Image
            src={imgSrc}
            alt={property.name}
            fill
            className='object-cover transition-transform duration-500 hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            onError={() => setImgSrc('/no-photo-available.png')}
          />
        </div>

        <div className='absolute bottom-3 left-3 flex gap-2'>
          {property.isPetsAllowed && (
            <span className='bg-white/90 backdrop-blur-sm text-black text-[9px] tracking-widest uppercase font-medium px-2 py-1 shadow-sm'>
              Pets Allowed
            </span>
          )}
          {property.isParkingIncluded && (
            <span className='bg-white/90 backdrop-blur-sm text-black text-[9px] tracking-widest uppercase font-medium px-2 py-1 shadow-sm'>
              Parking
            </span>
          )}
        </div>

        {showFavoriteButton && (
          <button
            className='absolute top-3 right-3 bg-white/80 hover:bg-white rounded-none p-2 cursor-pointer transition-colors shadow-sm'
            onClick={onFavoriteToggle}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-300 ${
                isFavorite
                  ? 'text-[#CAD2D3] fill-[#9fd8e0]'
                  : 'text-zinc-400 fill-none'
              }`}
            />
          </button>
        )}
      </div>

      <div className='p-5'>
        <h2 className='text-sm tracking-widest uppercase font-semibold mb-2 text-zinc-900'>
          {propertyLink ? (
            <Link
              href={propertyLink}
              className='hover:text-zinc-600 transition-colors'
              scroll={false}
            >
              {property.name}
            </Link>
          ) : (
            property.name
          )}
        </h2>

        <p className='text-xs text-zinc-500 mb-4 font-light'>
          {property?.location?.address}, {property?.location?.city}
        </p>

        <div className='flex justify-between items-end mb-4'>
          <div className='flex items-center text-[11px] text-zinc-400'>
            <Star className='w-3 h-3 text-zinc-900 mr-1 fill-zinc-900' />
            <span className='font-bold text-zinc-900'>
              {property.averageRating.toFixed(1)}
            </span>
            <span className='ml-1'>({property.numberOfReviews})</span>
          </div>

          <div className='text-right'>
            <span className='text-lg font-light text-zinc-900'>
              ${property.pricePerMonth.toLocaleString()}
            </span>
            <span className='text-[10px] text-zinc-400 uppercase tracking-tighter ml-1'>
              /mo
            </span>
          </div>
        </div>

        <div className='pt-4 border-t border-zinc-50 flex justify-between items-center text-[10px] tracking-widest uppercase text-zinc-500 font-medium'>
          <span className='flex items-center gap-1.5'>
            <Bed className='w-3.5 h-3.5 stroke-[1.2px]' />
            {property.beds} Bed
          </span>
          <span className='flex items-center gap-1.5'>
            <Bath className='w-3.5 h-3.5 stroke-[1.2px]' />
            {property.baths} Bath
          </span>
          <span className='flex items-center gap-1.5'>
            <House className='w-3.5 h-3.5 stroke-[1.2px]' />
            {property.squareFeet} SQ FT
          </span>
        </div>
      </div>
    </div>
  )
}

export default Card
