var gulp = require('gulp');

//Builds dev and starts browsersync
gulp.task('default', ['build', 'watch']);

//Builds files
gulp.task('build', ['clean', 'webpack', 'sass-lint', 'sass', 'images', 'markup', 'copy']);

//Starts browsersync against release
gulp.task('serve', ['browserSync:serve']);
