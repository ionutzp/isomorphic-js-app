var React = require("react");
var TodoItem = require("./todoitem");

var TodoList = React.createClass({
  render() {
    var todos = [];
    var patt = new RegExp(this.props.filterText, 'i');
    this.props.todos.forEach(function(todo, index){
      if(patt.test(todo.name)){
        todos.push(<TodoItem key={index} completed={todo.completed} name={todo.name} renderer={this.props.renderer} />);
      }
    }.bind(this));

    return (
      <ul className="TodoList">
        {todos}
      </ul>
    );
  }

  // changeSearch(event) {
  //   var text = event.target.value;
  //   this.setState({
  //     search: text
  //   });
  // }
});

module.exports = TodoList;
