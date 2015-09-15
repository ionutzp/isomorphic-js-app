var React = require("react");

var TodoFilter = React.createClass({
  handleChange(){
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value
    );
  },
  render() {
    return (
      <div className="TodoFilter">
        <input value={this.props.filterText}  type="text" onChange={this.handleChange} ref="filterTextInput"/>
      </div>
    );
  }

  // changeSearch(event) {
  //   var text = event.target.value;
  //   this.setState({
  //     search: text
  //   });
  // }
});

module.exports = TodoFilter;
