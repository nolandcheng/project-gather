<!--
 * @Descripttion: readme
 * @Author: Cheng
 * @Date: 2021-05-24 16:46:46
 * @LastEditors: Cheng
 * @LastEditTime: 2021-05-25 16:56:23
-->
# vue-module Vue2.x模板

## 前言

使用vue2.x全家桶开发项目有很久的时间了，vue3也出来不久了，想着还是专门建了个模板在这里，随时更新一些通用行的的组件插件，也整合一些过去使用过的技术。

vue-cli4.x

该模版主要还是集成一些非页面性质的代码，记录内容都是些比较浅显简单的，以实用为主，因为移动端有RN、flutter和uni-app的存在，所以本模版只适用于pc端的参考。

## 1.常用ui库 element-ui + ant-design-vue

### 介绍

大同小异，element-ui更成熟些。对于开发项目，个人认为两者比较重要的区别是 ：

* element-ui替换了系统的滚动条，表格封装得更容易操作，还有颜色选择器等小众但实用的组件；使用`babel-plugin-component`开发依赖进行按需引入

* ant-design-vue动画更顺滑，样式也好看一点，还有个十分常用但element-ui官方没有的组件-下拉树。使用`babel-plugin-import`开发依赖进行按需引入

### 使用

#### .babel.config.js

```javaScript 
module.exports = {
  // ...
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css"
      }
    ]
  ]
}
```

#### 按需引入

新建一个文件夹来存放ui库按需引入的组件，再新建对应的js。

具体看 **src/plugins**及其下的js

最后**main.j**s中引入即可

#### 注意

需要注意的是ant-design-vue的样式会有点小问题，介意的话需要写新的样式覆盖，比如：

```css
p, h1, h2, h3, h4, h5, h6 {
  margin: 0
}
```

具体可看**src/style/default.css**

同样再在main.js中引入即可