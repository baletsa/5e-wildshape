'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var config = require('../config').scripts;
var webpackConfig = require('../webpack.config.js');

var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');


gulp.task('webpack', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.beep();
        this.emit('end');
      }
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(config.dest));
});
