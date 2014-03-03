var sinon = require('sinon');
var should = require('should');
var usersApi = require('../../../api').users;
var Person = require('../../../lib/models/person');
var person = new Person();

var sandbox;

describe('Get a list of users, users API', function() {
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it ('should return status 500 if error is returned', function(done) {
		var req = { query: {}, params: {}}, res = {};

		res.send = function() {
			if (arguments.length === 2) {
				this.statusCode = arguments[0];
				this.body = arguments[1];
			}
			else {
				this.statusCode = 200;
				this.body = arguments[0];
			}
			this.statusCode.should.equal(500);
			done();
		};

		sandbox.stub(person.personModel, 'find', function(query, fields, criteria, callback) {
			callback(new Error('some error'));
		});	

		usersApi.list(req, res);
	});


	it ('should return user list, page 2, only male, grouped by country', function(done) {
		var req = { query: { gender: 'male', groupby: 'country'}, params: { page: 2 }}, res = {};

		res.send = function() {
			if (arguments.length === 2) {
				this.statusCode = arguments[0];
				this.body = arguments[1];
			}
			else {
				this.statusCode = 200;
				this.body = arguments[0];
			}
			this.body.should.have.length(3);
			this.body[0].should.have.property('gender', 'male')
			done();
		};

		sandbox.stub(person.personModel, 'find', function(query, fields, criteria, callback) {
			callback(null, [{ gender: 'male' }, { gender: 'male' }, { gender: 'male' }]);
		});	

		usersApi.list(req, res);
	});
});


