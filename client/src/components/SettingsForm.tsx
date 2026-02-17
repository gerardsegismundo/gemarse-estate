import { SettingsFormData, settingsSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from './ui/form'
import { CustomFormField } from './FormField'
import { Button } from './ui/button'

interface SettingsFormProps {
  initialData: SettingsFormData
  onSubmit: (data: SettingsFormData) => Promise<void>
  userType: string
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false)
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
    if (editMode) form.reset(initialData)
  }

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data)
    setEditMode(false)
  }

  return (
    <div className='max-w-4xl my-10'>
      {' '}
      {/* Aligned with dashboard spacing */}
      <div className='mb-10 px-2'>
        <h1 className='text-[14px] uppercase tracking-[0.4em] font-bold text-zinc-900 mb-3'>
          {userType} Profile
        </h1>
        <div className='h-[1px] w-12 bg-zinc-900 mb-4' />
        <p className='text-[12px] uppercase tracking-[0.3em] text-zinc-500 mt-2'>
          Curate your personal information and preferences
        </p>
      </div>
      {/* Removed rounded-xl for sharp, luxury edges */}
      <div className='border border-zinc-100 p-8 shadow-sm'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-8'
          >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <CustomFormField
                name='name'
                label='Full Name'
                disabled={!editMode}
              />
              <CustomFormField
                name='email'
                label='Email Address'
                type='email'
                disabled={!editMode}
              />
              <CustomFormField
                name='phoneNumber'
                label='Phone Number'
                disabled={!editMode}
              />
            </div>

            <div className='pt-6 flex justify-end gap-4 border-t border-zinc-50'>
              <Button
                type='button'
                onClick={toggleEditMode}
                variant='ghost'
                className='rounded-none text-[12px] uppercase tracking-widest font-bold px-8 hover:bg-zinc-50'
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </Button>

              {editMode && (
                <Button
                  type='submit'
                  className='rounded-none bg-zinc-900 text-white hover:bg-zinc-800 text-[12px] uppercase tracking-widest font-bold px-8 transition-all duration-300'
                >
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SettingsForm
