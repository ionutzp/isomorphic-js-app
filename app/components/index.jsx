var React = require("react");
var TodoApp = require("./todoapp");

var App = React.createClass({
  render(){
    return(
      <TodoApp renderer={this.props.renderer} todos={this.props.todos} term={this.props.term}/>
    );
  }
});

module.exports = App;
