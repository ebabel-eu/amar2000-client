const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(path.dirname(), 'build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
      },
      {
        test: /\.css$/,
        loader: 'style!css?',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.html' },
      { from: 'src/favicon.ico' },
      { from: 'src/robots.txt' },
      { from: 'src/css/**/*', to: 'build/css' },
    ], {
      copyUnmodified: true,
    }),
  ],

};
