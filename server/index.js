import 'dotenv/config'
import crypto from 'crypto'
import express from 'express'
import db from './db.js'
import errorMiddleware from './error-middleware.js'
import staticMiddleware from './static-middleware.js'
import uploadsMiddleware from './uploads-middleware.js'

const app = express()

app.post('/api/uploads', uploadsMiddleware, async (req, res, next) => {
  try {
    const Item = {
      imageId: crypto.randomUUID(),
      caption: req.body.caption,
      location: req.file.location,
      uploadedAt: Date.now()
    }
    await db.put({
      TableName: 'aws-app-uploads',
      Item
    })
    res.status(201).json(Item)
  } catch (err) {
    next(err)
  }
})

app.get('/api/uploads', async (req, res, next) => {
  try {
    const { Items } = await db.scan({
      TableName: 'aws-app-uploads'
    })
    res.json(Items)
  } catch (err) {
    next(err)
  }
})

app.use(errorMiddleware)

app.use(staticMiddleware)

app.listen(process.env.PORT, () => {
  process.stdout.write(`\napp listening on port ${process.env.PORT}\n\n`)
})
