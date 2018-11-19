'use strict';

var gulp = require('gulp'),
  config = require('../config').scripts,
  webpackConfig = require('../webpack.config.js'),
  gutil = require('gulp-util'),
  gulpif = require('gulp-if'),
  plumber = require('gulp-plumber');

var webpack = require('webpack-stream'),
  browserSync = require('browser-sync');

if (gutil.env.minify === true) {
  var minify = true;
}

gulp.task('webpack', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.beep();
        this.emit('end');
      }
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
