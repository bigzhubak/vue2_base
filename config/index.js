// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

var config = {}
try {
  config = require(process.cwd() + '/config.js')
} catch (err) {
  config.filename = 'index'
}

var my_proxy = {}
try {
  my_proxy = require(process.cwd() + '/proxy.js')
} catch (err) {
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(process.cwd(), './dist/' + config.filename + '.html'),
    assetsRoot: path.resolve(process.cwd(), './dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: config.port || 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: my_proxy,
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
