var path = require('path');
var webpack = require('webpack');
// production:
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
        './src/app/index'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'bin/bundle'),
    publicPath: '/bundle/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('0.1.0'),
      __DEV__: JSON.stringify(true)
    }),
    // production:
    // new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.sass$/,
        // production:
        // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap&indentedSyntax=sass'),
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap&indentedSyntax=sass'],
        include: path.join(__dirname, 'src/style')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};
