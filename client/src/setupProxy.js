// Careful here, the React documentation shows const { createProxyMiddleware } but that will result in function not found
const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		['/api/*', '/api/current_user', '/api/logout', '/api/stripe', '/auth/google'],
		createProxyMiddleware({
			target: 'http://localhost:5000',
		})
	);
};

// Changes to the proxy require a server restart
