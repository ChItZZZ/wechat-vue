var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var postcssSprites = require('postcss-sprites');
//let sprites = postcssSprites.default;
//let spritesConfig = sprites({
//  retina: true,//支持retina，可以实现合并不同比例图片
//  verbose: true,
//  spritePath: './public/images/',//雪碧图合并后存放地址
//  stylesheetPath: './public',
//  basePath: './',
//  filterBy: function (image) {
//    //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
//    //
//    if (image.url.indexOf('/images/sprites/') === -1) {
//      return Promise.reject();
//    }
//    return Promise.resolve();
//  },
//  groupBy: function (image) {
//    //将图片分组，可以实现按照文件夹生成雪碧图
//    return spritesGroupBy(image);
//  },
//  hooks: {
//    onUpdateRule: function (rule, comment, image) {
//      //更新生成后的规则，这里主要是改变了生成后的url访问路径
//      return spritesOnUpdateRule(true, rule, comment, image);
//    },
//    onSaveSpritesheet: function(opts, groups) {
//      return spritesOnSaveSpritesheet(true, opts, groups);
//    }
//  }
//});

module.exports = {
  entry: {
    app: './src/main.js'
    //bootstrapCss: './src/public/css/bootstrap.min.css'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'public': path.resolve(__dirname, '../src/public'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test:/\.css$/,
        loader: 'postcss'
      }
    ]
  },
  postcsss: function () {
    return [postcssSprites(
      {	stylesheetPath: '../src/public/css',
        spritePath: '../src/public/icons',
        retina: true,
        padding: 3,
        filterBy: function(image){return /\/sp\//gi.test(image.url)}
      }
    )]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ]
}
