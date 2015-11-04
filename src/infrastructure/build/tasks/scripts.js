import gulp from 'gulp';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import yargs from 'yargs';

const {argv: {serve}} = yargs;

// This peforms the actual bundling and writes the new bundle to disk
function bundle(bundler){
    return bundler
        .bundle()
        .on('error', (error) => util.log(util.colors.red('Error compiling scripts:'), error.message))
        .pipe(plumber())
        .pipe(source('./app.js'))
        .pipe(gulp.dest('./'));
}

// The 'scripts' task is responsible for compiling the js lovated under the client directory
gulp.task('scripts', () =>{
    // Build the basic browserify bundler we use.
    let bundler = browserify({
        // nut.js is the entry point for browserify
        entries: ['./src/app.jsx'],
        // Define and configure the babel transformer, the only one we use
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
