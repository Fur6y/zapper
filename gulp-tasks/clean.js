var gulp = require('gulp');
var del = require('del');

var targetFolder = './bin/';

gulp.task('clean:bin', function () {
  return del([
    targetFolder
  ]);
});