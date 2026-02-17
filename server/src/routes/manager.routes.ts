import express from 'express'
import {
  getManager,
  createManager,
  updateManager,
  getManagerProperties,
} from '../controllers/manager.controller'
import { auth } from '../middleware/auth.middleware'

const router = express.Router()

router.use(auth(['manager']))

router.get('/:cognitoId', getManager)
router.put('/:cognitoId', updateManager)
router.get('/:cognitoId/properties', getManagerProperties)
router.post('/', createManager)

export default router
