var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/main.js'
  },
  module: {
    // loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
    loaders: utils.styleLoaders({ sourceMap: false, extract: true })
  },
  // devtool: config.build.productionSourceMap ? '#source-map' : false,
  devtool: false,
  output: {
    library: 'Bz',
    libraryTarget: 'umd',
    filename: 'main.js',
    path: config.build.assetsRoot,
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      // sourceMap: config.build.productionSourceMap,
      sourceMap: false,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css'))
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
