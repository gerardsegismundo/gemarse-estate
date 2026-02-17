import express from 'express'
import {
  getProperties,
  getProperty,
  createProperty,
} from '../controllers/property.controller'

import { auth } from '../middleware/auth.middleware'
import { upload } from '../middleware/upload.middleware'

const router = express.Router()

router.get('/', getProperties)
router.get('/:id', getProperty)
router.post('/', auth(['manager']), upload.array('photos'), createProperty)

export default router
