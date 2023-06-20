/**
 * 引入当前目录下所有vue文件，并进行全局注册
 * @function
 */

import Vue from "vue"

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 查找同级目录下以vue结尾的组件
const requireComponent = require.context("./", false, /\.vue$/)

requireComponent.keys().forEach((fileName) => {
  let config = requireComponent(fileName)
  let componentName = changeStr(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  Vue.component(componentName, config.default || config)
})
