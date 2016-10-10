'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config').sass;

var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');

var sasslint = require('gulp-sass-lint');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');

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

//temporarily a separate task until ignore function works
//https://github.com/sasstools/sass-lint/pull/402
gulp.task('sass-lint', function() {
  return gulp.src(['app/styles/sass/partials/**/*.scss', '!app/**/_hacks.scss'])
    .pipe(plumber({
      errorHandler: function(error) {
        gutil.log(gutil.colors.red.bold(error.message));
        gutil.beep();
        this.emit('end');
      }
    }))
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
});

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
    .pipe(browserSync.reload({
      stream: true
    }));
});
