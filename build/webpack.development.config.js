const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const resolve = p => path.resolve(__dirname, '../', p)

const commonConfig = require('./webpack.common.config')
const developmentConfig =  {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  devServer: {
      port: 9091,
      proxy: {
        '^/': {
          target: 'http://www.baidu.com',
          changeOrigin: true,
        }
      }
  },
  devtool: 'source-map',
  plugins: [
    /* config.plugin('define') */
    new webpack.DefinePlugin(
      {
        'process.env': {
          VUE_APP_BASE_API: '"/dev-api"',
          NODE_ENV: '"development"',
          BASE_URL: '"/"'
        }
      }
    ),
    new HtmlWebpackPlugin(
      {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
        },
        template: resolve('public/index.html')
      }
    ),
  ]
}

const webpackConfig = merge(commonConfig, developmentConfig);
module.exports =  webpackConfig
