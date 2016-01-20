var webpack = require('webpack');
var path = require('path');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'bundle'),
    publicPath: '/bundle/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    // definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('0.1.0'),
      __DEV__: JSON.stringify(true)
    })
    // prevents the inclusion of duplicate code
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'src')
        // exclude: /node_modules/
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
      }
    ]
  }
};