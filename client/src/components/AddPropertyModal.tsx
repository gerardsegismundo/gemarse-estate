'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyFormData, propertySchema } from '@/lib/schemas'
import { useCreatePropertyMutation, useGetAuthUserQuery } from '@/state/api'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Step1BasicInfo } from './property-form-steps/Step1BasicInfo'
import { Step2PropertyDetails } from './property-form-steps/Step2PropertyDetails'
import { Step3Pricing } from './property-form-steps/Step3Pricing'
import { Step4Features } from './property-form-steps/Step4Features'
import { Step5LocationPhotos } from './property-form-steps/Step5LocationPhotos'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

interface AddPropertyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TOTAL_STEPS = 5
const DRAFT_STORAGE_KEY = 'property-form-draft'

const STEP_TITLES = [
  'Basic Information',
  'Property Details',
  'Pricing',
  'Features',
  'Location & Photos',
]

// Define which fields to validate for each step (validate BEFORE moving to next step)
const STEP_FIELDS: Record<number, (keyof PropertyFormData)[]> = {
  1: ['name', 'description', 'propertyType'],
  2: ['beds', 'baths', 'squareFeet', 'isPetsAllowed', 'isParkingIncluded'],
  3: ['pricePerMonth', 'securityDeposit', 'applicationFee'],
  4: [],
  5: [], // Don't validate step 5 fields until final submit
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [createProperty, { isLoading }] = useCreatePropertyMutation()
  const { data: authUser } = useGetAuthUserQuery()

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    defaultValues: {
      name: '',
      description: '',
      pricePerMonth: 1000,
      securityDeposit: 500,
      applicationFee: 100,
      isPetsAllowed: true,
      isParkingIncluded: true,
      photoUrls: [],
      amenities: undefined,
      highlights: undefined,
      beds: 1,
      baths: 1,
      squareFeet: 1000,
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    },
  })

  // Load draft from localStorage when modal opens
  useEffect(() => {
    if (open) {
      const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (savedDraft) {
        try {
          const draftData = JSON.parse(savedDraft)
          form.reset(draftData)
        } catch (e) {
          console.error('Error loading draft:', e)
        }
      }
    }
  }, [open, form])

  // Save to localStorage when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form])

  const handleNext = async () => {
    // Validate current step fields
    const fieldsToValidate = STEP_FIELDS[currentStep]
    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
    } else {
      toast.error('Please fill in all required fields correctly')
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: PropertyFormData) => {
    if (!authUser?.cognitoInfo?.userId) {
      toast.error('No manager ID found')
      return
    }

    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'photoUrls') {
          const files = value as File[]
          files.forEach((file: File) => {
            formData.append('photos', file)
          })
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      })

      formData.append('managerCognitoId', authUser.cognitoInfo.userId)

      await createProperty(formData).unwrap()
      toast.success('Property created successfully!')
      // Clear localStorage after successful submit
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      onOpenChange(false)
      form.reset()
      setCurrentStep(1)
    } catch (error) {
      toast.error('Failed to create property. Please try again.')
      console.error('Error creating property:', error)
    }
  }

  // Clear form and localStorage
  const handleClear = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all form data?'
    )
    if (confirmed) {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      form.reset({
        name: '',
        description: '',
        pricePerMonth: 1000,
        securityDeposit: 500,
        applicationFee: 100,
        isPetsAllowed: true,
        isParkingIncluded: true,
        photoUrls: [],
        amenities: undefined,
        highlights: undefined,
        beds: 1,
        baths: 1,
        squareFeet: 1000,
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      })
      setCurrentStep(1)
      toast.info('Form cleared')
    }
  }

  // Close modal but keep data in localStorage as draft
  const handleClose = () => {
    onOpenChange(false)
    // Don't reset form - data stays in localStorage as draft
    setCurrentStep(1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo form={form} />
      case 2:
        return <Step2PropertyDetails form={form} />
      case 3:
        return <Step3Pricing form={form} />
      case 4:
        return <Step4Features form={form} />
      case 5:
        return <Step5LocationPhotos form={form} />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Add New Property</DialogTitle>
          <div className='flex items-center justify-between mt-4'>
            <p className='text-sm text-gray-500'>
              Step {currentStep} of {TOTAL_STEPS}:{' '}
              {STEP_TITLES[currentStep - 1]}
            </p>
            <div className='flex gap-1'>
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index < currentStep ? 'bg-primary-700' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='min-h-[400px]'>{renderStep()}</div>

            <DialogFooter className='flex justify-between gap-2'>
              <div className='flex gap-2'>
                {currentStep > 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    onClick={handleBack}
                    disabled={isLoading}
                  >
                    <ChevronLeft className='h-4 w-4 mr-1' />
                    Back
                  </Button>
                )}
              </div>

              <div className='flex gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>

                <Button
                  type='button'
                  variant='outline'
                  onClick={handleClear}
                  disabled={isLoading}
                >
                  <RotateCcw className='h-4 w-4 mr-1' />
                  Clear
                </Button>

                {currentStep < TOTAL_STEPS ? (
                  <Button
                    type='button'
                    onClick={handleNext}
                    disabled={isLoading}
                    className='bg-primary-700 text-white'
                  >
                    Next
                    <ChevronRight className='h-4 w-4 ml-1' />
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    disabled={isLoading}
                    className='bg-primary-700 text-white'
                  >
                    {isLoading ? 'Creating...' : 'Create Property'}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
