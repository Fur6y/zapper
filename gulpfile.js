const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./gulp-tasks');

gulp.task('default', [
    'clean:bin',
    'run:webpack',
    'copy:manifest',
    'copy:html',
    'copy:img',
    'copy:i18n',
    'copy:background',
]);

gulp.task('prod', [
    'lint',
    'clean:bin',
    'clean:dist',
    'run:webpackProd',
    'copy:manifest',
    'copy:html',
    'copy:img',
    'copy:i18n',
    'copy:background',
    'zip',
]);
