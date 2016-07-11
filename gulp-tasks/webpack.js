const gulp = require('gulp');
const gulpUtil = require('gulp-util');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.babel.js');
const webpackProdConfig = require('../webpack.config.prod.babel.js');

gulp.task('run:webpack', ['clean:bin'], (callback) => {
    webpack(webpackConfig, (err, stats) => {
        if (err) throw new gulpUtil.PluginError('webpack', err);
        gulpUtil.log('[webpack]', stats.toString({ /* output options */ }));
        callback();
    });
});

gulp.task('run:webpackProd', ['clean:bin'], (callback) => {
    webpack(webpackProdConfig, (err, stats) => {
        if (err) throw new gulpUtil.PluginError('webpack', err);
        gulpUtil.log('[webpack]', stats.toString({ /* output options */ }));
        callback();
    });
});
