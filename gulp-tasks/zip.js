const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('zip', [
    'lint',
    'clean:bin',
    'clean:dist',
    'run:webpackProd',
    'copy:manifest',
    'copy:html',
    'copy:img',
    'copy:i18n',
    'copy:background',
], () =>
    gulp.src('bin/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))
);
