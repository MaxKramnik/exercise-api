var mongoose = require('mongoose');
var Faker = require('Faker');
var config = require('../config/config');
var Person = require('../lib/models/person');
var person = new Person();

/* possible country choices for fake users */
var countries = [ 'USA', 'Canada', 'Mexico', 'UK', 'France', 'Sweden', 'Spain'];
var gender = ['male', 'female'];
var users = [];

function getRandom(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1));
}

/* generate an array of users */
for (var i = 0; i < 100; i++) {
	var name = Faker.Name.findName();
	var user = {
		username: Faker.Internet.userName(),
		name: name,
		country: countries[getRandom(0, countries.length - 1)],
		gender: gender[getRandom(0, 1)],
		password: 'password'
	}
	users.push(user);
}

/* add admin to the list */
users.push(config.admin);  

mongoose.connect(config.db, function(err) {
	if (err) throw err;
	removeData(insertData);  //first remove the older data if the script is run multiple times
});

function insertData() {
	var count = users.length;
	users.forEach(function(user) {
		person.create(user, function(err, user) {
			console.log(user)
			if (err) return done(err);
			count--;
			if (count === 0) {
				done();
			}
		});
	});
}

function removeData(callback) {
	person.remove(function(err) {
		if (err) done(err);
		callback();
	});
}

function done(err) {
	if (err) console.error(err);
	mongoose.disconnect();
}
