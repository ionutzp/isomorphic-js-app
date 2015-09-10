var React = require("react");
var Search = require("./search");

var App = React.createClass({
  render(){
    return(
      <Search data-renderer = {this.props.renderer} />
    );
  }
});

module.exports = App;
