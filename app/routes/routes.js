module.exports = function(match) {
  match('/', function(callback) {
    console.log('index', callback);
    callback(null, 'Index');
  });
};
