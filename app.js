var express = require('express');
var path = require('path');

var apiPort = process.env.API_PORT || 3031;
var api = require('./api/api');

var router = require('./app/routes/router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app','views'));
app.set('view engine', 'hjs');

// Allow directly requiring '.jsx' files.
require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(router());
app.use('/api', api.proxyMiddleware(apiPort));
// run the "mock" api on a different port
api.listen(apiPort);

module.exports = app;
