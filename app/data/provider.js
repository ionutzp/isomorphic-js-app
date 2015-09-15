var tasks = [
  {'completed': false, 'name': 'Strong to excellent HTML and CSS skills'},
  {'completed': false, 'name': 'At least a little experience with Sass and jQuery'},
  {'completed': false, 'name': 'At least a little experience with responsive design'},
  {'completed': false, 'name': 'Prototype methods cannot be used as constructors'}
]

module.exports = {
  get: function() {
    return tasks;
  }
}
