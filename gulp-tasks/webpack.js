var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.babel.js');

gulp.task('run:webpack', function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gulpUtil.PluginError('webpack', err);
        gulpUtil.log('[webpack]', stats.toString({ /* output options */ }));
        callback();
    });
});