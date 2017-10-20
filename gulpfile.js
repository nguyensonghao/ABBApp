var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var paths = {
  sass: ['./www/scss/**/*.scss'],
  main: ['./www/scss/main.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./www/scss/main.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.main, ['sass']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./www/"
    }
  });
});

gulp.task('default', ['sass', 'watch', 'serve']);


