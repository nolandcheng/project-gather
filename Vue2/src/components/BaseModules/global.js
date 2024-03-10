/**
 * 引入当前目录下所有vue文件，并进行全局注册
 * @function
 */

import Vue from "vue"

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 通过`webpack` 的 `require.context()` 方法来创建模块上下文，实现自动动态require组件。
// 三个参数：要搜索的文件夹目录、是否继续搜索它的子目录、匹配文件的正则表达式
// 这里意为查找同级目录下以vue结尾的组件
const requireComponent = require.context("./", false, /\.vue$/)

requireComponent.keys().forEach((fileName) => {
  let config = requireComponent(fileName)
  let componentName = changeStr(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  Vue.component(componentName, config.default || config)
})
