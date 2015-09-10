var React = require('react');
// Require Handlebars for layout.
// require('handlebars');
var isServer = !process.browser;

if(isServer){
  module.exports = RendererServer;

  function RendererServer() {}

  RendererServer.prototype.viewsDir = process.cwd() + '/app/components';

  RendererServer.prototype.render = function(component, req, res) {
    var html = React.renderToString(component);

    // var locals = {
    //   body: html,
    // };

    // var markup = React.renderToString(
    //   App()
    // );


    // wrapWithLayout(locals, function(err, layoutHtml) {
    // if (err) return res.status(500).type('text').send(err.message);
    // res.send(html);
    // });
    res.render("index", {
      markup: html
    });
  };

  RendererServer.prototype.handleErr = function(err) {
    console.error(err.message + err.stack);
    this.next(err);
  };

  /**
   * Helper functions.
   */

  function wrapWithLayout(locals, callback) {
    try {
      var layout = require(RendererServer.viewsDir + '/layout');
      var layoutHtml = layout(locals);
      callback(null, layoutHtml);
    } catch (err) {
      callback(err);
    }
  }
}
else {
  // Expose `window.React` for dev tools.
  window.React = React;

  module.exports = RendererClient;

  function RendererClient() {}

  RendererClient.prototype.viewsDir = '../components';

  RendererClient.prototype.render = function(component) {
    window.onload = function(){
      React.render(component, document.getElementById("content"));
    }

  };

  RendererClient.prototype.handleErr = function(err) {
    console.error(err.message + err.stack);
    alert(err);
  };
}




