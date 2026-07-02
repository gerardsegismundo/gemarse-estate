import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CustomFormField } from '@/components/FormField'
import { PropertyFormData } from '@/lib/schemas'

interface Step5LocationPhotosProps {
  form: UseFormReturn<PropertyFormData>
}

export const Step5LocationPhotos: React.FC<Step5LocationPhotosProps> = ({
  form,
}) => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Location & Photos</h3>
        <p className='text-sm text-gray-500 mb-6'>
          Complete your listing with location details and photos
        </p>
      </div>

      <CustomFormField name='address' label='Address' />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <CustomFormField name='city' label='City' />
        <CustomFormField name='state' label='State' />
        <CustomFormField name='postalCode' label='Postal Code' />
      </div>

      <CustomFormField name='country' label='Country' />

      <div className='pt-4 border-t'>
        <CustomFormField
          name='photoUrls'
          label='Property Photos'
          type='file'
          accept='image/*'
        />
      </div>
    </div>
  )
}
