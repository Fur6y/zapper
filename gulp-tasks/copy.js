var gulp = require('gulp');
var rename = require('gulp-rename');

var targetFolder = './bin/';

gulp.task('copy:manifest', function() {
   gulp.src('./src/manifest.json')
   .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:html', function() {
   gulp.src('./src/*.html')
   .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:img', function() {
   gulp.src('./src/assets/img/**/*')
   .pipe(gulp.dest(targetFolder+'img/'));
});

gulp.task('copy:i18n', function() {
   gulp.src('./src/i18n/**/*')
   .pipe(gulp.dest(targetFolder+'_locales/'));
});

gulp.task('copy:fonts', function() {
   gulp.src('./src/assets/fonts/**/*')
   .pipe(gulp.dest(targetFolder+'fonts/'));
});

gulp.task('copy:style', function() {
   gulp.src('./src/style.css')
   .pipe(gulp.dest(targetFolder));
});

gulp.task('copy:background', function() {
   gulp.src('./src/background/index.js')
   .pipe(rename('background.js'))
   .pipe(gulp.dest(targetFolder));
});