var routes = function(match) {

  match(/(\w+)?/, function(term, callback) {
    callback(null, 'index', term);
  });
};

module.exports = routes;
