import express from 'express'
import { auth } from '../middleware/auth.middleware'
import {
  createApplication,
  listApplications,
  updateApplicationStatus,
} from '../controllers/application.controller'

const router = express.Router()

router.post('/', auth(['tenant']), createApplication)
router.put('/:id/status', auth(['manager']), updateApplicationStatus)
router.get('/', auth(['manager', 'tenant']), listApplications)

export default router
