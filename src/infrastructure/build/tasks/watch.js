import gulp from 'gulp';
import express from '../helpers/express';
import livereload from '../helpers/livereload';


gulp.task('watch', ['lint', 'scripts'], () => {
    express.listen(8080);
    livereload.listen();
    gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['lint']);
});