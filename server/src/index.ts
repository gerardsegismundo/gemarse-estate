import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { auth } from './middleware/auth.middleware'

/* ROUTE IMPORT */
import tenantRoutes from './routes/tenant.routes'
import managerRoutes from './routes/manager.routes'
import propertyRoutes from './routes/property.routes'
import applicationRoutes from './routes/application.routes'

/* CONFIGURATIONS */
dotenv.config()
const app = express()

/* MIDDLEWARE */
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* ROUTES */
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.use('/properties', propertyRoutes)
app.use('/applications', applicationRoutes)
app.use('/tenants', auth(['tenant']), tenantRoutes)
app.use('/managers', auth(['manager']), managerRoutes)

/* SERVER START */
const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
