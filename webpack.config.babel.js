/* eslint indent: [2, 2] */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: [
      './src/app/index',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'bin/bundle'),
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('1.0.0'),
      __DEV__: JSON.stringify(true),
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?sourceMap!sass?sourceMap&indentedSyntax=sass'
        ),
        include: path.join(__dirname, 'src/style'),
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file?hash=base64&name=[name].[hash:6].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url?limit=25000',
      },
    ],
  },
};
