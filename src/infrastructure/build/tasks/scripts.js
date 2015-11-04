import gulp from 'gulp';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import yargs from 'yargs';

const {argv: {serve}} = yargs;

function bundle(bundler){
    return bundler
        .bundle()
        .on('error', (error) => util.log(util.colors.red('Error compiling scripts:'), error.message))
        .pipe(plumber())
        .pipe(source('./app.js'))
        .pipe(gulp.dest('./'));
}

gulp.task('scripts', () =>{
    let bundler = browserify({
        entries: ['./src/app.jsx'],
        transform: [
            ['babelify', { optional: ['es7.objectRestSpread', 'es7.classProperties', 'es7.decorators'] }],
        ],
        debug: true,
        extensions: ['.jsx'],
        cache: {},
        packageCache: {},
        fullPaths: true,
    });

    if(serve) {
        bundler = watchify(bundler, {poll: true});
        bundler.on( 'update', () => {
            return bundle(bundler);
        });
    }

    return bundle(bundler);
});
