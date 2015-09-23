var React = require("react");
var $ = process.browser ? require('jquery') : null;
var apiClient = require('../apiClient');


var TodoAdd = React.createClass({
  handleSubmit(e){
    e.preventDefault();
    var $form = $(this.refs.form.getDOMNode());
    var router = this.props.router;
    this.props.onUserInput(
      this.refs.todoAddInput.getDOMNode().value
    );
    apiClient.post($form.attr('action'))
    .send({'name': this.refs.todoAddInput.getDOMNode().value})
    .end(function(error, response) {
      if (response.ok) {
        // debugger;
      }
      else {
        // alert(response.body.error);
      }
      });
  },
  render() {
    return (
      <div className="TodoAdd">
        Add todo:
        <form onSubmit={this.handleSubmit} method="post" role="form" ref="form" action="/api/todos">
          <input type="text" ref="todoAddInput" />
          <input type="submit"/>
        </form>
      </div>
    );
  }
});

module.exports = TodoAdd;
