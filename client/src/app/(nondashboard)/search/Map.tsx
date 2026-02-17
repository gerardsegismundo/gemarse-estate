'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useAppSelector } from '@/state/redux'
import { useGetPropertiesQuery } from '@/state/api'
import { Property } from '@/types/prismaTypes'
import LoadingSettings from '@/components/LoadingSettings'
import ErrorState from './ErrorState'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string

const Map = () => {
  const mapContainerRef = useRef(null)
  const filters = useAppSelector((state) => state.global.filters)
  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters)

  useEffect(() => {
    if (isLoading || isError || !properties || !mapContainerRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/gerardmartinsegismundo/cmlljip6q002r01sg3g90drfs',
      center: filters.coordinates || [-74.5, 40],
      zoom: 9,
    })

    map.on('load', () => {
      properties.forEach((property) => {
        const marker = createPropertyMarker(property, map)
        if (!marker) return
        const markerElement = marker.getElement()
        const path = markerElement.querySelector("path[fill='#3FB1CE']")
        if (path) path.setAttribute('fill', '#000000')
      })

      setTimeout(() => map.resize(), 700)
    })

    return () => map.remove()
  }, [isLoading, isError, properties, filters.coordinates])

  if (isLoading)
    return (
      <div className='w-full h-full relative border border-zinc-100 overflow-hidden bg-zinc-50/30 p-4'>
        <LoadingSettings />
      </div>
    )
  if (isError || !properties) return <ErrorState />

  return (
    <div className='w-full h-full relative'>
      <div className='map-container w-full h-full' ref={mapContainerRef} />
    </div>
  )
}

const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  if (!property.location?.coordinates) return null

  const coords = property.location.coordinates as any
  const lng = coords.longitude || coords[0] || 0
  const lat = coords.latitude || coords[1] || 0

  const marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property.id}" target="_blank" class="marker-popup-title">${property.name}</a>
            <p class="marker-popup-price">
              $${property.pricePerMonth}
              <span class="marker-popup-price-unit"> / month</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map)
  return marker
}

export default Map
