import gulp from 'gulp';
import gulpIf from 'gulp-if';
import eslint from 'gulp-eslint';
import yargs from 'yargs';

const {argv: {serve}} = yargs;

gulp.task('lint', () =>
  gulp.src(['./src/**/*.js', './src/**/*.jsx'])
  .pipe(eslint())
  .pipe(eslint.format())
  //Fail on error when we are not watching for changes, i.e. when we are building a release.
  .pipe(gulpIf(!serve, eslint.failOnError()))
);
