export default function errorMiddleware(err, req, res, next) {
  console.error(err)
  if (req.url?.startsWith('/api')) {
    res.sendStatus(500)
  } else {
    res.status(500).json({ error: 'an unexpected error occurred' })
  }
}
