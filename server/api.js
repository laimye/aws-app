import crypto from 'crypto'
import { Router } from 'express'
import db from './db.js'
import uploadsMiddleware from './uploads-middleware.js'

const api = Router()

api.post('/uploads', uploadsMiddleware, async (req, res, next) => {
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

api.get('/uploads', async (req, res, next) => {
  try {
    const { Items } = await db.scan({
      TableName: 'aws-app-uploads'
    })
    res.json(Items)
  } catch (err) {
    next(err)
  }
})

api.use((req, res) => {
  res.status(404).json({ error: `cannot ${req.method} ${req.url}` })
})

api.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'an unexpected error occurred' })
})

export default api
