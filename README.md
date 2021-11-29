# vue-template

##### sass 报错

Deprecation Using / for division is deprecated and will be removed in Dart Sass 2.0.0.

把 ```"sass": "^1.43.4"``` 改为  ```"sass": "~1.32.6"```

官网解释: https://sass-lang.com/documentation/breaking-changes/slash-div
##### 省略文件后缀名
```
resolve: {
  // 配置 省略文件后缀名
  extensions: ['.js', '.css', '.vue'],  
},
```

##### vue 文件处理

- vue-loader
- vue-template-compiler

```
npm install -D vue-loader vue-template-compiler
```

vue-template-compiler 需要独立安装的原因是你可以单独指定其版本。

> vue-template-compiler 只需要安装上

##### 生成 index.html 文件

```
  new HtmlWebpackPlugin({
    title: '开发环境',
    template: path.resolve(__dirname, '../public/index.html'), // 源模板文件
    filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
  })
```

### 问题

#### 问题1

Error: Cannot find module 'acorn'

#### 问题2

生级 htmlWebpackPlugin