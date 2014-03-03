var Person = require('../lib/models/person');
var person = new Person();

/* get a list of user, it can be paged, sorted by country, or filtered by gender */
exports.list = function(req, res) {
	var query = {},
		sort = {},
		pageSize = 10,
		numOfSkipped = 0,
		page = 1;

	if (req.query.gender) {
		query = { gender: req.query.gender };
	}

	if (req.params.page) {
		page = req.params.page;
		numOfSkipped = (page - 1) * pageSize;
	}

	if (req.query.groupby) {
		sort = req.query.groupby;
	}

	person.find(query, 'name gender country', { skip: numOfSkipped, limit: pageSize, sort: sort }, function(err, users) {
		if (err) {
			return res.send(500, { error: err });
		}
		return res.send(users);
	});
};