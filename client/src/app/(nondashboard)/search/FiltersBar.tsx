import {
  FiltersState,
  setFilters,
  setViewMode,
  toggleFiltersFullOpen,
} from '@/state'
import { useAppSelector } from '@/state/redux'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from 'lodash'
import { cleanParams, cn, formatPriceValue } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Filter, Grid, List, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PropertyTypeIcons } from '@/lib/constants'

const FiltersBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const filters = useAppSelector((state) => state.global.filters)
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  )
  const viewMode = useAppSelector((state) => state.global.viewMode)
  const [searchInput, setSearchInput] = useState(filters.location)

  const updateURL = debounce((filters: FiltersState) => {
    const params = new URLSearchParams(
      Object.entries(
        cleanParams(filters as unknown as Record<string, unknown>) as Record<
          string,
          any
        >
      ).map(([k, v]) => [k, Array.isArray(v) ? v.join(',') : String(v)])
    )
    router.push(`${pathname}?${params.toString()}`)
  })

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value

    if (key === 'priceRange' || key === 'squareFeet') {
      const currentArrayRange = [...filters[key]]
      if (isMin !== null) {
        const index = isMin ? 0 : 1
        currentArrayRange[index] = value === 'any' ? null : Number(value)
      }
      newValue = currentArrayRange
    } else if (key === 'coordinates') {
      newValue = value === 'any' ? [0, 0] : value.map(Number)
    } else {
      newValue = value === 'any' ? 'any' : value
    }

    const newFilters = { ...filters, [key]: newValue }
    dispatch(setFilters(newFilters))
    updateURL(newFilters)
  }

  const handleLocationSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchInput
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
        }&fuzzyMatch=true`
      )
      const data = await response.json()
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center
        dispatch(
          setFilters({
            location: searchInput,
            coordinates: [lng, lat],
          })
        )
      }
    } catch (err) {
      console.error(
        'Error search location:',
        err instanceof Error ? err.message : String(err)
      )
    }
  }

  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          className={cn(
            'gap-2 rounded-none border-zinc-200 text-[10px] uppercase tracking-[0.15em] font-medium h-9 px-4 transition-all',
            isFiltersFullOpen
              ? 'bg-zinc-900 text-white border-zinc-900'
              : 'hover:bg-zinc-50 text-zinc-600'
          )}
          onClick={() => dispatch(toggleFiltersFullOpen())}
        >
          <Filter className='w-3.5 h-3.5 stroke-[1.5px]' />
          <span>All Filters</span>
        </Button>

        <div className='flex items-center ml-2'>
          <div className='relative group'>
            <Input
              placeholder='SEARCH LOCATION'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className='w-48 h-9 rounded-none border-zinc-200 border-r-0 text-[10px] tracking-widest placeholder:text-zinc-300 focus-visible:ring-0 focus-visible:border-zinc-400 transition-colors'
            />
          </div>
          <Button
            onClick={handleLocationSearch}
            className='h-9 rounded-none border-l-0 border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all shadow-none border'
          >
            <Search className='w-3.5 h-3.5 stroke-[1.5px]' />
          </Button>
        </div>

        <div className='flex gap-1 ml-2'>
          <Select
            value={filters.priceRange[0]?.toString() || 'any'}
            onValueChange={(value) =>
              handleFilterChange('priceRange', value, true)
            }
          >
            <SelectTrigger className='h-9 w-28 rounded-none border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-600 focus:ring-0'>
              <SelectValue>
                {formatPriceValue(filters.priceRange[0], true)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-white rounded-none border-zinc-100'>
              <SelectItem
                value='any'
                className='text-xs uppercase tracking-tighter font-light'
              >
                Any Min
              </SelectItem>
              {[500, 1000, 1500, 2000, 3000, 5000, 10000].map((price) => (
                <SelectItem
                  key={price}
                  value={price.toString()}
                  className='text-xs font-light'
                >
                  ${price.toLocaleString()}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.priceRange[1]?.toString() || 'any'}
            onValueChange={(value) =>
              handleFilterChange('priceRange', value, false)
            }
          >
            <SelectTrigger className='h-9 w-28 rounded-none border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-600 focus:ring-0'>
              <SelectValue>
                {formatPriceValue(filters.priceRange[1], false)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='bg-white rounded-none border-zinc-100'>
              <SelectItem
                value='any'
                className='text-xs uppercase tracking-tighter font-light'
              >
                Any Max
              </SelectItem>
              {[1000, 2000, 3000, 5000, 10000, 20000].map((price) => (
                <SelectItem
                  key={price}
                  value={price.toString()}
                  className='text-xs font-light'
                >
                  UP TO ${price.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select
          value={filters.propertyType || 'any'}
          onValueChange={(value) =>
            handleFilterChange('propertyType', value, null)
          }
        >
          <SelectTrigger className='h-9 w-36 rounded-none border-zinc-200 text-[10px] uppercase tracking-wider text-zinc-600 focus:ring-0 ml-1'>
            <SelectValue placeholder='Home Type' />
          </SelectTrigger>
          <SelectContent className='bg-white rounded-none border-zinc-100'>
            <SelectItem
              value='any'
              className='text-xs uppercase tracking-widest font-light'
            >
              All Estates
            </SelectItem>
            {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
              <SelectItem
                key={type}
                value={type}
                className='text-xs uppercase tracking-widest font-light'
              >
                <div className='flex items-center'>
                  <Icon className='w-3.5 h-3.5 mr-2 stroke-[1.2px]' />
                  <span>{type}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex border border-zinc-200 p-0.5 rounded-none bg-zinc-50/50'>
        <Button
          variant='ghost'
          className={cn(
            'h-7 w-9 p-0 rounded-none transition-all',
            viewMode === 'list'
              ? 'bg-white text-[#CAD2D3] shadow-sm'
              : 'text-zinc-400 hover:text-zinc-600'
          )}
          onClick={() => dispatch(setViewMode('list'))}
        >
          <List className='w-4 h-4' />
        </Button>
        <Button
          variant='ghost'
          className={cn(
            'h-7 w-9 p-0 rounded-none transition-all',
            viewMode === 'grid'
              ? 'bg-white text-[#CAD2D3] shadow-sm'
              : 'text-zinc-400 hover:text-zinc-600'
          )}
          onClick={() => dispatch(setViewMode('grid'))}
        >
          <Grid className='w-4 h-4' />
        </Button>
      </div>
    </div>
  )
}

export default FiltersBar
