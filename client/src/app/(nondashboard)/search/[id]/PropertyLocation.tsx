import { useGetPropertyQuery } from '@/state/api'
import { Compass, MapPin } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useRef } from 'react'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

const PropertyLocation = ({ propertyId }: { propertyId: number }) => {
  const { data: property, isError, isLoading } = useGetPropertyQuery(propertyId)
  const mapContainerRef = useRef(null)

  useEffect(() => {
    if (isLoading || isError || !property) return

    const coordinates = property.location?.coordinates
    if (!coordinates || !coordinates.longitude || !coordinates.latitude) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      // Using your custom Mapbox style for that premium teal/zinc look
      style: 'mapbox://styles/gerardmartinsegismundo/cmlljip6q002r01sg3g90drfs',
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 15, // Slightly tighter zoom for luxury detail
      attributionControl: false,
    })

    const marker = new mapboxgl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map)

    // Turning the default marker into your signature black pin
    const markerElement = marker.getElement()
    const path = markerElement.querySelector("path[fill='#3FB1CE']")
    if (path) path.setAttribute('fill', '#000000')

    return () => map.remove()
  }, [property, isError, isLoading])

  if (isLoading)
    return (
      <div className='h-[400px] w-full bg-zinc-50 animate-pulse border border-zinc-100' />
    )
  if (isError || !property)
    return (
      <div className='py-16 text-[10px] uppercase tracking-widest text-zinc-400'>
        Location Data Unavailable
      </div>
    )

  return (
    <div className='py-16 border-t border-zinc-100 mt-16'>
      <div className='flex justify-between items-end mb-6'>
        <div>
          {/* Change 1: Architectural Header */}
          <h3 className='text-[12px] uppercase tracking-[0.3em] font-bold text-zinc-900'>
            Estate Geography
          </h3>
          <div className='flex items-center mt-3 group'>
            <MapPin className='w-3 h-3 mr-2 text-zinc-400 group-hover:text-[#CAD2D3] transition-colors' />
            <span className='text-[13px] uppercase tracking-widest font-light text-zinc-500'>
              {property.location?.address}
            </span>
          </div>
        </div>

        {/* Change 2: Clean, minimalist button for directions */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location?.address || '')}`}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-900 hover:text-zinc-500 transition-colors border-b border-zinc-900 pb-1'
        >
          <Compass className='w-3.5 h-3.5' />
          Open Navigation
        </a>
      </div>

      {/* Change 3: The Map "Frame" */}
      <div className='relative group'>
        <div
          className='h-[350px] rounded-none overflow-hidden grayscale-[0.2] contrast-[1.1] border border-zinc-200 shadow-sm'
          ref={mapContainerRef}
        />
        {/* Subtle architectural overlay line */}
        <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 border border-zinc-100 text-[10px] uppercase tracking-widest text-zinc-900 font-bold pointer-events-none'>
          {property.location?.city} // {property.location?.state || 'District'}
        </div>
      </div>
    </div>
  )
}

export default PropertyLocation
