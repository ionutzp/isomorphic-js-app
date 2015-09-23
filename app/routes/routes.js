var apiClient = require('../apiClient');

var routes = function(match) {

  match(/(\w+)?/, function(term, callback) {
    console.log('get with filter', term);
    var url  = term ? '/todos' + '/' + term : '/todos';
    apiClient.get(url,  function(err, res) {
      if (err) return callback(err);
      var todos = res.body;
      callback(null, 'index', todos);
    });

  });
};

module.exports = routes;
