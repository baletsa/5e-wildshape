'use strict';

var gulp = require('gulp'),
  config = require('../config').sass,
  gutil = require('gulp-util'),
  gulpif = require('gulp-if'),
  plumber = require('gulp-plumber');


var sass = require('gulp-sass'),
  cache = require('gulp-cached'),
  sasslint = require('gulp-sass-lint'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  nano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync');

var processors = [
  autoprefixer({
    browsers: '> 1%, last 4 versions',
    map: true
  })
];

var myConfig = Object.create(config);
if (gutil.env.minify === true) {
  var minify = true;
  myConfig.settings.outputStyle = 'compressed';
}

// Process
gulp.task('sass', function() {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(gutil.colors.red.bold(error.message));
        gutil.beep();
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(myConfig.settings))
    .pipe(postcss(processors))
    .pipe(gulpif(!minify, sourcemaps.write()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});

// Lint
gulp.task('sass-lint', function() {
  return gulp.src(['app/styles/sass/partials/**/*.scss'])
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(gutil.colors.red.bold(error.message));
        gutil.beep();
        this.emit('end');
      }
    }))
    .pipe(cache('sasslinting'))
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});
