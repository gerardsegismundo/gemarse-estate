import React from 'react'
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Edit, X, Plus } from 'lucide-react'
import { registerPlugin } from 'filepond'
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface FormFieldProps {
  name: string
  label: string
  type?:
    | 'text'
    | 'email'
    | 'textarea'
    | 'number'
    | 'select'
    | 'switch'
    | 'password'
    | 'file'
    | 'multi-input'
    | 'checkbox-group'
  placeholder?: string
  options?: { value: string; label: string }[]
  accept?: string
  className?: string
  labelClassName?: string
  inputClassName?: string
  value?: string
  disabled?: boolean
  multiple?: boolean
  isIcon?: boolean
  initialValue?: string | number | boolean | string[]
}

export const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  options,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  isIcon = false,
  initialValue,
}) => {
  const { control } = useFormContext()

  const renderFormControl = (
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const baseInputClasses = `rounded-none border-zinc-200 focus:border-zinc-900 focus:ring-0 transition-all duration-300 placeholder:text-zinc-400 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest ${inputClassName}`

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder}
            {...field}
            rows={3}
            className={`p-4 border shadow-none ${baseInputClasses}`}
          />
        )
      case 'select':
        return (
          <Select
            value={field.value || (initialValue as string)}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              className={`w-full p-4 border shadow-none h-12 ${baseInputClasses}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='rounded-none border-zinc-100 shadow-xl bg-white'>
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className='cursor-pointer text-[10px] uppercase tracking-widest focus:bg-zinc-50 focus:text-zinc-900 py-3'
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'switch':
        return (
          <div className='flex items-center space-x-2'>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              className={`text-customgreys-dirtyGrey ${inputClassName}`}
            />
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
          </div>
        )
      case 'checkbox-group':
        // Helper function to convert camelCase to title case with spaces
        const formatLabel = (value: string) => {
          return value
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
        }
        return (
          <div className='space-y-2'>
            <FormLabel className={labelClassName}>{label}</FormLabel>
            <div className='grid grid-cols-2 gap-2'>
              {options?.map((option) => (
                <div key={option.value} className='flex items-center space-x-2'>
                  <Checkbox
                    id={`${name}-${option.value}`}
                    checked={
                      Array.isArray(field.value) &&
                      field.value.includes(option.value)
                    }
                    onCheckedChange={(checked) => {
                      const currentValue = Array.isArray(field.value)
                        ? field.value
                        : []
                      if (checked) {
                        field.onChange([...currentValue, option.value])
                      } else {
                        field.onChange(
                          currentValue.filter((v) => v !== option.value)
                        )
                      }
                    }}
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className='text-sm cursor-pointer'
                  >
                    {formatLabel(option.label)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
      case 'file':
        return (
          <FilePond
            className={`${inputClassName}`}
            onupdatefiles={(fileItems) => {
              const files = fileItems.map((fileItem) => fileItem.file)
              field.onChange(files)
            }}
            allowMultiple={true}
            labelIdle={`Drag & Drop your images or <span class="filepond--label-action">Browse</span>`}
            credits={false}
          />
        )
      case 'number':
        return (
          <Input
            type='number'
            placeholder={placeholder}
            {...field}
            className={`border-gray-200 p-4 ${inputClassName}`}
            disabled={disabled}
          />
        )
      case 'multi-input':
        return (
          <MultiInputField
            name={name}
            control={control}
            placeholder={placeholder}
            inputClassName={inputClassName}
          />
        )
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            // className={`border-gray-200 p-4 ${inputClassName}`}
            className={`h-12 border shadow-none ${baseInputClasses}`}
            disabled={disabled}
          />
        )
    }
  }

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormItem className={`relative space-y-3 ${className}`}>
          {type !== 'switch' && (
            <div className='flex justify-between items-end mb-1'>
              <FormLabel
                className={`text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 ${labelClassName}`}
              >
                {label}
              </FormLabel>
              {!disabled && isIcon && <Edit className='size-3 text-zinc-400' />}
            </div>
          )}
          <FormControl>
            {renderFormControl({
              ...field,
              value: field.value !== undefined ? field.value : initialValue,
            })}
          </FormControl>
          <FormMessage className='text-[10px] uppercase tracking-tighter text-red-500 font-medium' />
        </FormItem>
      )}
    />
  )
}
interface MultiInputFieldProps {
  name: string
  control: any
  placeholder?: string
  inputClassName?: string
}

const MultiInputField: React.FC<MultiInputFieldProps> = ({
  name,
  control,
  placeholder,
  inputClassName,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <div className='space-y-2'>
      {fields.map((field, index) => (
        <div key={field.id} className='flex items-center space-x-2'>
          <FormField
            control={control}
            name={`${name}.${index}`}
            render={({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  className={`flex-1 border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
                />
              </FormControl>
            )}
          />
          <Button
            type='button'
            onClick={() => remove(index)}
            variant='ghost'
            size='icon'
            className='text-customgreys-dirtyGrey'
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
      ))}
      <Button
        type='button'
        onClick={() => append('')}
        variant='outline'
        size='sm'
        className='mt-2 text-customgreys-dirtyGrey'
      >
        <Plus className='w-4 h-4 mr-2' />
        Add Item
      </Button>
    </div>
  )
}
