'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyFormData, propertySchema } from '@/lib/schemas'
import { PropertyTypeEnum } from '@/lib/constants'
import { useCreatePropertyMutation, useGetAuthUserQuery } from '@/state/api'
import { toast } from 'sonner'
import type { UseFormReturn } from 'react-hook-form'

const TOTAL_STEPS = 5
const DRAFT_STORAGE_KEY = 'property-form-draft'

const STEP_FIELDS: Record<number, (keyof PropertyFormData)[]> = {
  1: ['name', 'description', 'propertyType'],
  2: ['beds', 'baths', 'squareFeet', 'isPetsAllowed', 'isParkingIncluded'],
  3: ['pricePerMonth', 'securityDeposit', 'applicationFee'],
  4: [],
  5: [],
}

const DEFAULT_VALUES: PropertyFormData = {
  name: '',
  description: '',
  pricePerMonth: 1000,
  securityDeposit: 500,
  applicationFee: 100,
  isPetsAllowed: true,
  isParkingIncluded: true,
  propertyType: PropertyTypeEnum.Apartment,
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
}

const loadDraft = (): PropertyFormData | null => {
  if (typeof window === 'undefined') return null
  const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY)
  if (!savedDraft) return null
  try {
    return JSON.parse(savedDraft) as PropertyFormData
  } catch {
    return null
  }
}

const saveDraft = (values: PropertyFormData) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(values))
}

export const usePropertyForm = (onSuccess: () => void) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [createProperty, { isLoading }] = useCreatePropertyMutation()
  const { data: authUser } = useGetAuthUserQuery()

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    defaultValues: loadDraft() || DEFAULT_VALUES,
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value && typeof value === 'object') {
        saveDraft(value as PropertyFormData)
      }
    })
    return () => subscription.unsubscribe()
  }, [form])

  const handleNext = async (): Promise<boolean> => {
    const fieldsToValidate = STEP_FIELDS[currentStep]
    const isValid = await form.trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS))
      return true
    }

    toast.error('Please fill in all required fields correctly')
    return false
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
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      form.reset(DEFAULT_VALUES)
      setCurrentStep(1)
      onSuccess()
    } catch (error) {
      toast.error('Failed to create property. Please try again.')
      console.error('Error creating property:', error)
    }
  }

  const handleClear = () => {
    const confirmed = window.confirm(
      'Are you sure you want to clear all form data?'
    )
    if (confirmed) {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
      form.reset(DEFAULT_VALUES)
      setCurrentStep(1)
      toast.info('Form cleared')
    }
  }

  const handleClose = () => {
    setCurrentStep(1)
  }

  return {
    currentStep,
    setCurrentStep,
    totalSteps: TOTAL_STEPS,
    isLoading,
    form,
    handleNext,
    handleBack,
    onSubmit,
    handleClear,
    handleClose,
  }
}

export type PropertyFormReturn = ReturnType<typeof usePropertyForm>
