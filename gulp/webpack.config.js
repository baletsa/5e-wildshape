'use strict';

const config = require('./config').scripts,
  gutil = require('gulp-util'),
  webpack = require('webpack-stream').webpack;

const pkg = require('../package.json');

const date = new Date();

if (gutil.env.minify === true) {
  var minify = true;
}

const banner = `
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
    app: config.src
  },
  output: {
    publicPath: '/scripts/',
    filename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/libs/, /node_modules/],
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.js$/,
        exclude: [/libs/, /node_modules/],
        loader: "eslint-loader"
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin(banner),
  ]
};

if (minify) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(config.uglifyOptions)
  );
}
