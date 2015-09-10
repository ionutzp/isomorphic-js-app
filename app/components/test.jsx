var React = require("react");

var Test = React.createClass({
  getInitialState() {
    return {
      search: ""
    };
  },
  render() {
    return (
      <div className="search-component">
        <input type="text" onChange={this.changeSearch} />
        <p><span>Test for: {this.state.search}</span></p>
        <p>renderer = {this.props.renderer}</p>
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

module.exports = Test;
