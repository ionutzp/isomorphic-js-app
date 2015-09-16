var React = require("react");
var TodoApp = require("./todoapp");
var tasks = require("../data/provider").get('tasks');

var App = React.createClass({
  render(){
    return(
      <TodoApp renderer={this.props.renderer} todos={tasks} term={this.props.term}/>
    );
  }
});

module.exports = App;
