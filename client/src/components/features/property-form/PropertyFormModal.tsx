'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Step1BasicInfo } from './steps/Step1BasicInfo'
import { Step2PropertyDetails } from './steps/Step2PropertyDetails'
import { Step3Pricing } from './steps/Step3Pricing'
import { Step4Features } from './steps/Step4Features'
import { Step5LocationPhotos } from './steps/Step5LocationPhotos'
import { usePropertyForm } from '@/hooks/usePropertyForm'
import { FormStepper } from './FormStepper'
import { STEP_TITLES } from './FormStepper'

const TOTAL_STEPS = 5

interface PropertyFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const renderStep = (step: number, form: ReturnType<typeof usePropertyForm>['form']) => {
  switch (step) {
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

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    currentStep,
    totalSteps,
    isLoading,
    form,
    handleBack,
    handleNext,
    onSubmit,
    handleClear,
    handleClose,
  } = usePropertyForm(() => onOpenChange(false))

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Add New Property</DialogTitle>
          <div className='flex items-center justify-between mt-4'>
            <p className='text-sm text-gray-500'>
              Step {currentStep} of {totalSteps}:{' '}
              {STEP_TITLES[currentStep - 1]}
            </p>
            <div className='flex gap-1'>
              {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-colors ${
                    index < currentStep
                      ? 'bg-primary-700'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='min-h-[400px]'>{renderStep(currentStep, form)}</div>

            <DialogFooter>
              <FormStepper
                currentStep={currentStep}
                totalSteps={totalSteps}
                onNext={handleNext}
                onBack={handleBack}
                onClear={handleClear}
                onCancel={handleClose}
                isLoading={isLoading}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
