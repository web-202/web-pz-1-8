const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('app/scss/app.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('js-dev', function () {
  return gulp.src([
    'app/libs/somelibs.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('app/js'));
});

gulp.task('js-prod', function () {
  return gulp.src([
    'app/libs/somelibs.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('code', function () {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('clean', async function () {
  return del.sync('build');
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))/**/)
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy', async function () {

  gulp.src([
    'app/css/app.css'
  ])
    .pipe(gulp.dest('dist/css'))

  gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

  gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

  gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

gulp.task('watch', function () {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch(['app/js/index.js', 'app/libs/**/*.js'], gulp.parallel('js-dev'));
});

gulp.task('default', gulp.parallel('sass', 'js-dev', 'browser-sync', 'watch'));
gulp.task('build', gulp.series('clean', 'img', 'sass', 'js-prod', 'copy'));
