import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'

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
app.use('/', routes)

/* SERVER START */
const PORT = process.env.PORT ?? 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
