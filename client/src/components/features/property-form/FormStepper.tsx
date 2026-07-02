import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STEP_TITLES = [
  'Basic Information',
  'Property Details',
  'Pricing',
  'Features',
  'Location & Photos',
] as const

export const FormStepper = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onClear,
  onCancel,
  isLoading,
  isSubmitting,
}: {
  currentStep: number
  totalSteps: number
  onNext: () => Promise<boolean>
  onBack: () => void
  onClear: () => void
  onCancel: () => void
  isLoading: boolean
  isSubmitting?: boolean
}) => {
  const isLastStep = currentStep === totalSteps
  const isFirstStep = currentStep === 1
  const saving = isLoading || isSubmitting

  const handleNextClick = async () => {
    await onNext()
  }

  return (
    <div className='flex justify-between gap-2'>
      <div className='flex gap-2'>
        {!isFirstStep && (
          <Button
            type='button'
            variant='outline'
            onClick={onBack}
            disabled={saving}
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
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={onClear}
          disabled={saving}
        >
          Clear
        </Button>

        {isLastStep ? (
          <Button
            type='submit'
            disabled={saving}
            className='bg-primary-700 text-white'
          >
            {saving ? 'Creating...' : 'Create Property'}
          </Button>
        ) : (
          <Button
            type='button'
            onClick={handleNextClick}
            disabled={saving}
            className='bg-primary-700 text-white'
          >
            Next
            <ChevronRight className='h-4 w-4 ml-1' />
          </Button>
        )}
      </div>
    </div>
  )
}

export { STEP_TITLES }
