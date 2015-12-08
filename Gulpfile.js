var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    mocha = require('guilp-mocha'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

//TODO: Create common tasks for gulp

gulp.task('dev', function () {
  gulp.watch('', ['']);
});

gulp.task('Task', function () {
  return gulp.src('Source')
  .pipe(plugin());
});
