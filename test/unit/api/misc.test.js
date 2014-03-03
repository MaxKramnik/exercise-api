var sinon = require('sinon');
var should = require('should');
var utils = require('../../../utils');
var miscApi = require('../../../api').misc;
var health = require('../../../health');

var sandbox;

describe('Misc API', function() {
	describe('Traverse a directory', function() {
		beforeEach(function() {
			sandbox = sinon.sandbox.create();
		});

		afterEach(function() {
			sandbox.restore();
		});

		it ('should return an exception if the directory param is not supplied', function(done) {		
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
			miscApi.traverse(req, res);
		});

		it ('should return status code 500 if the directory does not exist', function(done) {
			var req = {
					query: {
						directory: 'existing_directory'
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

			sandbox.stub(utils, 'traverse', function(directory, callback) {
				callback(new Error('some error'));
			});		
			miscApi.traverse(req, res);

		});

		it ('should return an array of file names', function(done) {
			var req = {
					query: {
						directory: 'existing_directory'
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
				this.body.should.have.length(3);
				done();
			};

			sandbox.stub(utils, 'traverse', function(directory, callback) {
				callback(null, ['file1', 'file2', 'file3']);
			});		
			miscApi.traverse(req, res);

		});
	});

	describe('Get the health state of the system', function() {
		before(function() {
			sandbox = sinon.sandbox.create();
		});

		after(function() {
			sandbox.restore();
		});		
		it ('should return a health monitor object', function(done) {
			var req = {}, 
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
				this.body.should.have.property('serverState', 'ok');
				done();
			};	

			sandbox.stub(health, 'monitor', function(callback) {
				callback({ serverState: 'ok' });
			});

			miscApi.health(req, res);

		});
	});
});