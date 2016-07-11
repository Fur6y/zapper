const gulp = require('gulp');
const del = require('del');

const targetFolder = './bin/';

gulp.task('clean:bin', () =>
    del([
        targetFolder,
    ])
);

gulp.task('clean:dist', () =>
    del([
        './dist/',
    ])
);
