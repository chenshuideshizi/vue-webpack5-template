const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const resolve = p => path.resolve(__dirname, '../', p)

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
      port: 9091,
      proxy: {
        '^/': {
          target: 'http://www.baidu.com',
          changeOrigin: true,
        }
      }
  },
  plugins: [

  ]
})
