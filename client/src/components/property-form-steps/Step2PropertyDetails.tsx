import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CustomFormField } from '@/components/FormField'
import { PropertyFormData } from '@/lib/schemas'

interface Step2PropertyDetailsProps {
  form: UseFormReturn<PropertyFormData>
}

export const Step2PropertyDetails: React.FC<Step2PropertyDetailsProps> = ({
  form,
}) => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Property Details</h3>
        <p className='text-sm text-gray-500 mb-6'>
          Tell us about the physical characteristics of your property
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <CustomFormField name='beds' label='Number of Beds' type='number' />
        <CustomFormField name='baths' label='Number of Baths' type='number' />
        <CustomFormField name='squareFeet' label='Square Feet' type='number' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <CustomFormField
          name='isPetsAllowed'
          label='Pets Allowed'
          type='switch'
        />
        <CustomFormField
          name='isParkingIncluded'
          label='Parking Included'
          type='switch'
        />
      </div>
    </div>
  )
}
