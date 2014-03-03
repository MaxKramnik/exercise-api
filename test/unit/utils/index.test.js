var sinon = require('sinon');
var should = require('should');
var utils = require('../../../utils');
var fs = require('fs');

var sandbox;

describe('Traverse a given directory', function() {	
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it ('should return an exception if the directory does not exist', function(done) {		

		sandbox.stub(fs, 'stat', function(directory, callback) {
			callback(new Error('some error'));
		});

		utils.traverse('bogus_directory', function(err, files) {
			err.should.be.an.instanceof(Error);
			done();
		});
	});

	it ('should return an exception if there is a problem reading a directory', function(done) {

		sandbox.stub(fs, 'readdir', function(directory, callback) {
			callback(new Error('some error'));
		});

		sandbox.stub(fs, 'stat', function(directory, callback) {
			callback(null);
		});
	
		utils.traverse('existing_directory', function(err, files) {
			err.should.be.an.instanceof(Error);
			done();
		});
	});

	it ('should return an array of file names if the directory exists', function(done) {

		sandbox.stub(fs, 'readdir', function(directory, callback) {
			callback(null, ['file1', 'file2', 'file3']);
		});

		sandbox.stub(fs, 'stat', function(directory, callback) {
			callback(null);
		});
	

		utils.traverse('existing_directory', function(err, files) {
			files.should.have.length(3);
			done();
		});
	});
});