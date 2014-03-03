var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var routes = require('./routes');
var config = require('./config/config');

var app = express();

mongoose.connect(config.db, { db: { safe: true }});

mongoose.connection.on('error', function(err) {
	console.log('Database connection problem\n%s', err)
});

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

routes(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
