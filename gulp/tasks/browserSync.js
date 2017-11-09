'use strict';

var gulp = require('gulp'),
  config = require('../config').browserSync,
  browserSync = require('browser-sync').create();


gulp.task('browserSync', ['build'], function() {
  browserSync.init(config);
});

gulp.task('browserSync:serve', function() {
  browserSync.init(config);
});
