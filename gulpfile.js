const gulpfile = require('gulp');
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

gulpfile.task('sass', function () {
  return gulpfile.src('app/scss/app.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulpfile.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulpfile.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulpfile.task('js-dev', function () {
  return gulpfile.src([
    'app/libs/somelibs.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(gulpfile.dest('app/js'));
});

gulpfile.task('js-prod', function () {
  return gulpfile.src([
    'app/libs/somelibs.js'
  ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulpfile.dest('app/js'));
});

gulpfile.task('code', function () {
  return gulpfile.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});


gulpfile.task('clean', async function () {
  return del.sync('build');
});

gulpfile.task('img', function () {
  return gulpfile.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))/**/)
    .pipe(gulpfile.dest('dist/img'));
});

gulpfile.task('copy', async function () {

  gulpfile.src([
    'app/css/app.css'
  ])
    .pipe(gulpfile.dest('dist/css'))

  gulpfile.src('app/fonts/**/*')
    .pipe(gulpfile.dest('dist/fonts'))

  gulpfile.src('app/js/**/*')
    .pipe(gulpfile.dest('dist/js'))

  gulpfile.src('app/*.html')
    .pipe(gulpfile.dest('dist'));

});

gulpfile.task('clear', function (callback) {
  return cache.clearAll();
})

gulpfile.task('watch', function () {
  gulpfile.watch('app/scss/**/*.scss', gulpfile.parallel('sass'));
  gulpfile.watch('app/*.html', gulpfile.parallel('code'));
  gulpfile.watch(['app/js/index.js', 'app/libs/**/*.js'], gulpfile.parallel('js-dev'));
});

gulpfile.task('default', gulpfile.parallel('sass', 'js-dev', 'browser-sync', 'watch'));
gulpfile.task('build', gulpfile.series('clean', 'img', 'sass', 'js-prod', 'copy'));
