const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

process.env.NODE_ENV = 'development'

const resolve = p => path.resolve(__dirname, '../', p)

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
      port: 9091,
      open: false,
      compress: true,
      static: {
        publicPath: resolve('dist')
      },
      hot: true,
      proxy: {
        '/api': {
          target: 'http://www.baidu.com',
          changeOrigin: true,
        }
      }
  },
  plugins: [

  ]
})
