'use strict';


process.env.NODE_ENV = 'development';


var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


// Polyfill ES6 for Node 0.10 (e.g. Symbol, Promise)
require('babel-polyfill');


module.exports = {
  devtool: 'source-map',
  entry: './src/example/Example.js',
  output: {filename: 'bundle.js', path: path.resolve('example')},
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],

  module: {
    loaders: [
      {test: /\.json$/, loader: 'json'},
      {test: /\.js$/, loader: 'babel', include: [path.resolve('src')]}
    ]
  },
  resolve: {extensions: ['', '.js']},
  stats: {colors: true}
};
