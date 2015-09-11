var routes = function(match) {
  match('/', function(callback) {
    console.log('route - index', callback);
    callback(null, 'index');
  });

  match('/test', function(callback) {
    console.log('route - test', callback);
    callback(null, 'test');
  });
};

module.exports = routes;
