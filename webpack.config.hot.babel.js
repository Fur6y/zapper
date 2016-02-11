const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/app/index'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'bin/bundle'),
    publicPath: 'bundle/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('0.1.0'),
      __DEV__: JSON.stringify(true)
    }),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap&indentedSyntax=sass'),
        // cause an error with loading fonts on chrome
        // loaders: ['style', 'css?sourceMap', 'sass?sourceMap&indentedSyntax=sass'],
        include: path.join(__dirname, './src/style')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};
