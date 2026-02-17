import multer from 'multer'
import { Request } from 'express'

const storage = multer.memoryStorage()

const fileFilter: multer.Options['fileFilter'] = (req: Request, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image files are allowed'))
  } else {
    cb(null, true)
  }
}

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter,
})
