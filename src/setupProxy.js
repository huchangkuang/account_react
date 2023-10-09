const { createProxyMiddleware } = require('http-proxy-middleware');

const targetUrl = 'http://116.62.137.90:39005' // 线上
// const targetUrl = 'http://localhost:3456' // 测试

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  );
};