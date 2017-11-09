'use strict';
var gulp = require('gulp'),
  config = require('../config'),
  browserSync = require("browser-sync");

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(config.sass.src, ['sass-lint', 'sass', browserSync.reload]);
  gulp.watch(config.images.src, ['images', browserSync.reload]);
  gulp.watch(config.markup.src, ['markup', browserSync.reload]);
  gulp.watch(config.scripts.all, ['webpack', browserSync.reload]);
});
