
/**
 * Module dependencies.
 */

var express = require('express')
  // , routes = require('./routes')
  , entry = require('./routes/entry')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var mongoose = require('mongoose');
var uri = process.env.MONGOHQ_URL || 'mongodb://localhost/quitEntry';
mongoose.connect(uri); 

app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, 'public') + '/index.html');
});

//app.get('/', routes.index);
app.get('/api/search', entry.search);
app.get('/api/companies', entry.companies);
app.post('/api/add', entry.add);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
