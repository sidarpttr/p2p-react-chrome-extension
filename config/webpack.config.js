'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    popup: './src/index.js',
    background: './public/background.js',
    contentScript: './public/contentScript.js'
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    }),
    new MiniCssExtractPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
});

module.exports = config;
