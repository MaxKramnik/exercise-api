var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var personSchema = new Schema({
	username: String,
    name : String,
    country: String,
    gender: String,
    password: String
});

var PersonModel = mongoose.model('Person', personSchema);

/*  Person object to wrap data access to make the data access testable 
	without hitting the database 
*/
var Person = function() {
	if (!this instanceof Person) {
		return new Person();
	}

	this.personModel = PersonModel;
}

Person.prototype.findOne = function(query, fields, callback) {
	this.personModel.findOne(query, fields, function(err, user) {
		callback(err, user);
	});
}

Person.prototype.find = function(query, fields, criteria, callback) {
	this.personModel.find(query, fields, criteria, function(err, users) {
		callback(err, users);
	});
}

Person.prototype.create = function(user, callback) {
	this.personModel.create(user, function(err, user) {
		callback(err, user);
	});
}

Person.prototype.remove = function(callback) {
	this.personModel.remove(function(err) {
		callback(err);
	});
}


module.exports = Person;
