const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== "production"

console.log(process.env)

function resolve(p) {
  return path.resolve(__dirname, '..', p)
}

module.exports = {
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  performance: {
    maxAssetSize: 100000000,
    maxEntrypointSize: 400000000
  },
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
    // vendor: ['vue', 'vue-router', 'vuex', 'element-ui', 'lodash']
  },
  output: {
    filename: devMode ? 'static/js/[name].js' : 'static/js/[name].[contenthash:8].js',
    path: resolve('dist'),
    publicPath: '/',
    chunkFilename: 'static/js/[name].[contenthash:8].js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devtool: devMode ? 'source-map' : false,
  resolve: {
    symlinks: false,
    extensions: ['.js', '.vue'],  
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    modules: [
      resolve( './node_modules'),
      'node_modules'
    ]
  },
  module: {
    // noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: true
              },
              cacheDirectory: resolve('node_modules/.cache/vue-loader'),
              cacheIdentifier: '154cb8fb'
            }
          }
        ]
      },
      { // js 文件
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 2
            }
          },
          {
            loader: "babel-loader?cacheDirectory=true"
          }
        ]
      },
      { // 加载图片
        test: /\.(png|svg|jpg|jpeg|gif)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
					filename: 'static/images/[name].[hash][ext][query]'
				}
      }, 
      { // 加载 css
        test: /\.css$/,
        oneOf: [
          {
            use: [
              devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      { // 加载 css
        test: /\.s(a|c)ss$/,
        oneOf: [
          {
            use: [
              devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },

      { // 加载字体
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
					filename: 'static/fonts/[name].[hash][ext][query]'
				}
      }
    ]
  },
  plugins: [
    new NodePolyfillPlugin(),  // Polyfill Node.js core modules in Webpack. This module is only needed for webpack 5+.
    new VueLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({}),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ // 在生成环境会启用压缩
      template: resolve('public/index.html'),
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist'),
          toType: 'dir',
          globOptions: {
            ignore: [
              '.DS_Store',
              '**/index.html'
            ]
          }
        }
      ]
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin() // webpack@5 仅在生产环境开启 CSS 优化
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial'
        },
        elementUI: {
          name: 'chunk-elementUI',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('components'),
          minChunks: 3,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: 'single'
  }
}
