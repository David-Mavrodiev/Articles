'use strict';
 
const gulp = require('gulp'),
      gulpsync = require("gulp-sync")(gulp),
      sass = require('gulp-sass'),
      babel = require("gulp-babel"),
      clean = require("gulp-clean"),
      nodemon = require("gulp-nodemon");

gulp.task("clean", function() {
    return gulp
        .src("build", {
            read: false,
        })
        .pipe(clean());
});

gulp.task('transform:sass', function () {
  return gulp.src("./source/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./build"));
});

gulp.task('transform:js', () => {
    return gulp.src('./source/public/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('./build/public'));
});

gulp.task("copy:all", () => {
    return gulp
        .src([
            "./source/**/*.html",
            "./source/**/*.js",
            "./source/**/*.hbs",
            "./source/**/*.css",
            "./source/**/*.jpg",
            "./source/**/*.png",
            "./source/**/*.otf",
            "!./source/public/**/*.js",
        ])
        .pipe(gulp.dest("./build"));
});

gulp.task("transform", ["transform:js", "transform:sass"]);

gulp.task("copy", ["copy:all"]);

gulp.task("build", gulpsync.sync(["clean", "transform", "copy"]));

gulp.task("serve", ["build"], () => {
    nodemon({
        script: "./build/server.js",
        ext: "js html hbs scss css otf",
        ignore: ["build"],
        tasks: ["build"],
    });
});