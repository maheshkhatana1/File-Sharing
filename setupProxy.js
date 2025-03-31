const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/firebase',
    createProxyMiddleware({
      target: 'https://fileqr-8b679.firebaseio.com', // Your Firebase Realtime Database URL
      changeOrigin: true,
      secure: false,
    })
  );
};
