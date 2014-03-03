var sinon = require('sinon');
var should = require('should');
var accountApi = require('../../../api').account;
var Person = require('../../../lib/models/person');
var person = new Person();

var sandbox;

describe('User Authentication, account API', function() {
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	it ('should return status code 500 if either username or password or both are missing', function(done) {
		var req = {
				query: {}
			}, 
			res = {};		
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
		accountApi.auth(req, res);
	});

	it ('should return statusCode 500 if error is returned', function(done) {
		var req = {
				query: {
					username: 'test1',
					password: 'test2'
				}
			}, 
			res = {};		
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

		sandbox.stub(person.personModel, 'findOne', function(query, fields, callback) {
			callback(new Error('some error'));
		});	
		accountApi.auth(req, res);
	});

	it ('should return statusCode 500 if username and password did not match a record', function(done) {
		var req = {
				query: {
					username: 'test1',
					password: 'test2'
				}
			}, 
			res = {};		
		res.send = function() {
			if (arguments.length === 2) {
				this.statusCode = arguments[0];
				this.body = arguments[1];
			}
			else {
				this.statusCode = 200;
				this.body = arguments[0];
			}
			this.statusCode.should.equal(403);
			done();
		};

		sandbox.stub(person.personModel, 'findOne', function(query, fields, callback) {
			callback(null, null);
		});	
		accountApi.auth(req, res);
	});

	it ('should return a user object when the match is found', function(done) {
		var req = {
				query: {
					username: 'test1',
					password: 'test2'
				}
			}, 
			res = {};		
		res.send = function() {
			if (arguments.length === 2) {
				this.statusCode = arguments[0];
				this.body = arguments[1];
			}
			else {
				this.statusCode = 200;
				this.body = arguments[0];
			}
			this.body.should.have.property('username');
			this.body.should.have.property('name');
			this.body.should.have.property('country');
			this.body.should.have.property('gender');
			done();
		};

		sandbox.stub(person.personModel, 'findOne', function(query, fields, callback) {
			callback(null, {
				username: 'username',
				name: 'name',
				country: 'country',
				gender: 'gender'
	
			});
		});	
		accountApi.auth(req, res);
	});
});