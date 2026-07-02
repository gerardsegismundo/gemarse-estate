'use client'

import React from 'react'
import { PropertyFormModal } from './features/property-form'

export interface AddPropertyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  open,
  onOpenChange,
}) => {
  return <PropertyFormModal open={open} onOpenChange={onOpenChange} />
}
