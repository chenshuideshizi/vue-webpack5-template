const { merge } = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.common.config')

const resolve = p => path.resolve(__dirname, '../', p)

const productionConfig =  {
  mode: 'production',
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].[contenthash:8].js',
    publicPath: '/',
    chunkFilename: 'static/js/[name].[contenthash:8].js'
  },
  devtool: false,
  plugins: [
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          VUE_APP_BASE_API: '"/prod-api"',
          NODE_ENV: '"production"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('extract-css') */
    new MiniCssExtractPlugin(
      {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css'
      }
    ),
    new OptimizeCssnanoPlugin({
        sourceMap: false,
        cssnanoOptions: {
          preset: [
            'default',
            {
              mergeLonghand: false,
              cssDeclarationSorter: false
            }
          ]
        }
    }),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    })
  ]
}

const webpackConfig = merge(commonConfig, productionConfig);

module.exports = webpackConfig
