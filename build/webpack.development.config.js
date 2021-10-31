const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common.config')
const developmentConfig =  {
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
  devtool: 'source-map'
}

const webpackConfig = merge(commonConfig, developmentConfig);
module.exports =  webpackConfig
