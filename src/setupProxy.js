const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target: 'https://shopwilltest.a2hosted.com/',
      changeOrigin: true,
    })
  );
};

  // "proxy": "http://127.0.0.1:5000",