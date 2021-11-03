const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = merge(baseConfig,{
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin(
      {
        'process.env': {
          VUE_APP_BASE_API: '"/prod-api"',
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
    ),
    new CssMinimizerPlugin(),
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
    // }),
    new HtmlWebpackPlugin(
      {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true
        },
        template: resolve('public/index.html'),
        inject: 'body'
      }
    )
  ]
})


