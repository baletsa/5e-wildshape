'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const styleLintPlugin = require('stylelint-webpack-plugin');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');

module.exports = env => {

  console.log('\x1b[36m%s\x1b[0m', '🦄  ' + env);

  const config = {
    module: {
      rules: [
        // HANDLERBARS
        {
          test: /\.(handlebars|hbs)$/,
          loader: 'handlebars-loader',
          query: {
            partialDirs: [
              path.join(__dirname, 'src/partials')
            ],
            debug: false
          }
        },
        // IMAGES
        {
          test: /\.(png|jpe?g|svg)$/,
          use: [{
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                context: 'src/images/',
                outputPath: 'images/',
                publicPath: '../images/',
              }
            },
            {
              loader: 'img-loader',
              options: {
                plugins: env === 'production' && [
                  imageminGifsicle(),
                  imageminJpegtran(),
                  imageminOptipng(),
                  imageminSvgo(),
                ]
              }
            },
          ]
        },
        // STYLES
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: './postcss.config.js',
                }
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.js$/,
          exclude: [/libs/, /assets/, /node_modules/],
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },

        {
          test: /\.js$/,
          exclude: [/libs/, /assets/, /node_modules/],
          loader: 'eslint-loader'
        }
      ]
    },
    plugins: [
      // DELETE RELEASE FOLDER
      new CleanWebpackPlugin(),
      // EXTRACT CSS
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
      }),
      // LINT SCSS PARTIALS
      new styleLintPlugin({
        glob: ['src/**/*.scss'],
      }),
      // COPY WEB.CONFIG FOR AZURE
      new CopyWebpackPlugin([
        {from: 'index.html', context: 'src/'},
        {from: 'beast-data/data.json', context: 'src/', to: 'beast-data/'}
      ]),
    ],

    output: {
      filename: 'scripts/[name].js',
      chunkFilename: 'scripts/[id].js',
      path: path.resolve(__dirname, 'release'),
    }

  }

  if (env === 'development' || env === 'review' || env === 'production') {
    // ENTRY POINT
    config.entry = {
      main: ['./src/index.js', './src/sass/main.scss'],
    };
    // ADD SOURCE MAP TO FILES
    config.devtool = 'inline-source-map';
    // CONFIG FOR DEV SERVER
    config.devServer = {
      contentBase: './release',
    };
  }

  return config
}
