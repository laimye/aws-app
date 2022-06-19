import 'dotenv/config'
import express from 'express'
import api from './api.js'
import staticMiddleware from './static-middleware.js'

express()
  .use('/api', api)
  .use(staticMiddleware)
  .listen(process.env.PORT, () => {
    process.stdout.write(`\napp listening on port ${process.env.PORT}\n\n`)
  })
