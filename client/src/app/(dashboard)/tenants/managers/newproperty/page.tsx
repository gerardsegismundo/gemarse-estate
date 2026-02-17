'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { AddPropertyModal } from '@/components/AddPropertyModal'
import { Plus } from 'lucide-react'

const NewProperty = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header title='Properties' subtitle='Manage your property listings' />

      <div className='flex flex-col items-center justify-center py-20'>
        <div className='text-center max-w-md'>
          <div className='mb-6'>
            <div className='w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Plus className='w-10 h-10 text-primary-700' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>
              Add Your First Property
            </h2>
            <p className='text-gray-600'>
              Create a new property listing to start managing your rentals
            </p>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className='bg-primary-700 text-white px-8 py-6 text-lg'
          >
            <Plus className='w-5 h-5 mr-2' />
            Add New Property
          </Button>
        </div>
      </div>

      <AddPropertyModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}

export default NewProperty
