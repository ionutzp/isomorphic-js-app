var path = require("path");
module.exports = [{
  watch: true,
  context: path.join(__dirname, "app"),
  entry: 'routes/router',
  output: {
    path: path.join(__dirname, "public", "javascripts"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader?harmony"}
    ]
  },
  resolve: {
    // You can now require('file') instead of require('file.coffee')
    extensions: ["", ".js", ".jsx"],
    root: [path.join(__dirname, "app")],
    modulesDirectories: ["node_modules"]
  }
}];
