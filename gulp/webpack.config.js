'use strict';

var config = require('./config').scripts;
var gutil = require('gulp-util');
var webpack = require('webpack-stream').webpack;

var pkg = require('../package.json');
var date = Date();

var banner = `
   ${pkg.name} - ${pkg.description}
   Author: ${pkg.author}
   Version: v${pkg.version}
   Url: ${pkg.homepage}
   License(s): ${pkg.license}
   Date:  ${date}
`;

module.exports = {
  cache: true,
  entry: {
    app: config.src,
  },
  output: {
    //path: config.dest,
    publicPath: '/scripts/',
    filename: '[name].js',
    chunkFilename: '[name].bundle.js' // name || id || chunkhash
  },
  module: {
    preLoaders: [{
      test: /\.js$/, // include .js files
      exclude: [/libs/, /node_modules/],
      loader: 'jshint-loader'
    }],
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/libs/, /node_modules/],
      loader: 'babel-loader'
    }, {
      test: /masonry-layout/,
      loader: 'imports?define=>false&this=>window'
    }]
  },
  jshint: {
    emitErrors: true,
    failOnHint: false,
  },
  plugins: [

    // Use this if you want to chunk shared libraries
    // new webpack.optimize.CommonsChunkPlugin('shared.js'),

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),

    new webpack.BannerPlugin(banner),

  ],

  devtool: 'source-map',

  // Replace modules by other modules or paths.
  // https://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // alias: {}
    extensions: ['', '.js', '.es6']
  }
};

if (gutil.env.minify === true) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(config.uglifyOptions)
  );
}