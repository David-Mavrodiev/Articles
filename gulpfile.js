'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./source/public/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/public/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./source/public/styles/**/*.scss', ['sass']);
});