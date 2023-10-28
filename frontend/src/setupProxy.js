const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/generate-text', // Match the endpoint you want to proxy
        createProxyMiddleware({
            target: 'https://brave-puce-ant.cyclic.app', // The target server
            changeOrigin: true,
        })
    );

};
