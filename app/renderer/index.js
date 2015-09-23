var React = require('react');
var isServer = !process.browser;

if(isServer){
  module.exports = RendererServer;

  function RendererServer() {}

  RendererServer.viewsDir = process.cwd() + '/app/components';

  RendererServer.prototype.render = function(component, req, res) {
    var html = React.renderToString(component);
    res.render("index", {
      markup: html
    });
  };

  RendererServer.prototype.handleErr = function(err) {
    console.error(err.message + err.stack);
    this.next(err);
  };
}
else {

  module.exports = RendererClient;

  function RendererClient() {}

  RendererClient.viewsDir = '../components';

  RendererClient.prototype.render = function(component) {
    React.render(component, document.getElementById("content"));

  };

  RendererClient.prototype.handleErr = function(err) {
    console.error(err.message + err.stack);
    alert(err);
  };
}




