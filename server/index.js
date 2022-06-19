import 'dotenv/config'
import express from 'express'
import staticMiddleware from './static-middleware.js'

const app = express()

app.use(staticMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`\napp listening on port ${process.env.PORT}\n`)
})
