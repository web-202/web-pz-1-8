const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const worker_threads = require("worker_threads");

function toSass() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/css/'))
}

function watch() {
  gulp.watch('app/scss/*.scss', toSass)
}


gulp.task('default', gulp.series(toSass, watch))
