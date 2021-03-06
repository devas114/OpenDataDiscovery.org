var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var OptimizeJsPlugin = require("optimize-js-plugin");

var srcDir = 'static_src';
var outputDir = 'static';

module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: {
    app: path.resolve(srcDir, 'scripts/app.js')
  },
  output: {
    path: outputDir,
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[name].[hash].map'
  },
  resolve: {
    extensions: ['', '.js', '.less', '.css', '.html']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['syntax-decorators', 'ng-annotate']
        },
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.(png|gif|jpg)$/, loaders: ['file?name=images/[name].[ext]', 'image-webpack'] },
      // For font-awesome, created by Turbo87:
      // https://gist.github.com/Turbo87/e8e941e68308d3b40ef6
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: false
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      Pbf: 'pbf',
      'vectorTile': 'vector-tile',
      'geojsonvt': 'geojson-vt',
      'SphericalMercator': 'sphericalmercator'
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, 'views/index.html'),
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new WebpackCleanupPlugin({
      exclude: 'index.html'
    }),
    new OptimizeJsPlugin({
      sourceMap: true
    })
  ]
};
