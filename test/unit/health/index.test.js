var sinon = require('sinon');
var should = require('should');
var mongoose = require('mongoose');
var health = require('../../../health');

var sandbox, connection;

describe('Get some system stats', function() {	
	before(function() {
		connection = mongoose.connection;
	});

	after(function() {
		mongoose.connection = connection;
	});

	it ('should return an object with stats', function(done) {
		var connectionStub = sinon.stub(mongoose.connection);
		connectionStub.db = {
			serverState: 'ok'
		};

		health.monitor(function(stats) {
			stats.should.have.property('serverState', 'ok');
			done();
		});
	});
});


