const gulp = require('gulp');
const rename = require('gulp-rename');

const targetFolder = './bin/';

gulp.task('copy:manifest', ['clean:bin'], () => {
    gulp.src('./src/manifest.json')
    .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:html', ['clean:bin'], () => {
    gulp.src('./src/*.html')
    .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:img', ['clean:bin'], () => {
    gulp.src('./src/assets/img/**/*')
    .pipe(gulp.dest(`${targetFolder}img/`));
});

gulp.task('copy:i18n', ['clean:bin'], () => {
    gulp.src('./src/i18n/**/*')
    .pipe(gulp.dest(`${targetFolder}_locales/`));
});

gulp.task('copy:background', ['clean:bin'], () => {
    gulp.src('./src/background/index.js')
    .pipe(rename('background.js'))
    .pipe(gulp.dest(targetFolder));
});
