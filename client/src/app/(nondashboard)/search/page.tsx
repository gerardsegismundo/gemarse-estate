'use client'

import { Suspense } from 'react'
import { useAppDispatch, useAppSelector } from '@/state/redux'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import FiltersBar from './FiltersBar'
import FiltersFull from './FiltersFull'
import { cleanParams } from '@/lib/utils'
import { setFilters } from '@/state'
import Map from './Map'
import Listings from './Listings'

const SearchContent = () => {
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  )
  const locationParam = searchParams.get('location')
  const hasSearchedRef = useRef(false)

  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      (acc: any, [key, value]) => {
        if (key === 'priceRange' || key === 'squareFeet') {
          acc[key] = value.split(',').map((v) => (v === '' ? null : Number(v)))
        } else if (key === 'coordinates') {
          acc[key] = value.split(',').map(Number)
        } else {
          acc[key] = value === 'any' ? null : value
        }
        return acc
      },
      {}
    )

    const cleanedFilters = cleanParams(initialFilters)
    dispatch(setFilters(cleanedFilters))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Handle initial location search from URL params
  useEffect(() => {
    if (!locationParam || hasSearchedRef.current) return

    hasSearchedRef.current = true

    const performLocationSearch = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            locationParam
          )}.json?access_token=${
            process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
          }&fuzzyMatch=true`
        )
        const data = await response.json()
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center
          dispatch(
            setFilters({
              location: locationParam,
              coordinates: [lng, lat],
            })
          )
        } else {
          // If no results, just set the location text
          dispatch(
            setFilters({
              location: locationParam,
            })
          )
        }
      } catch (err) {
        console.error(
          'Error searching location:',
          err instanceof Error ? err.message : String(err)
        )
        // Still set the location text even if geocoding fails
        dispatch(
          setFilters({
            location: locationParam,
          })
        )
      }
    }

    performLocationSearch()
  }, [locationParam, dispatch])

  return (
    // 1. Force the container to be exactly the size of the screen and hide body scroll
    <div className='fixed inset-0 flex flex-col overflow-hidden mt-[7rem]'>
      {/* 2. Fixed Top Bar with a specific height */}
      <header className='flex-none px-6 pb-6'>
        <FiltersBar />
      </header>

      {/* 3. Main Body Container (fills remaining height) */}
      <div className='flex flex-1 h-[calc(100vh-72px)] overflow-hidden relative border-t border-zinc-100 pl-6'>
        {/* 4. Left Sidebar: Scrollable Filters */}
        <aside
          className={`pt-4 h-full overflow-y-auto border-r border-zinc-50 transition-all duration-500 ease-in-out z-20 bg-white custom-scrollbar ${
            isFiltersFullOpen
              ? 'w-[20%] opacity-100'
              : 'w-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className='min-h-full'>
            <FiltersFull />
          </div>
        </aside>

        {/* 5. Center: Fixed Hero Map */}
        <main className='flex-1 h-full relative z-0 bg-zinc-50'>
          <Map />
        </main>

        {/* 6. Right Sidebar: Scrollable Listings */}
        <aside className='pt-4 w-[25%] min-w-[320px] h-full border-l border-zinc-100 bg-white overflow-y-auto z-20 custom-scrollbar'>
          <div className='min-h-full'>
            <Listings />
          </div>
        </aside>
      </div>
    </div>
  )
}

const SearchPage = () => {
  return (
    <Suspense fallback={<div className='mt-[7rem] p-6'>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}

export default SearchPage
