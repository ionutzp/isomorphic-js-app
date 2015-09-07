var express = require('express');
var router = express.Router();


require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

var React = require("react");

var App = React.createFactory(require("../public/javascripts/components/app"));

router.get('/', function(req, res) {
  var markup = React.renderToString(
    App()
  );

  res.render("index", {
    markup: markup
  });
});

module.exports = router;
