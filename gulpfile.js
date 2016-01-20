var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp-tasks');

gulp.task('default', ['run:webpack', 'copy:manifest', 'copy:html', 'copy:img', 'copy:fonts', 'copy:i18n', 'copy:background', 'copy:style']);