import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CustomFormField } from '@/components/FormField'
import { PropertyFormData } from '@/lib/schemas'
import { AmenityEnum, HighlightEnum } from '@/lib/constants'

interface Step4FeaturesProps {
  form: UseFormReturn<PropertyFormData>
}

export const Step4Features: React.FC<Step4FeaturesProps> = ({ form }) => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Features</h3>
        <p className='text-sm text-gray-500 mb-6'>
          Highlight what makes your property special
        </p>
      </div>

      <CustomFormField
        name='amenities'
        label='Amenities'
        type='checkbox-group'
        options={Object.keys(AmenityEnum).map((amenity) => ({
          value: amenity,
          label: amenity,
        }))}
      />

      <CustomFormField
        name='highlights'
        label='Highlights'
        type='checkbox-group'
        options={Object.keys(HighlightEnum).map((highlight) => ({
          value: highlight,
          label: highlight,
        }))}
      />
    </div>
  )
}
