import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const storage = multerS3({
  s3,
  acl: 'public-read',
  bucket: process.env.AWS_S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, done) => {
    const ext = path.extname(file.originalname)
    done(null, `${crypto.randomUUID()}${ext}`)
  }
})

const uploadsMiddleware = multer({ storage }).single('image')

export default uploadsMiddleware
