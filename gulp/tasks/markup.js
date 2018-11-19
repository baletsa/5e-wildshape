var gulp = require('gulp'),
  config = require('../config').markup,
  cache = require('gulp-cached'),
  include = require('gulp-include'),
  browserSync = require('browser-sync');

gulp.task('markup', function() {
  return gulp.src(config.src)
    .pipe(include())
    .pipe(cache('markups'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
