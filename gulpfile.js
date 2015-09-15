var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var nodemon = require('gulp-nodemon');
var spawn = require('child_process').spawn;

gulp.task("build-dev", ["webpack:build-dev"], function() {
  gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  webpack(require('./webpack.config.js')).run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

var startNodeInspector = function(){
  var child = spawn("node-inspector", [], {cwd: process.cwd()}),
  stdout = '',
  stderr = '';

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', function (data) {
    stdout += data;
    gutil.log(data);
  });

  child.stderr.setEncoding('utf8');

  child.stderr.on('data', function (data) {
    stderr += data;
    gutil.log(gutil.colors.red(data));
    gutil.beep();
  });

  child.on('close', function(code) {
    gutil.log("Done with exit code", code);
  });
};

gulp.task("nodeInspector", function() {
  startNodeInspector();
});




gulp.task('start', ["nodeInspector", "build-dev"], function () {
  nodemon({
    script: './bin/www',
    ext: 'js',
    // execMap: {
    //   js: 'node --debug'
    // },
    exec: 'node --debug',
    verbose: false,
    env: { 'NODE_ENV': 'development' }
  })
  .on('restart', function(){
    gutil.log('restart');
  })
  .once('start', function(){
    // start the node inspector
  });
});

