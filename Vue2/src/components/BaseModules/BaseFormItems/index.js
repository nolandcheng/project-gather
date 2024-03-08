/**
 * 引入当前目录下所有vue文件，导出一个vue组件格式的对象集合
 * @function
 */

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 查找同级目录下以vue结尾的组件
const requireComponent = require.context("./", false, /\.vue$/)

const componentArr = requireComponent.keys().map((fileName) => {
  let config = requireComponent(fileName)
  let componentName = changeStr(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  return [componentName, config.default]
})

export default Object.fromEntries(componentArr)
