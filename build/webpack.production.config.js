const { merge } = require('webpack-merge')

const commonConfig = require('./webpack.common.config')
const productionConfig =  {
  mode: 'production',
}

const webpackConfig = merge(commonConfig, productionConfig);

module.exports = webpackConfig
