'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  if (!images || images.length === 0) return null

  return (
    <div className='relative h-[550px] w-full bg-zinc-100 overflow-hidden group'>
      {/* 1. IMAGE STACK */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Property Image ${index + 1}`}
            fill
            priority={index === 0}
            className='object-cover transition-transform duration-1000 group-hover:scale-105'
          />
        </div>
      ))}

      {/* 2. MINIMALIST NAVIGATION */}
      <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <button
          onClick={handlePrev}
          className='w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-zinc-900 transition-all rounded-none'
          aria-label='Previous image'
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={handleNext}
          className='w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-zinc-900 transition-all rounded-none'
          aria-label='Next image'
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* 3. ESTATE IMAGE COUNTER (BLUEPRINT STYLE) */}
      <div className='absolute bottom-8 right-8 bg-zinc-900/80 px-4 py-2 text-white'>
        <span className='text-[10px] uppercase tracking-[0.3em] font-bold'>
          {String(currentImageIndex + 1).padStart(2, '0')}
          <span className='mx-2 text-zinc-500'>/</span>
          {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* 4. SEAMLESS OVERLAY (OPTIONAL FOR DEPTH) */}
      <div className='absolute inset-0 pointer-events-none border-[1px] border-white/10' />
    </div>
  )
}

export default ImagePreviews
