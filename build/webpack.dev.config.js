const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const resolve = p => path.resolve(__dirname, '../', p)

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    filename: 'static/js/[name].js',
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
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      inject: 'body'
    })
  ]
})
