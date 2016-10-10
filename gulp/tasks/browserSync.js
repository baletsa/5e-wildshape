'use strict';

var browserSync = require('browser-sync');
var config = require('../config.js').browserSync;
var gulp = require('gulp');

gulp.task('browserSync', ['build'], function() {
  browserSync(config);
});

gulp.task('browserSync:serve', function() {
  browserSync(config);
});
