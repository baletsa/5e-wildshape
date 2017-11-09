var gulp = require('gulp'),
  config = require('../config').images,
  changed = require('gulp-changed'),
  gutil = require('gulp-util'),
  gulpif = require('gulp-if'),
  browserSync = require('browser-sync');

// image minification
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
  if (gutil.env.minify === true) {
    return gulp.src(config.src)
      .pipe(imagemin()) // Minify
      .pipe(gulp.dest(config.dest));
  } else {
    return gulp.src(config.src)
      .pipe(changed(config.dest)) // Ignore unchanged files
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.stream());
  }
});
