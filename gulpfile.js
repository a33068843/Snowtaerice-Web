'use strict';

const gulp        = require('gulp');
const pug         = require('gulp-pug');
const sass        = require('gulp-sass')(require('sass'));
const postcss     = require('gulp-postcss');
const autoprefixer= require('autoprefixer');
const plumber     = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const rename      = require('gulp-rename');
const changed     = require('gulp-changed');
const imagemin    = require('gulp-imagemin');
const uglify      = require('gulp-uglify');

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './www',
      index: 'index.html'
    },
    port: 5000
  })

  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/**/*.scss', gulp.series('styles'));
  gulp.watch('src/**/*.js', gulp.series('script'));
  gulp.watch('src/images/*', gulp.series('images'));
})

gulp.task('pug', (done) => {
  gulp
    .src('src/pug/**/[^_]*.pug')
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./www'))
    .pipe(browserSync.reload( {stream: true} ))
  done();
});

gulp.task('styles', (done) => {
  gulp
    .src('src/**/[^_]*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    // .pipe(postcss([autoprefixer({browsers: 'last 2 versions, > 0.01%'})]))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./www/css'))
    .pipe(browserSync.reload( {stream: true} ))
  done();
});

gulp.task('script', (done) => {
  gulp
    .src('src/**/[^_]*.js')
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    // .pipe(uglify())
    .pipe(gulp.dest('./www/js'))
    .pipe(browserSync.reload( {stream: true} ))
  done();
});

gulp.task('images', (done) => {
  gulp
    .src('src/images/**/*')
    .pipe(plumber())
    .pipe(changed('./www/images'))
    // .pipe(rename({dirname: ''}))
    // .pipe(imagemin())
    .pipe(gulp.dest('./www/images'))
    .pipe(browserSync.reload( {stream: true} ))
  done();
})

// 只有跑第一次的時候會偵測
gulp.task('favicon', (done) => {
  gulp
    .src('src/*.png')
    .pipe(plumber())
    .pipe(changed('./www'))
    .pipe(rename({dirname: ''}))
    .pipe(imagemin())
    .pipe(gulp.dest('./www'))
  done();
})

gulp.task('font', (done) => {
  gulp
    .src('src/font/*.{ttf,otf}')
    .pipe(plumber())
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./www/font'))
  done();
})

gulp.task('default', gulp.series('pug', 'styles', 'script', 'images', 'favicon', 'font', 'browserSync'));
