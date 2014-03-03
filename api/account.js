var Person = require('../lib/models/person');
var person = new Person();

/* authenticate a user, if the match was successful, return user object;
	if not, return status 403
*/
exports.auth = function(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	
	if (!username || !password) {
		return res.send(500, { error: 'username and/or password were not passed as parameters' });
	}
	person.findOne({ username: username, password: password }, 'username name gender country', function(err, user) {
		if (err) {
			res.send(500, { error: err });
		}
		else {
			if (user) {
				res.send(user);
			}
			else {
				res.send(403, { error: 'Permission denied.' });
			}
		}
	});
};

