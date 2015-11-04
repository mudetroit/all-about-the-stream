import gulp from 'gulp';
import {spawn} from 'child_process';

const buildFiles = './src/infrastructure/build/**/*.js';
const nodeModules = './node_modules/**/*.*';
const packageJson = './package.json';


// The default task promarily acts as a launcher for the watch task. But also
// watches for changes in the build files and will relaunch the watch instance
// if that happens. This is particular important for the running gulp process
// in screen on the vagrant box.
gulp.task('serve', () => {
    let process;

    function restart(){
        if(process) process.kill();

        // Start a new gulp process. This is equivalent to `gulp watch --serve`
        // We use the --serve argument to key in a couple of places to do a watch
        // task instead of a single build, for instance in the scripts task. We
        // have to do this; because, as far as I can tell there is no great way to
        // see what task gulp was launched with.
        process = spawn('gulp', ['watch', '--serve'], {stdio: 'inherit'});
    }

    gulp.watch([buildFiles, nodeModules, packageJson], restart);

    restart();
});