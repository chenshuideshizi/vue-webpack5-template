const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

function resolve(filePath) {
  return path.resolve(__dirname, '..', filePath)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/main.js'
    // vendor: ['vue', 'vue-router', 'vuex', 'element-ui', 'lodash']
  },
  resolve: {
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
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('.cache/vue-loader'),
              cacheIdentifier: '154cb8fb'
            }
          },
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
        use: [
         {
           loader:  'url-loader',
           options: {
            esModule:  false,
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'static/img/[name].[hash:8].[ext]'
              }
            }
          }
         }
        ],
        type: 'javascript/auto'
      }, 
      { // 加载 css
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: resolve('static/style')
                }
              },
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
          /* config.module.rule('s(c|a)ss').oneOf('normal') */
          {
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: resolve('static/style')
                }
              },
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'static/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ],
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin(),  // Polyfill Node.js core modules in Webpack. This module is only needed for webpack 5+.
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),

    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin({}),
    /* config.plugin('hmr') */
    new webpack.HotModuleReplacementPlugin(),
    /* config.plugin('progress') */
    new webpack.ProgressPlugin(),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        template: resolve('public/index.html')
      }
    ),
    /* config.plugin('copy') */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('public'),
          to: resolve('dist'),
          toType: 'dir',
          globOptions: {
            ignore: [
              '.DS_Store'
            ]
          }
        }
      ]
    })
  ],
  externals: {
    vue: 'Vue'
  },
  optimization: {
    // minimizer: [
    //   {
    //     options: {
    //       test: /\.m?js(\?.*)?$/i,
    //       chunkFilter: () => true,
    //       warningsFilter: () => true,
    //       extractComments: false,
    //       sourceMap: false,
    //       cache: true,
    //       cacheKeys: defaultCacheKeys => defaultCacheKeys,
    //       parallel: true,
    //       include: undefined,
    //       exclude: undefined,
    //       minify: undefined,
    //       terserOptions: {
    //         output: {
    //           comments: /^\**!|@preserve|@license|@cc_on/i
    //         },
    //         compress: {
    //           arrows: false,
    //           collapse_vars: false,
    //           comparisons: false,
    //           computed_props: false,
    //           hoist_funs: false,
    //           hoist_props: false,
    //           hoist_vars: false,
    //           inline: false,
    //           loops: false,
    //           negate_iife: false,
    //           properties: false,
    //           reduce_funcs: false,
    //           reduce_vars: false,
    //           switches: false,
    //           toplevel: false,
    //           typeofs: false,
    //           booleans: true,
    //           if_return: true,
    //           sequences: true,
    //           unused: true,
    //           conditionals: true,
    //           dead_code: true,
    //           evaluate: true
    //         },
    //         mangle: {
    //           safari10: true
    //         }
    //       }
    //     }
    //   }
    // ],
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
