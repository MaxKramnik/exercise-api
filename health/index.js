var mongoose = require('mongoose');

/*  get the top object property of mongoose connection db object, 
	it will return 'state' as one of the properties 
*/
exports.monitor = function(callback) {
	var props = {};
	for(var key in mongoose.connection.db) {
		if (typeof mongoose.connection.db[key] !== 'function' 
				&& typeof mongoose.connection.db[key] !== 'object' ) {
			props[key] = mongoose.connection.db[key];
		}
	}
	callback(props);
}