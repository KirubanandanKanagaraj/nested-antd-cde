// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  const apiProxyConfig = {
    pathRewrite: (path) => path.replace('/api', ''),
    target: 'https://619cf1e868ebaa001753ce05.mockapi.io/',
    secure: true,
    changeOrigin: true,
  }

  app.use(createProxyMiddleware('/api', apiProxyConfig))
}
