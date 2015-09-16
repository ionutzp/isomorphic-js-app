var React = require("react");
var TodoList = require("./todolist");
var TodoFilter = require("./todofilter");
var TodoAdd = require("./todoadd");

var TodoApp = React.createClass({
  getInitialState() {
    return {
      filter: this.props.term,
      todos: this.props.todos
    };
  },

  handleUserInput(filterText) {
    this.setState({
      filter: filterText,
    });
  },

  handleTodoAdd(todoName) {
    var newTodos = this.state.todos.concat({completed:false, name: todoName});
    this.setState({
      todos: newTodos
    });
  },


  render() {
    return (
      <div className="TodoApp">
        <TodoFilter filterText={this.state.filter} renderer={this.props.renderer} onUserInput={this.handleUserInput} />
        <TodoAdd renderer={this.props.renderer} onUserInput={this.handleTodoAdd} />
        <TodoList filterText={this.state.filter} renderer = {this.props.renderer} todos = {this.state.todos} />
      </div>
    );
  },

  changeSearch(event) {
    var text = event.target.value;
    this.setState({
      search: text
    });
  }
});

module.exports = TodoApp;
