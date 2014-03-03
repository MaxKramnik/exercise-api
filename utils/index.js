var fs = require('fs');

exports.traverse = function(directory, callback) {
	fs.stat(directory, function(err, stat) {
		if (err) return callback(err);

		walk(directory, function(err, files) {
			if (err) return callback(err);

			callback(null, files);
		});
	});
};


function walk(directory, callback) {
	var items = [];
	fs.readdir(directory, function(err, list) {
		if (err) return callback(err);

		var unprocessed = list.length;
		if (!unprocessed) {
			return callback(null, list);
		}

		list.forEach(function(file) {
			file = directory + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, newItems) {
						items = items.concat(newItems);
						if (!--unprocessed) {
							return callback(null, items);
						}
					});
				}
				else {
					items.push(file);
					if (!--unprocessed) {
						return callback(null, items);
					}
				}
			});
		});
	});
}
