const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    main: './src/main.js'
    // vendor: ['vue', 'vue-router', 'vuex', 'element-ui', 'lodash']
  },
  module: {
    rules: [
      { // vue 文件
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      { // js 文件
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      { // 加载 css
        test: /\.css$/,
        use: [
          // 'vue-style-loader',
          // MiniCssExtractPlugin.loader, // 如果使用 MiniCssExtractPlugin.loader ，就不能使用 style-loader
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader", // Translates CSS into CommonJS
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 'vue-style-loader',
          // MiniCssExtractPlugin.loader, // 如果使用 MiniCssExtractPlugin.loader ，就不能使用 style-loader
          "style-loader", // Creates `style` nodes from JS strings
          "css-loader", // Translates CSS into CommonJS
          { // Compiles Sass to CSS
            loader: "sass-loader", 
            options: {
              implementation: require("node-sass")
            }
          }
        ]
      },
      { // 加载图片
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
         {
           loader:  'url-loader',
           options: {
             esModule:  false,
            limit: 1,
            name: 'assets/images/[path]/[name].[hash:7].[ext]'
          }
         }
        ],
        type: 'javascript/auto'
      }, 
      { // 加载字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(resourcePath, resourceQuery) {
                // if (process.env.NODE_ENV === 'development') {
                //   return '[path][name].[ext]';
                // }
     
                // return '[name].[contenthash].[ext]';
                return '[path][name].[hash].[ext]'
              },    
              outputPath: 'assets/fonts',
            }
          }
        ],
        type: 'javascript/auto'
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new NodePolyfillPlugin(),  // Polyfill Node.js core modules in Webpack. This module is only needed for webpack 5+.
    new  VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name][hash].css'
    }),
    new HtmlWebpackPlugin({
      title: '开发环境',
      template: path.resolve(__dirname, '../public/index.html'), // 源模板文件
      filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
    }),
    new CopyPlugin({
      patterns: [
        {
           from: path.resolve(__dirname, '../public'),
            globOptions: {
              ignore: ["**/index.html"],
            }
        }
      ],
    }),
  ],
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    // 配置 省略文件后缀名
    extensions: ['.js', '.vue'],  
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  externals: {
    vue: 'Vue'
  },
  optimization: {
    splitChunks: {
        chunks: 'all'
    }
  },
  devtool: 'source-map'
}
