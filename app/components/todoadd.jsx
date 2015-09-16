var React = require("react");

var TodoAdd = React.createClass({
  handleChange(e){
    e.preventDefault();
    this.props.onUserInput(
      this.refs.todoAddInput.getDOMNode().value
    );
  },
  render() {
    return (
      <div className="TodoAdd">
        Add todo:
        <form onSubmit={this.handleChange}>
          <input type="text" ref="todoAddInput" />
          <input type="submit"/>
        </form>
      </div>
    );
  }
});

module.exports = TodoAdd;
