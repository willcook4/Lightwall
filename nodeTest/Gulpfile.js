const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

gulp.task('es6', () => {
  return gulp.src('source/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', () => {
  gulp.watch('source/**/*.js', ['es6']);
});

gulp.task('default', [
  'watch'
]);

