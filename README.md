<!--
 * @Descripttion: readme
 * @Author: Cheng
 * @Date: 2021-05-24 16:46:46
 * @LastEditors: Cheng
 * @LastEditTime: 2021-05-26 11:24:24
-->
# vue-module Vue2.x模板

## 前言

使用vue2.x全家桶开发项目有很久的时间了，vue3也出来不久了，想着还是专门建了个模板在这里，随时更新一些通用型的组件插件，也整合一些过去使用过的技术。

脚手架为vue-cli4.x

该模版主要还是集成一些非页面性质的代码，记录内容都是些比较浅显简单的，以实用为主，因为移动端有RN、flutter和uni-app的存在，所以本模版只适用于pc端的参考。

## 1.常用ui库 element-ui + ant-design-vue

### 介绍

二者大同小异，element-ui更成熟些。对于开发项目，个人认为两者比较重要的区别是 ：

* element-ui替换了系统的滚动条，表格封装得更容易操作，还有颜色选择器等小众但实用的组件；使用`babel-plugin-component`开发依赖进行按需引入

* ant-design-vue动画更顺滑，样式也好看一点，还有个十分常用但element-ui官方没有的组件-下拉树。使用`babel-plugin-import`开发依赖进行按需引入

### 使用

#### 1.1 在.babel.config.js配置

```js 
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

#### 1.2 按需引入

新建一个文件夹来存放ui库按需引入的组件，再新建对应的js。

具体看 **src/plugins**及其下的js

最后**main.j**s中引入即可

#### 1.3 注意

需要注意的是ant-design-vue的样式会有点小问题，介意的话需要写新的样式覆盖，比如：

```css
p, h1, h2, h3, h4, h5, h6 {
  margin: 0
}
```

具体可看**src/style/default.css**

同样再在main.js中引入即可

## 2.封装axios

### 介绍

通常而言分为两种封装方式：

* 封装直接调用`axios.create()`方法，初始化时只配置少数参数，更多的参数是在调用封装方法的时候传，这样的好处是最大程度上保留axios原本的格式，减少学习成本。

* 在封装的时候直接调用`axios`，定义好参数，将请求方法`Post Get`等直接导出，这样调用封装方法的时候传值更少，但是封装时候的定义需要考虑更多。

个人更偏向第一种

### 使用 

#### 1.1 封装和定义

新建 **src/utils/request.js**，最基础的写法：

```js
import axios from 'axios'

const service = axios.create({
  // baseURL根据环境配置的不同，写法不同
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '',
  timeout: 5000
})

// 请求拦截器，一般用来带上token
service.interceptors.request.use(
  config => {
    // config.headers['token'] =
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器，一般用来做验证、弹出错误
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
```

#### 1.2 api调用 

```js
import request from '@/utils/request'
// import qs from 'qs'

//
export const test = params => {
  return request({
    url: '/api/xxx',
    method: 'get',
    params
  })
}
```

页面中直接引入，调用`test(参数)`即可

