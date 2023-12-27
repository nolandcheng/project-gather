# 目录

## 前言

使用 vue2 全家桶开发项目有很久的时间了，预计以后的项目会投奔 Vue3，所以想着还是专门建了个项目在这里，主要是记录一些通用型的组件插件，也整合一些过去使用过的技术。

vue2.7 + vue-cli4.x + axios

ps: 该主分支主要是封装和技术的介绍，具体模版请参考：

## 1. 常用 ui 库

### 1.1 介绍

element-ui + ant-design-vue 二者大同小异，element-ui 更成熟些。对于开发项目，个人认为两者比较重要的区别是 ：

- element-ui 替换了系统的滚动条，表格封装得更容易操作，还有颜色选择器等小众但实用的组件；使用`babel-plugin-component`开发依赖进行按需引入

- ant-design-vue 动画更顺滑，样式也好看一点，还有个十分常用但 element-ui 官方没有的组件-下拉树。使用`babel-plugin-import`开发依赖进行按需引入

### 1.2 在.babel.config.js 配置

```js
module.exports = {
  // ...
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css",
      },
    ],
  ],
}
```

### 1.3 按需引入

新建一个文件夹来存放 ui 库按需引入的组件，再新建对应的 js。

具体看 **src/plugins**及其下的 js

最后**main.j**s 中引入即可

### 1.4 注意

需要注意的是 ant-design-vue 的样式会有点小问题，介意的话需要写新的样式覆盖，比如：

```css
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
```

具体可看**src/style/default.css**

同样再在 main.js 中引入即可

## 2 环境配置

### 2.1 配置环境变量

即使是一个非常简单的项目也通常会至少区分**开发环境**和**生产环境**，更为复杂的项目可能还会增添**测试环境**、**预发布环境**等，但它们的配置类似，这里我只写最基础的结构。

新建`.env`和`.env.prod`文件（后者的.prod 可按照自己的喜好命名），`.env`文件默认为开发环境的配置文件不需要额外的声明，而我新建的`.env.prod`文件则要额外声明：

```sql
NODE_ENV = "production"
```

`production`意为生产环境，当我们在执行打包命令时，会默认按照生产环境更小的体积的方式打包，同样，我也可以写`development`，来声明当前文件为开发环境的环境配置文件。

当存在多个环境时，只需要添加新的打包命令即可。

```sql
"build:prod": "vue-cli-service build --mode prod",
```

在`package.json`中添加如上代码即可。

### 2.2 封装 axios

通常而言分为两种封装方式：

- 封装直接调用`axios.create()`方法，初始化时只配置少数参数，更多的参数是在调用封装方法的时候传，这样的好处是最大程度上保留 axios 原本的格式，减少学习成本。

- 在封装的时候直接调用`axios`，定义好参数，将请求方法`Post Get`等直接导出，这样调用封装方法的时候传值更少，但是封装时候的定义需要考虑更多。

个人更偏向**第一种**

新建 **src/utils/request.js**，最基础的写法：

```js
import axios from "axios"

const service = axios.create({
  // baseURL根据环境配置的不同，写法不同
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器，一般用来带上token
service.interceptors.request.use(
  (config) => {
    // config.headers['token'] =
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器，一般用来做验证、弹出错误
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
```

随后编写 api：

```js
import request from "@/utils/request"

export const test = (params) => {
  return request({
    url: "/api/xxx",
    method: "get",
    params,
  })
}
```

具体的传参规则根据后台接口的需要去操作`headers, Content-Type`等。

页面中直接引入，调用`test(参数)`即可

## 3.封装基础组件

### 3.1 介绍

在我们的项目开发中会遇到许多类似的基础功能，如一个按钮，一块表格之类的，而他们的风格通常也是统一的，仅仅是部分功能和内容不同，将他们封装成基础组件将会极大的提高我们的开发效率。

由于基础组件的使用频率也相对较高，我们可以选择将它们统一存放在`components/BaseModules`路径下，并引入该目录下的`global.js`来进行全局注册。

### 3.2 BaseTable

基础组件-表格，具体使用不过多赘述，要注意的是，我们会根据项目需求的不同，调节统一样式和默认传值。

### 3.3 BaseForm
