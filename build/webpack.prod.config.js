const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig,{
  mode: 'production',
  plugins: [
    // new OptimizeCssnanoPlugin({
    //     sourceMap: false,
    //     cssnanoOptions: {
    //       preset: [
    //         'default',
    //         {
    //           mergeLonghand: false,
    //           cssDeclarationSorter: false
    //         }
    //       ]
    //     }
    // })
  ]
})


