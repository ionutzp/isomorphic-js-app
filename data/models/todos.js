var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  name: String,
  completed: Boolean,
  created_at: Date
});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
