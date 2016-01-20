var gulp = require('gulp');
var rename = require('gulp-rename');

var targetFolder = './bin/';

gulp.task('copy:manifest', ['clean:bin'], function() {
   gulp.src('./src/manifest.json')
   .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:html', ['clean:bin'], function() {
   gulp.src('./src/*.html')
   .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:img', ['clean:bin'], function() {
   gulp.src('./src/assets/img/**/*')
   .pipe(gulp.dest(targetFolder+'img/'));
});

gulp.task('copy:fonts', ['clean:bin'], function() {
    gulp.src('./src/assets/fonts/**/*')
    .pipe(gulp.dest(targetFolder+'fonts/'));
});

gulp.task('copy:i18n', ['clean:bin'], function() {
   gulp.src('./src/i18n/**/*')
   .pipe(gulp.dest(targetFolder+'_locales/'));
});

gulp.task('copy:css', ['clean:bin'], function() {
   gulp.src('./src/style.css')
   .pipe(gulp.dest(targetFolder));

   gulp.src('./src/font.css')
   .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:background', ['clean:bin'], function() {
   gulp.src('./src/background/index.js')
   .pipe(rename('background.js'))
   .pipe(gulp.dest(targetFolder));
});