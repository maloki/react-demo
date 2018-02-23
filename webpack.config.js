const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './public/app.js',
  output: {
    path: __dirname,
    publicPath: '/public/',
    filename: './public/bundle.js'
  },
  module: {
      rules: [{/*
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }]
      */
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1']
          }
        },

      },
      {
       test:/\.css$/,
      loader:'style-loader!css-loader'
         },
         {
       test: /\.scss$/,
       loader: ExtractTextPlugin.extract('style', 'css!sass')
         },
    ]
  },
  //devtool: 'cheap-module-source-map',
  resolve: {
      extensions: ['.js', '.jsx']
  },
};
