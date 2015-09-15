var React = require("react");

var TodoItem = React.createClass({
  render() {
    var checkedVal = this.props.completed ? 'true' : 'false'
    return (
      <li className="TodoItem">
        <input type="checkbox" defaultChecked={{checkedVal}} />
        {this.props.name} / {this.props.renderer}
      </li>
    );
  }

  // changeSearch(event) {
  //   var text = event.target.value;
  //   this.setState({
  //     search: text
  //   });
  // }
});

module.exports = TodoItem;
