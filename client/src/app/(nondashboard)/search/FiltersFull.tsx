import { FiltersState, initialState, setFilters } from '@/state'
import { useAppSelector } from '@/state/redux'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { cleanParams, cn, formatEnumString } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, RotateCcw } from 'lucide-react'
import { AmenityIcons, PropertyTypeIcons } from '@/lib/constants'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FiltersFull = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()

  const [localFilters, setLocalFilters] = useState(initialState.filters)
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  )

  const updateURL = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(
      newFilters as unknown as Record<string, unknown>
    )
    const updatedSearchParams = new URLSearchParams()

    Object.entries(cleanFilters as Record<string, any>).forEach(
      ([key, value]) => {
        updatedSearchParams.set(
          key,
          Array.isArray(value) ? value.join(',') : value.toString()
        )
      }
    )

    router.push(`${pathname}?${updatedSearchParams.toString()}`)
  }, 500)

  const handleSubmit = () => {
    dispatch(setFilters(localFilters))
    updateURL(localFilters)
  }

  const handleReset = () => {
    setLocalFilters(initialState.filters)
    dispatch(setFilters(initialState.filters))
    updateURL(initialState.filters)
  }

  const handleAmenityChange = (amenity: AmenityEnum) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleLocationSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          localFilters.location
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&fuzzyMatch=true`
      )
      const data = await response.json()
      if (data.features?.length > 0) {
        const [lng, lat] = data.features[0].center
        setLocalFilters((prev) => ({ ...prev, coordinates: [lng, lat] }))
      }
    } catch (err) {
      console.error('Error search location:', err)
    }
  }

  if (!isFiltersFullOpen) return null

  const FilterHeader = ({ title }: { title: string }) => (
    <h4 className='text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-900 mb-4'>
      {title}
    </h4>
  )

  return (
    <div className='bg-white rounded-none pr-6 h-full overflow-auto pb-10 custom-scrollbar'>
      <div className='flex flex-col space-y-10'>
        <div>
          <FilterHeader title='Location' />
          <div className='flex items-center'>
            <Input
              placeholder='Enter City or Zip'
              value={localFilters.location}
              onChange={(e) =>
                setLocalFilters((p) => ({ ...p, location: e.target.value }))
              }
              className='rounded-none border-zinc-200 focus-visible:ring-zinc-900 text-sm h-12'
            />
            <Button
              onClick={handleLocationSearch}
              className='rounded-none bg-zinc-900 hover:bg-zinc-800 text-white h-12 px-6 ml-[-1px]'
            >
              <Search className='w-4 h-4' />
            </Button>
          </div>
        </div>

        <div>
          <FilterHeader title='Property Type' />
          <div className='grid grid-cols-2 gap-3'>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <div
                key={type}
                className={cn(
                  'flex flex-col items-center justify-center p-5 border transition-all duration-300 cursor-pointer',
                  localFilters.propertyType === type
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-100 bg-zinc-50/50 hover:border-zinc-300'
                )}
                onClick={() =>
                  setLocalFilters((p) => ({
                    ...p,
                    propertyType: type as PropertyTypeEnum,
                  }))
                }
              >
                <Icon
                  className={cn(
                    'w-6 h-6 mb-3',
                    localFilters.propertyType === type
                      ? 'text-white'
                      : 'text-zinc-400'
                  )}
                  strokeWidth={1.5}
                />
                <span className='text-[10px] uppercase tracking-widest font-bold'>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className='flex justify-between items-center mb-4'>
            <FilterHeader title='Price Range (Monthly)' />
            <span className='text-[10px] font-bold text-zinc-400 tracking-widest'>
              ${localFilters.priceRange[0]} — ${localFilters.priceRange[1]}
            </span>
          </div>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={[
              localFilters.priceRange[0] ?? 0,
              localFilters.priceRange[1] ?? 10000,
            ]}
            onValueChange={(val) =>
              setLocalFilters((p) => ({
                ...p,
                priceRange: val as [number, number],
              }))
            }
            className='[&_[role=slider]]:bg-zinc-900 [&_[role=slider]]:border-zinc-900 [&_.relative]:bg-zinc-100'
          />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <FilterHeader title='Beds' />
            <Select
              value={localFilters.beds || 'any'}
              onValueChange={(val) =>
                setLocalFilters((p) => ({ ...p, beds: val }))
              }
            >
              <SelectTrigger className='w-full rounded-none border-zinc-200 h-12 uppercase text-[10px] tracking-widest font-bold'>
                <SelectValue placeholder='Any' />
              </SelectTrigger>
              <SelectContent className='rounded-none'>
                <SelectItem value='any'>Any Beds</SelectItem>
                <SelectItem value='1'>1+ Bed</SelectItem>
                <SelectItem value='2'>2+ Beds</SelectItem>
                <SelectItem value='3'>3+ Beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex-1'>
            <FilterHeader title='Baths' />
            <Select
              value={localFilters.baths || 'any'}
              onValueChange={(val) =>
                setLocalFilters((p) => ({ ...p, baths: val }))
              }
            >
              <SelectTrigger className='w-full rounded-none border-zinc-200 h-12 uppercase text-[10px] tracking-widest font-bold'>
                <SelectValue placeholder='Any' />
              </SelectTrigger>
              <SelectContent className='rounded-none'>
                <SelectItem value='any'>Any Baths</SelectItem>
                <SelectItem value='1'>1+ Bath</SelectItem>
                <SelectItem value='2'>2+ Baths</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <FilterHeader title='Amenities' />
          <div className='flex flex-wrap gap-2'>
            {Object.entries(AmenityIcons).map(([amenity, Icon]) => (
              <div
                key={amenity}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 border transition-all cursor-pointer',
                  localFilters.amenities.includes(amenity as AmenityEnum)
                    ? 'border-zinc-900 bg-zinc-900 text-white'
                    : 'border-zinc-100 bg-zinc-50/50 text-zinc-500 hover:border-zinc-300'
                )}
                onClick={() => handleAmenityChange(amenity as AmenityEnum)}
              >
                <Icon className='w-4 h-4' strokeWidth={1.5} />
                <span className='text-[9px] uppercase tracking-widest font-bold'>
                  {formatEnumString(amenity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-3 mt-8'>
          <Button
            onClick={handleSubmit}
            className='w-full bg-zinc-900 text-white rounded-none h-14 uppercase tracking-[0.3em] text-xs hover:bg-zinc-800'
          >
            Apply Filters
          </Button>
          <Button
            onClick={handleReset}
            variant='ghost'
            className='w-full rounded-none h-12 uppercase tracking-[0.2em] text-[10px] text-zinc-400 hover:text-zinc-900'
          >
            <RotateCcw className='w-3 h-3 mr-2' />
            Reset All
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FiltersFull
