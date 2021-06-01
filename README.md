# 目录

<!-- vscode-markdown-toc -->
* [前言](#)
* [1. 常用ui库](#ui)
	* [1.2 介绍](#-1)
	* [1.2 在.babel.config.js配置](#babel.config.js)
	* [1.3 按需引入](#-1)
	* [1.4 注意](#-1)
* [2. 封装axios](#axios)
	* [2.1 介绍](#-1)
	* [2.2 封装和定义](#-1)
	* [2.3 api调用](#api)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name=''></a>前言

使用vue2.x全家桶开发项目有很久的时间了，预计以后的项目会投奔Vue3，所以想着还是专门建了个项目在这里，主要是记录一些通用型的组件插件，也整合一些过去使用过的技术。

vue2.x + vue-cli4.x + axios

ps: 只是技术层面的代码整合，并非开箱即用的模版

## <a name='ui'></a>1. 常用ui库 

### <a name='-1'></a>1.2 介绍

element-ui + ant-design-vue 二者大同小异，element-ui更成熟些。对于开发项目，个人认为两者比较重要的区别是 ：

* element-ui替换了系统的滚动条，表格封装得更容易操作，还有颜色选择器等小众但实用的组件；使用`babel-plugin-component`开发依赖进行按需引入

* ant-design-vue动画更顺滑，样式也好看一点，还有个十分常用但element-ui官方没有的组件-下拉树。使用`babel-plugin-import`开发依赖进行按需引入

### <a name='babel.config.js'></a>1.2 在.babel.config.js配置

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

### <a name='-1'></a>1.3 按需引入

新建一个文件夹来存放ui库按需引入的组件，再新建对应的js。

具体看 **src/plugins**及其下的js

最后**main.j**s中引入即可

### <a name='-1'></a>1.4 注意

需要注意的是ant-design-vue的样式会有点小问题，介意的话需要写新的样式覆盖，比如：

```css
p, h1, h2, h3, h4, h5, h6 {
  margin: 0
}
```

具体可看**src/style/default.css**

同样再在main.js中引入即可

## <a name='axios'></a>2. 封装axios

### <a name='-1'></a>2.1 介绍

通常而言分为两种封装方式：

* 封装直接调用`axios.create()`方法，初始化时只配置少数参数，更多的参数是在调用封装方法的时候传，这样的好处是最大程度上保留axios原本的格式，减少学习成本。

* 在封装的时候直接调用`axios`，定义好参数，将请求方法`Post Get`等直接导出，这样调用封装方法的时候传值更少，但是封装时候的定义需要考虑更多。

个人更偏向第一种

### <a name='-1'></a>2.2 封装和定义

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

### <a name='api'></a>2.3 api调用 

```js
import request from '@/utils/request'
// import qs from 'qs'

//
export const test = params => {
  return request({
    url: '/api/xxx',
    method: 'get',
    params,
    // params: qs.stringify(params)
  })
}

//使用qs.stringify(params)能将参数序列化成json的格式。
```

具体的传参规则根据后台接口的需要去操作`headers, Content-Type`等。

页面中直接引入，调用`test(参数)`即可

