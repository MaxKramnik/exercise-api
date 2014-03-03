var api = require('../api');

/* available routes */
var routes = [
	{ path: '/v1/auth', method: 'get', handler: api.account.auth },
	{ path: '/v1/list/:page?', method: 'get', handler: api.users.list },
	{ path: '/v1/health', method: 'get', handler: api.misc.health },
	{ path: '/v1/traverse', method: 'get', handler: api.misc.traverse }
];

function Routes(app) {
	routes.forEach(function(route) {
		app[route.method](route.path, function(req, res, next) {
			console.log('Service this route: ', route.method + ' ' + route.path);
			route.handler(req, res, next);
		});
	});
}

module.exports = Routes;