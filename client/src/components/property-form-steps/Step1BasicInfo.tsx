import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CustomFormField } from '@/components/FormField'
import { PropertyFormData } from '@/lib/schemas'
import { PropertyTypeEnum } from '@/lib/constants'

interface Step1BasicInfoProps {
  form: UseFormReturn<PropertyFormData>
}

export const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({ form }) => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Basic Information</h3>
        <p className='text-sm text-gray-500 mb-6'>
          Let's start with the essential details about your property
        </p>
      </div>

      <CustomFormField name='name' label='Property Name' />

      <CustomFormField
        name='description'
        label='Description'
        type='textarea'
        placeholder='Describe your property...'
      />

      <CustomFormField
        name='propertyType'
        label='Property Type'
        type='select'
        options={Object.keys(PropertyTypeEnum).map((type) => ({
          value: type,
          label: type,
        }))}
      />
    </div>
  )
}
