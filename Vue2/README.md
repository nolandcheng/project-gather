# 目录

## 前言

官方在 2023 年底起不再更新了 vue2 了，未来都将投入 vue3 的怀抱了，我将此项目也升至`vue2.7 + vue-cli5`这个最后被支持的版本了。

## 1. 基础配置

创建项目、安装必要的插件和工具。

### 1.1 安装

```sql
-- 安装官方全局脚手架
npm install -g @vue-cli

-- 创建vue2项目
vue create [项目名]

-- 切换项目名
cd [项目名]

-- 安装项目依赖
yarn install

-- 启动
yarn serve
```

### 1.2 安装路由

在创建项目时通常会让脚手架为我们默认安装`vue-router`

```sql
-- 安装vue-router
yarn add vue-router
```

路由文件：[router](src/router/index.js)，随后在`main.js`中引入即可。

使用嵌套路由：[Layout](src/components/Layout/index.js)

### 1.3 引入 ui 库

ui 库对于一个项目来说是必要的，它能避免我们将大量的开发时间放在样式上，统一的样式风格能使项目更加美观，这里以较热门的 element-ui 举例。

安装 element-ui： `yarn add element-ui`

得益于 vue3 和 vite 的性能优势，该 ui 库的 v3 版本 element-plus 体积已经足够小了，全局引入并不会太影响性能，但 v2 版本按需引入还是能一定程度减少包的体积。

按需引入：

1. 安装`babel-plugin-component`插件，在[babel.config.js](babel.config.js)进行按需引入的配置
2. 在[plugins/element-ui](src/plugins/element-ui.js)配置需要引入的组件
3. 最后在**main.js**引入

### 1.4 安装 SCSS

SCSS 预处理器能帮助我们在写样式时减少非常多繁琐的写法。

许多老项目采用的是同时安装`sass sass-loader node-sass`的方式，这需要对应的 node 版本启动才不会报错。

SASS 官方建议用户使用`Dart Sass`，`node-sass`在 20 年已被弃用。

```sql
-- 安装sass将默认使用的是Dart Sass包
-- sass-loader版本不宜过高，否则会报错
yarn add sass sass-loader@10.1.1
```

使用时注意：`/deep/`需要替换为`::v-deep`

[defalut.css](src/style/default.css)是用来消除默认样式的。

### 1.5 安装 axios

axios 库依旧是目前项目中最为流行的访问后端服务的方式。

```sql
-- 安装axios
yarn add axios
```

在项目开发中我们通常会对 axios 请求进行二次封装，以减少相同功能代码的书写。

通常而言分为两种封装方式：

1. 封装直接调用`axios.create()`方法，初始化时只配置少数参数，更多的参数是在调用封装方法的时候传，这样的好处是最大程度上保留 axios 原本的格式，减少学习成本。

2. 在封装的时候直接调用`axios`，定义好参数，将请求方法`Post Get`等直接导出，这样调用封装方法的时候传值更少，但是封装时候的定义需要考虑更多。

个人更偏向**第一种**

在[src/utils/request.js](src/utils/request.js)中进行封装，包含较为基础的两个拦截器和错误提示语。

随后编写[api](src/api/test.js)

具体的传参规则根据后台接口的需要去操作`headers, Content-Type`等。

页面中直接引入，调用`test(参数)`即可

### 1.6 安装 vuex

只有在大型项目中才需要使用到全局状态管理，在创建时可以让脚手架自动帮我们安装。

```sql
-- 安装vuex
yarn add vuex
```

状态管理：[store](src/store/index.js)

## 2. 常用配置

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

### 2.2 页面加载拦截

创建[premission.js](src/permission.js)文件，在`main.js`中引入。

该文件通常需要配合路由守卫，在页面加载前进行一系列权限相关的验证，来判断是否让用户进入系统，它实现的功能通常包括如下几点：

1. 验证 token 的存在，是否失效，否则返回登录页面。
2. 通过白名单验证用户权限，添加提示。
3. 路由切换的动画加载

## 3. 基础组件

在我们的项目开发中会遇到许多类似的基础功能，如一个按钮，一块表格之类的，而他们的风格通常也是统一的，仅仅是部分功能和内容不同，将他们封装成基础组件将会极大的提高我们的开发效率。

由于基础组件的使用频率也相对较高，我们可以选择将它们统一存放在`components/BaseModules`路径下，并引入该目录下的`global.js`来进行全局注册。

### 3.1 BaseTable

[基础组件-表格](src/components/BaseModules/BaseTable.vue)，具体使用不过多赘述，要注意的是，我们会根据项目需求的不同，调节统一样式和默认传值。

### 3.2 BaseForm

[基础组件-表单](src/components/BaseModules/BaseForm.vue)，同时会将表单会用到的所有表单项再次进行单独封装，并调整统一的样式和传值。

对于一些会高频率使用到的组件，一个一个去全局注册十分繁琐，这里用到了[组件自动引入](src/components/BaseModules/global.js)，在需要使用的地方引用即可。

## 4. 基础函数

### 4.1 BaseConfirm（确认弹窗）

[基础函数-确认弹窗](src/components/BaseFunc/BaseConfirm.js)，【确认弹窗】功能的二次封装，简易的功能通常不需要创建组件，暴露一个函数即可。

在多人开发时，该功能可统一各确认弹窗的规范。
