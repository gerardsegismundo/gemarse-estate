import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: FeatureCardProps) => (
  <div className='text-center group flex flex-col h-full cursor-default'>
    <div className='relative mb-10 aspect-square flex items-center justify-center overflow-hidden bg-zinc-50 transition-all duration-500 group-hover:bg-zinc-100 border border-zinc-100/50'>
      <Image
        src={imageSrc}
        alt={title}
        width={300}
        height={300}
        className='w-3/4 h-3/4 object-contain transition-transform duration-1000 cubic-bezier(0.165, 0.84, 0.44, 1) group-hover:scale-110'
      />
    </div>

    <div className='flex-grow flex flex-col items-center'>
      <h3 className='text-xs uppercase tracking-[0.3em] font-semibold mb-5 text-zinc-900'>
        {title}
      </h3>
      <p className='text-zinc-500 font-light leading-relaxed text-[13px] px-6 mb-8 italic'>
        {description}
      </p>
    </div>

    <div className='mt-auto pt-4 flex justify-center'>
      <Link
        href={linkHref}
        className='relative inline-block text-[11px] uppercase tracking-[0.4em] font-bold text-zinc-900 pb-2 transition-all duration-300'
        scroll={false}
      >
        {linkText}

        <span className='absolute bottom-0 left-0 w-full h-[1px] bg-zinc-100' />

        <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-zinc-900 transition-all duration-500 ease-in-out group-hover:w-full' />
      </Link>
    </div>
  </div>
)

export default FeatureCard
