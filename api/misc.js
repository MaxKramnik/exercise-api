var utils = require('../utils');
var health = require('../health');

var misc = {};

/* get some stats about the server and db states */
misc.health = function(req, res) {
	health.monitor(function(props) {
		var health = {
			serverState: 'ok',
			mongoState: props.state,
			mongoProps: props
		};

		res.send(health);
	});
};

/* traverse a directory and return all files */
misc.traverse = function(req, res) {
	var directory = req.query.directory;
	if (!directory) {
		return res.send(500, { error: 'No directory supplied as a parameter' });
	}
	utils.traverse(directory, function(err, files) {
		if (err) {
			return res.send(500, { error: "Directory '" + err.path + "' does not exist" });			
		}
		else {
			return res.send(files);
		}
	});
};

module.exports = misc;