'use client'

import Card from '@/components/Card'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetTenantQuery,
} from '@/state/api'
import React from 'react'

const Residences = () => {
  const { data: authUser } = useGetAuthUserQuery()
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || '',
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  )

  const {
    data: currentResidences,
    isLoading,
    error,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo?.userId || '', {
    skip: !authUser?.cognitoInfo?.userId,
  })

  if (isLoading) return <Loading />
  if (error)
    return (
      <div className='text-[14px] tracking-[0.2em] text-red-500 uppercase font-light'>
        Error loading current residences
      </div>
    )

  return (
    <>
      <Header
        title='Current Residences'
        subtitle='View and manage your current living spaces'
      />

      {currentResidences && currentResidences.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {currentResidences.map((property) => (
            <Card
              key={property.id}
              property={property}
              isFavorite={tenant?.favorites.includes(property.id) || false}
              onFavoriteToggle={() => {}}
              showFavoriteButton={false}
              propertyLink={`/tenants/residences/${property.id}`}
            />
          ))}
        </div>
      ) : (
        <div className='mt-8 border-t border-zinc-100 pt-10'>
          <p className='text-[14px] uppercase tracking-[0.3em] text-zinc-400 font-light'>
            You don&lsquo;t have any current residences
          </p>
        </div>
      )}
    </>
  )
}

export default Residences
