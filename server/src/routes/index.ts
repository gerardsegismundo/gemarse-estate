import { Router } from 'express'
import tenantRoutes from './tenant.routes'
import managerRoutes from './manager.routes'
import propertyRoutes from './property.routes'
import applicationRoutes from './application.routes'
import { auth } from '../middleware'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

router.use('/properties', propertyRoutes)
router.use('/applications', applicationRoutes)
router.use('/tenants', auth(['tenant']), tenantRoutes)
router.use('/managers', auth(['manager']), managerRoutes)

export default router
