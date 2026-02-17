import {
  useAddFavoritePropertyMutation,
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
  useRemoveFavoritePropertyMutation,
} from '@/state/api'
import { useAppSelector } from '@/state/redux'
import { Property } from '@/types/prismaTypes'
import Card from '@/components/Card'
import React from 'react'
import CardCompact from '@/components/CardCompact'
import ListingSkeleton from './ListingSkeleton'
import ErrorState from './ErrorState'

const Listings = () => {
  const { data: authUser } = useGetAuthUserQuery()
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || '',
    { skip: !authUser?.cognitoInfo?.userId }
  )
  const [addFavorite] = useAddFavoritePropertyMutation()
  const [removeFavorite] = useRemoveFavoritePropertyMutation()
  const viewMode = useAppSelector((state) => state.global.viewMode)
  const filters = useAppSelector((state) => state.global.filters)

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters)

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!authUser) return
    const isFavorite = tenant?.favorites?.some(
      (fav: Property) => fav.id === propertyId
    )

    const payload = { cognitoId: authUser.cognitoInfo.userId, propertyId }
    isFavorite ? await removeFavorite(payload) : await addFavorite(payload)
  }

  if (isLoading)
    return (
      <div className='p-4 w-full'>
        <div className='h-4 w-32 bg-zinc-100 mb-6 animate-pulse' />
        {[1, 2, 3].map((i) => (
          <ListingSkeleton key={i} />
        ))}
      </div>
    )

  if (isError)
    return (
      <div className='p-4'>
        <ErrorState />
      </div>
    )

  if (!properties || properties.length === 0)
    return (
      <div className='p-4 text-center py-20'>
        <p className='text-[12px] uppercase tracking-[0.2em] text-zinc-400'>
          No estates found in {filters.location} matching your criteria.
        </p>
      </div>
    )

  return (
    <div className='w-full'>
      <h3 className='text-[12px] uppercase tracking-[0.15em] px-4 font-bold text-zinc-900 mb-4'>
        {properties.length}{' '}
        <span className='text-zinc-400 font-medium ml-1'>
          Estates in {filters.location}
        </span>
      </h3>

      <div className='flex'>
        <div className='px-4 w-full'>
          {properties.map((property) => {
            const isFavorite =
              tenant?.favorites?.some(
                (fav: Property) => fav.id === property.id
              ) || false
            const commonProps = {
              property,
              isFavorite,
              onFavoriteToggle: () => handleFavoriteToggle(property.id),
              showFavoriteButton: !!authUser,
              propertyLink: `/search/${property.id}`,
            }

            return viewMode === 'grid' ? (
              <Card key={property.id} {...commonProps} />
            ) : (
              <CardCompact key={property.id} {...commonProps} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Listings
