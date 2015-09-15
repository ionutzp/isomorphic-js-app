var React = require("react");
var TodoList = require("./todolist");
var TodoFilter = require("./todofilter");

var TodoApp = React.createClass({
  getInitialState() {
    return {
      filter: this.props.term
    };
  },

  handleUserInput(filterText) {
    this.setState({
      filter: filterText,
    });
  },


  render() {
    return (
      <div className="TodoApp">
        <TodoFilter filterText={this.state.filter} renderer={this.props.renderer} onUserInput={this.handleUserInput} />
        <TodoList filterText={this.state.filter} renderer = {this.props.renderer} todos = {this.props.todos} />
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
