
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var add = require('./routes/add.js');
var controller = require('./routes/controller.js');
var hostops = require('./routes/hostoptions');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/create', function(req, res) {
	res.render('create');
})
app.get('/', index.view);
// Example route
// app.get('/users', user.list);

app.get('/hostoptions',hostops.view);


app.post('/add', add.addPhoneNumber);
app.post('/consolePrint', add.outputDatabase);
app.post('/createEvent', controller.createEvent);
app.post('/enterRaffle', controller.enterRaffle);

app.get('/generateWinner', controller.generateWinner);
app.get('/:eventName', controller.guest);
app.get('/manage/:eventName', controller.host);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
