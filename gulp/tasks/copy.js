'use strict';

var changed = require('gulp-changed');
var config = require('../config');
var gulp = require('gulp');

gulp.task('copy', ['copy:scripts', 'copy:fonts']);

gulp.task('copy:scripts', function() {
  return gulp.src(config.scripts.libsSrc)
    .pipe(changed(config.scripts.libsDest))
    .pipe(gulp.dest(config.scripts.libsDest));
});

gulp.task('copy:fonts', function() {
  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest));
});
