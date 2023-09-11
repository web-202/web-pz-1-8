const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('scss', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function () {
  gulp.watch('./app/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('default', gulp.series('scss', 'watch'));

