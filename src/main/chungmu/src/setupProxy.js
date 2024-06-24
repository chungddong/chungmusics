
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware({
            target: 'http://localhost:8080', // 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
            pathFilter: '/api',
        }),
    );

    app.use(
        createProxyMiddleware({
            target: 'http://studyswh.synology.me', // 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
            pathFilter: '/api',
        }),
    );
};