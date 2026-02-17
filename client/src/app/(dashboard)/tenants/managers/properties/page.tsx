'use client'

import Card from '@/components/Card'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import { AddPropertyModal } from '@/components/AddPropertyModal'
import { useGetAuthUserQuery, useGetManagerPropertiesQuery } from '@/state/api'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const Properties = () => {
  const { data: authUser } = useGetAuthUserQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    data: managerProperties,
    isLoading,
    error,
  } = useGetManagerPropertiesQuery(authUser?.cognitoInfo?.userId || '', {
    skip: !authUser?.cognitoInfo?.userId,
  })

  if (isLoading) return <Loading />
  if (error) return <div>Error loading manager properties</div>

  return (
    <>
      <Header
        title='My Properties'
        subtitle='View and manage your property listings'
      />

      <div className='mb-6'>
        <Button
          onClick={() => setIsModalOpen(true)}
          className='bg-primary-700 text-white'
        >
          <Plus className='w-4 h-4 mr-2' />
          Add New Property
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {managerProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={false}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/managers/properties/${property.id}`}
          />
        ))}
      </div>
      {(!managerProperties || managerProperties.length === 0) && (
        <div className='mt-10 py-20 border-t border-zinc-100'>
          <p className='text-[14px] uppercase tracking-[0.4em] text-zinc-400 font-light'>
            You don&lsquo;t manage any properties
          </p>
        </div>
      )}

      <AddPropertyModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}

export default Properties
