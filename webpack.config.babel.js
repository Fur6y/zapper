var webpack = require('webpack');
var path = require('path');

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
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
      }
    ]
  }
};
