let staticMiddleware

if (process.env.NODE_ENV === 'development') {
  const { default: vite } = await import('vite')
  const { default: config } = await import('../vite.config.js')
  ;({ middlewares: staticMiddleware } = await vite.createServer({
    ...config,
    server: {
      middlewareMode: 'html'
    }
  }))
} else {
  const { default: express } = await import('express')
  const { pathname: publicPath } = new URL('./public', import.meta.url)
  staticMiddleware = express.static(publicPath)
}

export default staticMiddleware
