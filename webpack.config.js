const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = [
  {
    'test': /\.js?$/,
    'exclude': /node_modules/,
    'loader': 'babel',
    'query': {
      'presets': [
        'es2015',
        'stage-0'
      ],
      'plugins': []
    }
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react-simple-flex': path.resolve('lib')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: loaders
  }
};
