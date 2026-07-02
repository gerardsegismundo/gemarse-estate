import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { CustomFormField } from '@/components/FormField'
import { PropertyFormData } from '@/lib/schemas'

interface Step3PricingProps {
  form: UseFormReturn<PropertyFormData>
}

export const Step3Pricing: React.FC<Step3PricingProps> = ({ form }) => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-semibold mb-2'>Pricing</h3>
        <p className='text-sm text-gray-500 mb-6'>
          Set the financial terms for your property
        </p>
      </div>

      <CustomFormField
        name='pricePerMonth'
        label='Price per Month'
        type='number'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <CustomFormField
          name='securityDeposit'
          label='Security Deposit'
          type='number'
        />
        <CustomFormField
          name='applicationFee'
          label='Application Fee'
          type='number'
        />
      </div>
    </div>
  )
}
