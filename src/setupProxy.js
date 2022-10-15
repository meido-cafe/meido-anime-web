const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://101.43.94.41:18081",
      changeOrigin: true,
    })
  );
};
