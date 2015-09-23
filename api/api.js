var express = require('express');
var _ = require('underscore');
var httpProxy = require('http-proxy');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var TodoModel = require('../data/models/todos');

module.exports = app;

var getTodos = function(regexp, callback) {
  mongoose.connect('mongodb://localhost/isomorphic-architecture');
  var db = mongoose.connection;
  db.once('open', function() {
    TodoModel
    .where('name', regexp).exec(function (err, todos){
      if (err) {
        console.log(err);
        // todo send error
      } else {
        mongoose.connection.close();
        console.log(todos);
        callback(todos);
      }
    });
  });
};

var addTodo = function(todo, callback){
  var newTodoData = _.extendOwn(todo, {'created_at': new Date().toJSON() })
  var newTodo = TodoModel(newTodoData);
  mongoose.connect('mongodb://localhost/isomorphic-architecture');
  var db = mongoose.connection;
  db.once('open', function() {
    newTodo.save(function (err, data) {
      if (err){
        console.log(err);
      }
      else {
        mongoose.connection.close();
        callback(data);
      }
    });
  });
}


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/todos', function(req, res) {
  getTodos(/[\s\S]+/i, function(todos){
    var response = _.map(todos, function(todo){ return todo.toObject() });
    res.send(response);
  });
});

app.post('/todos', function(req, res) {
  var todo = req.body;
  if (!todo.name){
    res.send(400, {success: false, error: "Missing parameters."});
  }
  else {
    addTodo(todo, function(data){
      res.send({success: true});
    });
  }
});

app.get('/todos/:term', function(req, res) {
  var termre = new RegExp(req.params.term, 'i');
  getTodos(termre, function(todos){
    var response = _.map(todos, function(todo){ return todo.toObject() });
    res.send(response);
  });

});


/**
 * On the client, we want to be able to just send API requests to the
 * main web server using a relative URL, so we proxy requests to the
 * API server here.
 */
var proxy = httpProxy.createProxyServer();

app.proxyMiddleware = function(apiPort) {
  return function(req, res, next) {
    proxy.web(req, res, {
      target:{
        host: 'localhost',
        port: apiPort
      }
    });
  };
};
